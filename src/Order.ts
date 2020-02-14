import {
  action,
  autorun,
  computed,
  observable,
} from 'mobx'

import {
  closestGeoRate
} from './utils'

import akasha from 'akasha'

import LineItem from './LineItem'

import {
  IAddress,
  ICoupon,
  IGeoRate,
  IOrder,
  IOrderClient,
} from './types'

/**
 * Order contains information about what the user is buying
 */
export default class Order implements IOrder {
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

  @observable
  client: IOrderClient

  @observable
  coupon: ICoupon | undefined

  @observable
  taxRates: IGeoRate[]

  @observable
  shippingRates: IGeoRate[]

  @observable
  shippingAddress: IAddress

  constructor(
    raw: any = {},
    taxRates: IGeoRate[] = [],
    shippingRates: IGeoRate[] = [],
    client: IOrderClient
  ) {
    this.client = client
    this.taxRates = taxRates
    this.shippingRates = shippingRates

    this.items = raw.items ? raw.items.map((x) => new LineItem(x, client)): []
    this.type = raw.type ?? 'stripe'
    this.storeId = raw.storeId ?? ''
    this.currency = (raw.currency && raw.currency.toLowerCase) ? raw.currency.toLowerCase() : 'usd'
    this.mode = raw.mode ?? ''
    this.shippingAddress = raw.shippingAddress ?? {
      country: '',
      state: '',
      city: '',
      postalCode: '',
    }

    autorun(() => {
      Order.save(this)
    })
  }

  get(id): LineItem | undefined {
    for (const item of this.items) {
      if (item.id !== id && item.productId !== id && item.productSlug !== id) {
        continue
      }

      return item
    }

    return undefined
  }

  @computed
  get inItemlessMode() : boolean {
    const mode = this.mode
    return mode === 'deposit' || mode === 'contribution'
  }

  static load(client: IOrderClient) {
    return new Order(akasha.get('order'), [], [], client)
  }

  static save(order: Order) {
    akasha.set('order', order)
  }

  @computed
  get discount(): number {
    const coupon = this.coupon

    let discount = 0

    if (coupon != null) {
      switch (coupon.type) {
        case 'flat':
          if ((coupon.productId == null) || (coupon.productId === '')) {
            discount = (coupon.amount || 0)
          } else {
            for (const item of this.items) {
              if (item.productId === coupon.productId) {
                let {
                  quantity
                } = item

                if (coupon.once) {
                  quantity = 1
                }

                discount += (coupon.amount || 0) * quantity
              }
            }
          }
          break

        case 'percent':
          if ((coupon.productId == null) || (coupon.productId === '')) {
            for (const item of this.items) {
              let {
                quantity
              } = item

              if (coupon.once) {
                quantity = 1
              }

              discount += (coupon.amount || 0) * item.price * quantity * 0.01
            }
          } else {
            for (const item of this.items) {
              if (item.productId === coupon.productId) {
                let {
                  quantity
                } = item
                if (coupon.once) {
                  quantity = 1
                }
                discount += (coupon.amount || 0) * item.price * quantity * 0.01
              }
            }
          }
          discount = Math.floor(discount)
          break
      }
    }

    return discount
  }

  @computed
  get subtotal(): number {
    if (this.inItemlessMode) {
      return 0
    }

    let subtotal = 0
    let items = this.items

    subtotal = -this.discount

    for (const item of items) {
      subtotal += item.price * item.quantity
    }

    return subtotal
  }

  @computed
  get taxRate(): IGeoRate {
    let rate = {
      percent: 0,
      cost: 0,
    }

    const country = this.shippingAddress.country
    const state = this.shippingAddress.state
    const city = this.shippingAddress.city
    const postalCode = this.shippingAddress.postalCode

    let [gr, l, i] = closestGeoRate(
      this.taxRates,
      country,
      state,
      city,
      postalCode
    )

    return gr ?? rate
  }

  @computed
  get tax(): number {
    const taxRate   = this.taxRate
    return Math.ceil((taxRate.percent != null ? taxRate.percent : 0) * this.subtotal) +
      (taxRate.cost != null ? taxRate.cost : 0)
  }

  @computed
  get shippingRate(): IGeoRate {
    let rate = {
      percent: 0,
      cost: 0,
    }

    const country = this.shippingAddress.country
    const state = this.shippingAddress.state
    const city = this.shippingAddress.city
    const postalCode = this.shippingAddress.postalCode

    let [gr, l, i] = closestGeoRate(
      this.shippingRates,
      country,
      state,
      city,
      postalCode
    )

    return gr ?? rate
  }

  @computed
  get shipping(): number {
    const shippingRate   = this.shippingRate
    return Math.ceil((shippingRate.percent != null ? shippingRate.percent : 0) * this.subtotal) +
      (shippingRate.cost != null ? shippingRate.cost : 0)
  }

  @computed
  get total(): number {
    return this.subtotal + this.shipping + this.tax
  }
}


