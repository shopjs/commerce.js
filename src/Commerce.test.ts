import Commerce from './Commerce'
import { ICartClient } from './types'
import Api from 'hanzo.js'

const KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzIzMDc4NDcsInN1YiI6IjhBVEdFZ1owdWwiLCJqdGkiOiJGVmU0NWRyVzZPYyIsIm5hbWUiOiJ0ZXN0LXB1Ymxpc2hlZC1rZXkiLCJiaXQiOjQ1MDM2MTcwNzU2NzUxNzZ9.k82KjvI4AkRIEF5pjl_hj7nSvkNEkBctHfnbZWoEgVI'
const ENDPOINT = 'https://api-dot-hanzo-staging-249116.appspot.com/'

describe('Commerce', () => {
  let client = new Api({
    key: KEY,
    endpoint: ENDPOINT,
  })

  test('default constructor', () => {
    let order = {
      currency: 'usd',
      items: [],
    }

    let c = new Commerce(client, order)

    expect(c.client).toBe(client)
    expect(c.order.currency).toBe(order.currency)
    expect(c.order.type).toBe('stripe')
    expect(c.order.storeId).toBe('')
    expect(c.order.items).toEqual([])
  })

  test('default cartInit', async () => {
    let order = {
      currency: 'usd',
      items: [],
    }

    let c = new Commerce(client, order)
    let cart = await c.cartInit()

    expect(cart.id).toEqual(expect.any(String))
    expect(c.cart.id).toBe(cart.id)
  })
})
