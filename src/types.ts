/**
 * Cart representation
 */
export interface ICart {
  id: string
  email: string
  name: string
  storeId: string
}

/**
 * Cart LineItem Confirmation
 */
export interface ICartItem {
  id: string
  productId: string
  quantity: number
  storeId: string
}

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
}

export interface ILineItem extends IProduct {
  quantity: number
  locked: boolean
  ignore: boolean
}

export interface IOrder {
  items: ILineItem[]
  type: string
  storeId: string
  currency: string
  mode: 'deposit' | 'contribution' | ''
}

export interface ICoupon {
  type: 'flat' | 'percent'
  productId: string
  amount: number
  once: boolean
}

export interface IGeoRate {
  country?: string
  state?: string
  postalCodes?: string
  city?: string

  percent: number
  cost: number
}

export interface IAddress {
  country: string
  state: string
  city: string
  postalCode: string
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
 * Product Client
 */
export interface IProductClient {
  product: {
    get: (id: string) => Promise<IProduct>
  }
}

/**
 * Cart representation
 */
export interface IOrderClient extends IProductClient{
  checkout: {
    authorize: (data: any) => Promise<IOrder>
  }
}

export interface IClient extends ICartClient, IOrderClient, IProductClient {

}
