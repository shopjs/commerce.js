import Commerce from './Commerce'
import { ICartClient } from './types'

describe('Commerce', () => {
  test('default constructor', () => {
    let c = new Commerce({} as ICartClient)
    expect(c).not.toBeUndefined()
  })
})
