import {
  observable,
} from 'mobx'

import {
  IProduct,
  IProductClient,
} from './types'

import {
  log,
} from './utils'

import fetch from 'cross-fetch'

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
  slug: string

  @observable
  productSlug: string

  @observable
  name: string

  @observable
  productName: string

  @observable
  price: number

  @observable
  listPrice: number

  @observable
  description: string

  @observable
  bootstrapPromise: Promise<IProduct | void>

  @observable
  client: IProductClient

  @observable
  imageURL: string

  @observable
  image: {
    url: string,
  }

  @observable
  storeId: string

  constructor(raw: any, client: IProductClient) {
    this.client = client

    this.id = raw.id ?? ''
    this.productId = raw.productId ?? ''
    this.slug = raw.slug ?? ''
    this.productSlug = raw.productSlug ?? ''
    this.name = raw.name ?? ''
    this.productName = raw.productName ?? ''
    this.price = raw.price ?? 0
    this.listPrice = raw.listPrice ?? 0
    this.description = raw.description ?? ''
    this.imageURL = raw.imageURL ?? ''
    if (raw && raw.image) {
      this.image = {
        url: raw.image.url,
      }
    } else {
      this.image = {
        url: '',
      }
    }
    this.storeId = raw.storeId ?? ''

    if (this.storeId) {
      this.bootstrapPromise = (async (self) => {
        try {
          let path = client.client.url(`/store/${self.storeId}/product/${self.id}`)
          let res = await fetch(`${path}?token=${client.client.getKey()}`)
          let product = await res.json()

          Object.assign(self, product)
          self.productId = product.id
          self.productSlug = product.slug
          self.productName = product.name
          self.imageURL = product.image.url
          return self
        } catch(err) {
          log('loadProduct error', err)
          throw err
        }
      })(this)
    } else {
      this.bootstrapPromise = client.product.get(this.id).then((product: IProduct): IProduct => {
        Object.assign(this, product)
        this.productId = product.id
        this.productSlug = product.slug
        this.productName = product.name
        this.imageURL = product.image.url
        return this
      }).catch((err) => {
        log('loadProduct error', err)
        throw err
      })
    }
  }
}

