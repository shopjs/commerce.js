import { observable } from 'mobx'

import FirebaseStorer from './Storers/Firebase'
import DStorer from './DStorer'
import Document from './Document'
import { IDocument } from './types'

import path from 'path'

const delay = async (n: number) => {
  return new Promise((res: any, rej: any) => {
    setTimeout(() => {
      res()
    }, n)
  })
}

class Test extends Document {
  @observable
  a: number

  @observable
  b: number

  @observable
  c: number

  constructor(raw: any = {}) {
    super(raw)

    this.a = raw.a ?? 1
    this.b = raw.b ?? 2
    this.c = raw.c ?? 3
  }
}

let ds: DStorer

beforeEach(() => {
  let fs = new FirebaseStorer({
    keyFilename: path.join(__dirname, '..', '..', '..', 'secrets', 'sa-key.json')
  })

  ds = new DStorer(fs, 'test', 'test-org', 'test', { test: true })
})

afterEach(async () => {
  await ds.cleanUp()
})

describe('DStorer', () => {
  test('create & get', async () => {
    let col = ds.from('test-collection')
    let d1 = await col.create(Test)

    expect(d1.id).not.toBeUndefined()
    expect(d1.created).not.toBeUndefined()
    expect(d1.updated).not.toBeUndefined()
    expect(d1.deleted).not.toBeUndefined()

    let p = await col.get(d1.id as string)
    let d2 = p.as(Test)[0]

    expect(d1).toEqual(d2)
  })

  test('set & get', async () => {
    let col = ds.from('test-collection')
    let d1 = await col.create(Test)
    d1.b = 4

    await col.set(d1)

    expect(d1.id).not.toBeUndefined()
    expect(d1.created).not.toBeUndefined()
    expect(d1.updated.length).toBe(2)
    expect(d1.deleted).not.toBeUndefined()
    expect(d1.a).toBe(1)
    expect(d1.b).toBe(4)
    expect(d1.c).toBe(3)

    let p = await col.get(d1.id as string)
    let d2 = p.as(Test)[0]

    expect(d1).toEqual(d2)
  })
})

