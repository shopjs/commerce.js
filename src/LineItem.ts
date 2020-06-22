import {
  observable,
  computed
} from 'mobx'

import Product from './Product'

import {
  ILineItem,
  IProductClient
} from './types'

/**
 * A combination of cart and quantity
 */
export default class LineItem extends Product implements ILineItem {
  @observable
  quantity: number = 1

  @observable
  locked: boolean = false

  @observable
  ignore: boolean = false

  constructor(raw: any, client: IProductClient) {
    super(raw, client)

    this.quantity = raw.quantity
    this.locked = raw.locked
    this.ignore = raw.ignore
  }

  @computed
  get total() {
    return this.quantity * this.price
  }

  @computed
  get data(): ILineItem {
    return {
      id: this.id,
      productId: this.productId,
      slug: this.slug,
      productSlug: this.productSlug,
      name: this.name,
      productName: this.name,
      price: this.price,
      listPrice: this.listPrice,
      description: this.description,
      imageURL: this.imageURL,
      image: {
        url: this.imageURL,
      },
      quantity: this.quantity,
      locked: this.locked,
      ignore: this.ignore,
    }
  }
}

