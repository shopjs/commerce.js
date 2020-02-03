import { observable, computed } from 'mobx'
import Product from './Product'

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

  constructor(raw: any) {
    super(raw)

    this.quantity = raw.quantity
    this.locked = raw.locked
    this.ignore = raw.ignore
  }

  @computed
  get total() {
    return this.quantity * this.price
  }
}

