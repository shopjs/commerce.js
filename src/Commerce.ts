import { observable, computed, action, reaction, runInAction } from 'mobx'
import akasha from 'akasha'

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
  order: Order = new Order({})

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

  constructor(client: ICartClient) {
    this.client = client
    this.init()
  }

  /**
   * Get the cart id
   */
  @computed
  get cartId(): string {
    return akasha.get('cartId') ?? ''
  }

  @action
  async init() {
    if (!this.cartId && this.client.cart) {
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
      this.cart.name = `${this.user.firstName} ${this.user.lastName}`
      this.client.cart.update(this.cart)
    }
  }
}

export default Commerce
