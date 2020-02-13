import { observable, computed } from 'mobx'
import Product from './Product'
import { IProductClient } from './types'

/**
 * A combination of cart and quantity
 */
export default class LineItem extends Product {
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
}

