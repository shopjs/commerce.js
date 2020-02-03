import { observable, action } from 'mobx'

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

  constructor(raw: any) {
    this.items = raw.items ? raw.items.map((x) => new LineItem(x)): []
    this.type = raw.type ?? 'stripe'
    this.storeId = raw.storeId ?? ''
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
}


