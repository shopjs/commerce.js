import { observable, computed, action } from 'mobx'
import akasha from 'akasha'

interface ICart {
  id: string
}

interface ICartClient {
  client: {
    cart: {
      create: () => Promise<ICart>
    }
  }
}

/**
 * Product is something that goes in a cart, we sync these from the server but
 * only keep the fields we care about
 */
class Product {
  @observable
  productId: string

  @observable
  productSlug: string

  @observable
  productName: string

  @observable
  price: number

  @observable
  listPrice: number

  @observable
  description: string

  constructor(raw: any) {
    this.productId = raw.productId ?? ""
    this.productSlug = raw.productSlug ?? ""
    this.productName = raw.productName ?? ""
    this.price = raw.price ?? 0
    this.listPrice = raw.listPrice ?? 0
    this.description = raw.description ?? ""
  }
}

/**
 * A combination of cart and quantity
 */
class LineItem extends Product {
  @observable
  quantity: number = 1

  constructor(raw: any) {
    super(raw)

    this.quantity = raw.quantity
  }

  @computed
  get total() {
    return this.quantity * this.price
  }
}

type CartUpdateRequest = [string, number, boolean, boolean]

/**
 * Cart keeps track of items being added and removed from the cart/order
 */
class Cart {
  /**
   * Id of the current cart in the system
   */
  @observable
  cartId: string = ""

  @observable
  api: any

  @observable
  lineItems: LineItem[] = []

  @observable
  updateQueue: CartUpdateRequest[] = []

  @observable
  updateQueuePromise: Promise<any> | undefined

  @observable
  updateQueuePromiseResolve: ((val?: any) => void) | undefined

  @observable
  updateQueuePromiseReject: ((error?: Error) => void) | undefined

  @observable
  order: any = {}

  constructor(api: any) {
    this.cartId = akasha.get('cartId')
    this.api = api
  }
}

export default Cart
