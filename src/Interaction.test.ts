import Interaction from './Interaction'
import { SYSTEM_REF } from './types'

describe('Interaction', () => {
  test('default constructor', () => {
    let i = new Interaction()

    expect(i.interactorRef).toBe(SYSTEM_REF)
    expect(i.interactedAt).not.toBeUndefined()
  })

  test('constructor', () => {
    let now = new Date()
    let i = new Interaction(SYSTEM_REF, now)

    expect(i.interactorRef).toBe(SYSTEM_REF)
    expect(i.interactedAt).toBe(now)
  })
})
