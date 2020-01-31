/**
 * Cart representation
 */
export interface ICart {
  id: string
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
