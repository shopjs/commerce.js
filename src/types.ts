/**
 * Cart representation
 */
export interface ICart {
  id: string
  storeId: string
  email: string
  name: string
}

/**
 * Cart representation
 */
export interface ICartClient {
  cart: {
    create: () => Promise<ICart>
    update: (cart: ICart) => Promise<ICart>
  }
}
