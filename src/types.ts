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
  productSlug: string
  productName: string
  price: number
  listPrice: number
  description: string
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
 * Cart representation
 */
export interface IProductClient {
  product: {
    get: (id: string) => Promise<IProduct>
  }
}

export interface IClient extends ICartClient, IProductClient {

}
