import Commerce from './Commerce'
import { ICartClient } from './types'
import Api from 'hanzo.js'

const KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzIzMDc4NDcsInN1YiI6IjhBVEdFZ1owdWwiLCJqdGkiOiJGVmU0NWRyVzZPYyIsIm5hbWUiOiJ0ZXN0LXB1Ymxpc2hlZC1rZXkiLCJiaXQiOjQ1MDM2MTcwNzU2NzUxNzZ9.k82KjvI4AkRIEF5pjl_hj7nSvkNEkBctHfnbZWoEgVI'
const ENDPOINT = 'https://api-dot-hanzo-staging-249116.appspot.com/'

describe('Commerce', () => {
  test('default constructor', () => {
    let c = new Commerce(new Api({
      key: KEY,
      endpoint: ENDPOINT,
    }))

    expect(c).not.toBeUndefined()
  })
})
