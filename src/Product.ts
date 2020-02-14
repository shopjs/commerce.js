import { observable } from 'mobx'
import { IProduct, IProductClient } from './types'

/**
 * Product is something that goes in a cart, we sync these from the server but
 * only keep the fields we care about
 */
export default class Product implements IProduct {
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

  @observable
  loadProductPromise: Promise<IProduct | void>

  @observable
  client: IProductClient

  constructor(raw: any, client: IProductClient) {
    this.client = client

    this.id = raw.id ?? ''
    this.productId = raw.productId ?? ''
    this.productSlug = raw.productSlug ?? ''
    this.productName = raw.productName ?? ''
    this.price = raw.price ?? 0
    this.listPrice = raw.listPrice ?? 0
    this.description = raw.description ?? ''

    this.loadProductPromise = client.product.get(this.id).then((product: IProduct): IProduct => {
      Object.assign(this, product)
      return this
    })
  }
}
