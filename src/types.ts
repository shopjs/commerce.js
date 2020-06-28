/**
 * Cart Abstraction
 */
export interface ICart {
  id: string
  email: string
  name: string
  storeId: string
}

/**
 * CartItem Abstraction
 */
export interface ICartItem {
  id: string
  productId: string
  quantity: number
  storeId: string
}

/**
 * Product Abstraction
 */
export interface IProduct {
  id: string
  productId: string
  slug: string
  productSlug: string
  name: string
  productName: string
  price: number
  listPrice: number
  description: string
  image: {
    url: string,
  },
  imageURL: string
}

/**
 * LineItem Abstraction
 */
export interface ILineItem extends IProduct {
  quantity: number
  locked: boolean
  ignore: boolean
}

/**
 * Order Abstraction
 */
export interface IOrder {
  id: string
  userId: string
  currency: string
  shippingAddress: IAddress
  items: ILineItem[]
  mode: 'deposit' | 'contribution' | ''
  storeId: string
  type: string
  number?: number
  metadata?: any
  referrerId: string
  templateId: string

  subtotal: number
  total: number
  tax: number
  shipping: number
  discount: number
  couponCodes: string[]
}

/**
 * Payment Abstraction
 */
export interface IPayment {
  account: {
    name: string,
    number: string,
    cvc: string,
    month: string,
    year: string,
  },
}

/**
 * User Abstraction
 */
export interface IUser {
  email: string
  firstName: string
  lastName: string
}

/**
 * Coupon Abstraction
 */
export interface ICoupon {
  amount: number
  code: string
  enabled: boolean
  freeProductId: string
  once: boolean
  productId: string
  type: 'flat' | 'percent'
}

/**
 * GeoRate Abstraction
 */
export interface IGeoRate {
  country?: string
  state?: string
  postalCodes?: string
  city?: string
  above?: number
  below?: number

  percent: number
  cost: number
}

/**
 * Address Abstraction
 */
export interface IAddress {
  country: string
  state: string
  city: string
  postalCode: string
}

/**
 * Abstraction of Cart API on the Commerce object
 */
export interface ICartAPI {
  cartSetStore(storeId: string): Promise<ICart | undefined>
  cartSetEmail(email: string): Promise<ICart | undefined>
  cartSetName(name: string): Promise<ICart | undefined>
  setCoupon(code?: string): Promise<ICoupon | undefined>
  clear(): Promise<void>
}

/**
 * Checkout Client Authorize Config
 */
export interface IAuthorizeConfig {
  user: IUser
  order: IOrder
  payment: IPayment
}

/**
 * Checkout Client
 */
export interface ICheckoutClient {
  checkout: {
    authorize(opts: IAuthorizeConfig): Promise<IOrder | undefined>
    capture(id: string): Promise<IOrder | undefined>
  }
}

/**
 * Cart Client
 */
export interface ICartClient {
  cart: {
    set: (cartItem: ICartItem) => Promise<ICart>
    create: () => Promise<ICart>
    update: (cart: ICart) => Promise<ICart>
  }
}

/**
 * Coupon Client
 */
export interface ICouponClient {
  coupon: {
    get: (code: string) => Promise<ICoupon>
  }
}

/**
 * Product Client
 */
export interface IProductClient {
  product: {
    get: (id: string) => Promise<IProduct>
  }
  client: {
    getKey: () => string
    url: (path: string) => string
  }
  fetch?: (path: string) => Promise<any>
}

/**
 * Cart representation
 */
export interface IOrderClient extends IProductClient{
}

export interface IClient extends ICartClient, IOrderClient, IProductClient, ICouponClient, ICheckoutClient {
}
