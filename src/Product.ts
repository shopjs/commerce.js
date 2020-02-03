import { observable } from 'mobx'

/**
 * Product is something that goes in a cart, we sync these from the server but
 * only keep the fields we care about
 */
export default class Product {
  @observable
  id: string

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
    this.id = raw.id ?? ''
    this.productId = raw.productId ?? ''
    this.productSlug = raw.productSlug ?? ''
    this.productName = raw.productName ?? ''
    this.price = raw.price ?? 0
    this.listPrice = raw.listPrice ?? 0
    this.description = raw.description ?? ''
  }
}

