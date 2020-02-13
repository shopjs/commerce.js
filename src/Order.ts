import { observable, action } from 'mobx'
import akasha from 'akasha'

import LineItem from './LineItem'

/**
 * Order contains information about what the user is buying
 */
export default class Order {
  @observable
  items: LineItem[]

  @observable
  type: string

  @observable
  storeId: string

  @observable
  currency: string

  @observable
  mode: 'deposit' | 'contribution' | ''

  constructor(raw: any = {}) {
    this.items = raw.items ? raw.items.map((x) => new LineItem(x)): []
    this.type = raw.type ?? 'stripe'
    this.storeId = raw.storeId ?? ''
    this.currency = (raw.currency && raw.currency.toLowerCase) ? raw.currency.toLowerCase() : 'usd'
    this.mode = raw.mode ?? ''
  }

  get(id): LineItem | undefined {
    for (const item of this.items) {
      if (item.id !== id && item.productId !== id && item.productSlug !== id) {
        continue;
      }

      return item
    }

    return undefined
  }

  static load(): Order {
    return new Order(akasha.get('order'))
  }

  static save(order: Order) {
    akasha.set('order', order)
  }
}


