import {
  action,
  computed,
  observable,
  reaction,
  runInAction
} from 'mobx'

import akasha from 'akasha'

import LineItem from './LineItem'
import Order from './Order'

import { ICart, IClient } from './types'

export type CartUpdateRequest = [string, number, boolean, boolean]
export type AnalyticsProductTransformFn = (v: any) => any

/**
 * Cart keeps track of items being added and removed from the cart/order
 */
class Commerce {
  /**
   * id of the current cart in the system
   */
  @observable
  cart: ICart = {
    id: '',
    storeId: '',
    email: '',
    name: '',
  }

  /**
   * client is reference to a IClient
   */
  @observable
  client: IClient

  /**
   * updateQueue contains the list of cart item updates so we can ensure
   * updates are pushed fifo
   */
  @observable
  updateQueue: CartUpdateRequest[] = []

  /**
   * order is the object for tracking the user's order/cart info
   */
  @observable
  order: Order

  /**
   * user is an object for tracking the user's contact information
   */
  @observable
  user: any = {}

  /**
   * payment is the object for tracking the user's payment information
   */
  @observable
  payment: any = {}

  @observable
  _cartInitialized: any = false

  @observable
  analyticsProductTransform: AnalyticsProductTransformFn

  /**
   * Create an instance of Commerce
   * @param client is the http client for talking to carts
   * @param order is the default order configuration
   */
  constructor(
    client: IClient,
    order = {},
    aPT: AnalyticsProductTransformFn = (v) => v,
  ) {
    this.client = client
    this.order = order ? new Order(order, [], [], client) : Order.load(client)
    this.analyticsProductTransform = aPT
    // this.cartInit()
  }

  /**
   * Get the cart id
   * @return the cartId of the current cart from storage.  If there is no
   * current cart, return empty
   */
  @computed
  get cartId(): string {
    return akasha.get('cartId') ?? ''
  }

  /**
   * Get the cart id
   */
  @computed
  get isCartInit(): boolean {
    return this._cartInitialized
  }

  @computed
  get storeId() : string {
    return this.order.storeId
  }

  /**
   * Initialize the cart system.
   * @return initialized or recovered cart instance
   */
  @action
  async cartInit(): Promise<ICart> {
    // check for if the cartId exists and either create a new cart or load cart
    // id
    if (!this.cartId) {
      this.cart = await this.client.cart.create()
      akasha.set('cart', this.cart)
    } else {
      this.cart.id = this.cartId
    }

    runInAction(() => {
      this.order = new Order(akasha.get('order'), [], [], this.client)
    })

    // Define reaction for item changes
    reaction(
      () => this.order.items,
      (items) => {
        for (const item of this.order.items) {
          this.cartSetItem(item.productId, item.quantity)
        }
      }
    )

    // Save order on any update
    reaction(
      () => this.order,
      (order) => {
        Order.save(order)
      }
    )

    // Define reaction for storeid
    reaction (
      () => this.order.storeId,
      (storeId) => {
        this.cartSetStore(storeId)
      }
    )

    // Define reaction for storeid
    reaction (
      () => this.user.email,
      (email) => {
        this.cartSetEmail(email)
      }
    )

    // Define reaction for username
    reaction (
      () => this.user.firstName + ' ' + this.user.lastName,
      (name) => {
        this.cartSetName(name)
      }
    )

    return this.cart
  }

  /**
   * Get the current state of a specific lineitem
   * @param id the product id of a lineitem
   * @return lineitem or undefined if product isn't in cart
   */
  async get(id: string): Promise<LineItem | undefined> {
    // Check the item on the order
    let item = this.order.get(id)

    if (item) {
      return item
    }

    // Check the item in the queue
    for (const request of this.updateQueue) {
      if (request[0] !== id) {
        continue
      }

      const li = new LineItem({
        id: request[0],
        quantity: request[1],
        locked: request[2],
        ignore: request[3],
      }, this.client)

      await li.loadProductPromise

      return li
    }
  }

  /**
   * Set a lineitem by product id.  Add lineitem to asynchronous update queue
   * @param id productId
   * @param quantity amount of productId in cart
   * @param locked is this lineitem modifiable in the UI
   * @param ignore is this lineitem ignored by the UI (loading in progress,
   * freebie etc)
   * @return promise for when all set operations are completed
   */
  @action
  async set(id, quantity, locked=false, ignore=false): Promise<void> {
    this.updateQueue.push([id, quantity, locked, ignore])

    if (this.updateQueue.length === 1) {
      await this.executeUpdates()
    }
  }

