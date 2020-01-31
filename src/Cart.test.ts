import Cart from './Cart'

describe('Cart', () => {
  test('default constructor', () => {
    let c = new Cart({})
    expect(c).not.toBeUndefined()
  })
})
