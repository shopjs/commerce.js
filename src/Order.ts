import {
  action,
  autorun,
  computed,
  observable,
  reaction,
} from 'mobx'

import {
  closestGeoRate
} from './utils'

import akasha from 'akasha'

import LineItem from './LineItem'

import {
  IAddress,
  ICartAPI,
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
  id: string = ''

  @observable
  userId: string = ''

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
  couponCodes: string[] = []

  @observable
  coupon: ICoupon | undefined

  @observable
  taxRates: IGeoRate[]

  @observable
  shippingRates: IGeoRate[]

  @observable
  shippingAddress: IAddress

  /**
   * Overwrite subtotal only available in itemless modes
   */
  @observable
  _subtotal: number = 0

  /**
   * bootstrapPromise executes after contructo completes any bootstrapp (mostly coupon and lineitems in this case)
   */
  @observable
  bootstrapPromise: Promise<any>

  constructor(
    raw: any = {},
    taxRates: IGeoRate[] = [],
    shippingRates: IGeoRate[] = [],
    client: IOrderClient,
    cartAPI: ICartAPI,
  ) {
    this.client = client
    this.taxRates = taxRates
    this.shippingRates = shippingRates

    this.items = raw.items ? raw.items.map((x) => new LineItem(x, client)): []
    this.bootstrapPromise = Promise.all(this.items.map((x) => x.bootstrapPromise))

    this.type = raw.type ?? 'stripe'
    this.storeId = raw.storeId ?? ''
    this.currency = (raw.currency && raw.currency.toLowerCase) ? raw.currency.toLowerCase() : 'usd'

    this.mode = raw.mode ?? ''
    this.subtotal = raw.subtotal ?? 0

    this.shippingAddress = raw.shippingAddress ?? {
      country: '',
      state: '',
      city: '',
      postalCode: '',
    }

    if (raw.couponCodes && raw.couponCodes.length > 0) {
      this.bootstrapPromise = Promise.all([cartAPI.setCoupon(raw.couponCodes[0]), this.bootstrapPromise])
    }

    // Save order on any update
    autorun(() => {
      Order.save(this)
    })

    // Define reaction for storeid
    reaction (
      () => this.storeId,
      (storeId) => {
        cartAPI.cartSetStore(storeId)
      }
    )

    // clear items when we switch to itemless mode
    reaction(
      () => this.mode,
      () => {
        if (this.inItemlessMode) {
          cartAPI.clear()
        }
      }
    )
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

  /**
   * @return the number of items on the order
   */
  @computed
  get size(): number {
    return this.items.length
  }

  @computed
  get inItemlessMode(): boolean {
    return this.mode === 'deposit' || this.mode === 'contribution'
  }

  static load(
    client: IOrderClient,
    taxRates: IGeoRate[] = [],
    shippingRates: IGeoRate[] = [],
    cartAPI: ICartAPI,
  ) {
    return new Order(akasha.get('order'), [], [], client, cartAPI)
  }

  static save(order: Order) {
    akasha.set('order', order.data)
  }

  static clear() {
    akasha.remove('order')
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
      return this._subtotal
    }

    let subtotal = 0
    let items = this.items

    for (const item of items) {
      subtotal += item.price * item.quantity
    }

    return subtotal
  }

  set subtotal(st: number) {
    if (this.inItemlessMode) {
      this._subtotal = st
    }
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
    return this.subtotal + this.shipping + this.tax - this.discount
  }

  @computed
  get data(): IOrder {
    return {
      id: this.id,
      userId: this.userId,
      currency: this.currency,
      items: this.items.map((item) => item.data),
      mode: this.mode,
      storeId: this.storeId,
      type: this.type,
      subtotal: this.subtotal,
      total: this.total,
      tax: this.tax,
      shipping: this.shipping,
      discount: this.discount,
      couponCodes: this.couponCodes,
    }
  }
}
