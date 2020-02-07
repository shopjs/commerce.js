import { observable, computed, action, reaction, runInAction } from 'mobx'
import akasha from 'akasha'

import LineItem from './LineItem'
import Order from './Order'

import { ICart, ICartClient } from './types'

export type CartUpdateRequest = [string, number, boolean, boolean]

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
   * client is reference to a ICartClient
   */
  @observable
  client: ICartClient

  /**
   * updateQueue contains the list of cart item updates so we can ensure
   * updates are pushed fifo
   */
  @observable
  updateQueue: CartUpdateRequest[] = []

  /**
   * updateQueuePromise is a refernce to the promise for ongoing cart item
   * updates
   */
  @observable
  updateQueuePromise: Promise<any> | undefined

  /**
   * updateQueuePromiseResolve is a refernce to the promise resolve function
   * for ongoing cart item updates.  It resolves when the queue is empty.
   */
  @observable
  updateQueuePromiseResolve: ((val?: any) => void) | undefined

  /**
   * updateQueuePromiseResolve is a refernce to the promise reject function
   * for ongoing cart item updates.  It rejects when errors are encountered
   */
  @observable
  updateQueuePromiseReject: ((error?: Error) => void) | undefined

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

  /**
   * Create an instance of Commerce
   * @param client is the http client for talking to carts
   * @param order is the default order configuration
   */
  constructor(client: ICartClient, order = {}) {
    this.client = client
    this.order = new Order({})
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
      this.order = new Order(akasha.get('order'))
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

  get(id: string): LineItem | undefined {
    // Check the item on the order
    let item = this.order.get(id)

    if (item) {
      return item
    }

    // Check the item in the queue
    for (const request of this.updateQueue) {
      if (request[0] !== id) {
        continue;
      }

      return new LineItem({
        id: request[0],
        quantity: request[1],
        locked: request[2],
        ignore: request[3],
      })
    }
  }

  @action
  async cartSetItem(productId: string, quantity: number) {
    if (this.cartId) {
      this.cart.id = this.cartId
      this.client.cart.update(this.cart)
    }
  }

  @action
  async cartSetStore(storeId: string) {
    if (this.cartId) {
      this.cart.id = this.cartId
      this.cart.storeId =storeId
      this.client.cart.update(this.cart)
    }
  }

  @action
  async cartSetEmail(email: string) {
    if (this.cartId) {
      this.cart.id = this.cartId
      this.cart.email = this.user.email
      this.client.cart.update(this.cart)
    }
  }

  @action
  async cartSetName(name: string) {
    if (this.cartId) {
      this.cart.id = this.cartId
      this.cart.name = name
      this.client.cart.update(this.cart)
    }
  }
}

export default Commerce