  @action
  async executeUpdates(): Promise<void> {
    const items = this.order.items ?? []

    // Resolve or escape if empty queue
    if (this.updateQueue.length === 0) {
      return
    }

    let [id, quantity, locked, ignore] = this.updateQueue[0]

    // Resolve or escape if itemless mode
    if (this.order.inItemlessMode && quantity > 0) {
      return
    }

    // handle negative quantities.
    if (quantity < 0) {
      quantity = 0
    }

    // delete item
    if (quantity === 0) {
      await this.cartDeleteItem(id)
      return
    }

    // try and update item quantity
    if (this.executeUpdateItem(id, quantity, locked, ignore) != null) {
      return
    }

    // Fetch up to date information at time of checkout openning
    // TODO: Think about revising so we don't report old prices if they changed after checkout is open

    const li = new LineItem({
      id,
      quantity,
      locked,
      ignore
    }, this.client)

    await li.loadProductPromise

    runInAction(() => {
      items.push(li)
    })

    await this.executeUpdates()
  }

  @action
  async executeUpdateItem(id: string, quantity: number, locked: boolean, ignore: boolean): Promise<LineItem | undefined> {
    const items = this.order.items ?? []

    for (const k in items) {
      const item = items[k]
      // ignore if not a match to id
      if (
        item.id !== id &&
        item.productId !== id &&
        item.productSlug !== id
      ) {
        continue
      }

      const oldValue = item.quantity

      item.quantity = quantity
      item.locked = locked
      item.ignore = ignore

      const newValue = quantity

      const deltaQuantity = newValue - oldValue
      let a: any
      if (deltaQuantity > 0) {
        a = {
          id: item.productId,
          sku: item.productSlug,
          name: item.productName,
          quantity: deltaQuantity,
          price: item.price / 100
        }
        if (this.analyticsProductTransform != null) {
          a = this.analyticsProductTransform(a)
        }
        (window as any).analytics.track('Added Product', a)
      } else if (deltaQuantity < 0) {
        a = {
          id: item.productId,
          sku: item.productSlug,
          name: item.productName,
          quantity: deltaQuantity,
          price: item.price / 100
        }
        if (this.analyticsProductTransform != null) {
          a = this.analyticsProductTransform(a)
        }
        (window as any).analytics.track('Removed Product', a)
      }

      this.order.items[k].quantity =  quantity
      this.order.items[k].locked = locked
      this.order.items[k].ignore = ignore

      await this.cartSetItem(item.productId, quantity)

      this.updateQueue.shift()
      return this.order.items[k]
    }
  }

  @action
  async cartDeleteItem(id: string): Promise<LineItem | undefined> {
    const items = this.order.items ?? []
    let itemToDeleteIndex: number = items.length

    for (const k in items) {
      const item = items[k]
      if(
        item.productId === id ||
        item.productSlug === id ||
        item.id === id
      ) {
        itemToDeleteIndex = parseInt(k)
        break
      }
    }

    if (itemToDeleteIndex >= items.length) {
      return
    }

    const item = items[itemToDeleteIndex]

    // Remove the itemToDelete from the items list
    this.order.items = items.splice(itemToDeleteIndex, 1)

    let a: any = {
      id: item.productId,
      sku: item.productSlug,
      name: item.productName,
      quantity: item.quantity,
      price: item.price / 100,
    }

    if (this.analyticsProductTransform != null) {
      a = this.analyticsProductTransform(a)
    }

    (window as any).analytics.track('Removed Product', a)

    await this.cartSetItem(item.productId, 0)

    runInAction(() => {
      item.quantity = 0
    })

    return item
  }

  @action
  async cartSetItem(id: string, quantity: number): Promise<ICart | undefined> {
    if (this.cartId) {
      this.cart.id = this.cartId
      return this.client.cart.set({
        id: this.cartId,
        productId: id,
        quantity: quantity,
        storeId: this.storeId,
      })
    }
  }

  @action
  async cartSetStore(storeId: string): Promise<ICart | undefined> {
    if (this.cartId) {
      this.cart.id = this.cartId
      this.cart.storeId = storeId || this.storeId
      return this.client.cart.update(this.cart)
    }
  }

  @action
  async cartSetEmail(email: string): Promise<ICart | undefined> {
    if (this.cartId) {
      this.cart.id = this.cartId
      this.cart.email = this.user.email
      return this.client.cart.update(this.cart)
    }
  }

  @action
  async cartSetName(name: string): Promise<ICart | undefined> {
    if (this.cartId) {
      this.cart.id = this.cartId
      this.cart.name = name
      return this.client.cart.update(this.cart)
    }
  }

  @action
  async clear() {
    this.updateQueue.length = 0
    const itemsClone = this.order.items.slice(0)

    await Promise.all(itemsClone.map((item) => this.set(item.productId, 0)))

    return this.order.items
  }
}

export default Commerce
