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
  client: {
    cart: {
      create: () => Promise<ICart>
      update: (cart: ICart) => Promise<ICart>
    }
  }
}
