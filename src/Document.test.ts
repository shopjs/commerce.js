import Document from './Document'
import Interaction from './Interaction'

describe('Document', () => {
  test('default constructor', () => {
    let d = new Document()

    expect(d._ref.id).toBe('')
    expect(d.created).not.toBe(undefined)
    expect(d.updated.length).toBe(1)
    expect(d.deleted).not.toBe(undefined)
    expect(d.id).toBe(d._ref.id)
    expect(d.uid).toBeUndefined()
    expect(d.path).toEqual([])
    expect(d.env).toBeUndefined()
    expect(d.namespace).toBeUndefined()
    expect(d.collection).toBe('')
  })

  test('constructor', () => {
    let now = new Date()
    let raw = {
      created: new Interaction('aaa'),
      updated: [new Interaction('bbb')],
      deleted: new Interaction('ccc'),
    }

    let d = new Document(raw)

    expect(d._ref.id).toBe('')
    expect(d.created).toEqual(raw.created)
    expect(d.updated).toEqual(raw.updated)
    expect(d.deleted).toEqual(raw.deleted)

    expect(d.id).toBe(d._ref.id)
    expect(d.uid).toBeUndefined()
    expect(d.path).toEqual([])
    expect(d.env).toBeUndefined()
    expect(d.namespace).toBeUndefined()
    expect(d.collection).toBe('')
  })

  test('setId defaults', () => {
    let now = new Date()

    let d = new Document()

    d.newId()

    expect(d.id).not.toBeUndefined()
    expect(d.uid).not.toBeUndefined()
    expect(d.path).toEqual(['', '', d.uid])
    expect(d.env).toBe('')
    expect(d.namespace).toBe('')
    expect(d.collection).toBe('')
  })

  test('setId', () => {
    let now = new Date()

    let d = new Document()
    let uid = 'hello'
    let env = 'test'
    let namespace = 'test-namespace'
    let col = 'doc'

    d.newId(`${env}/${namespace}/${col}`, uid)

    expect(d.id).toBe('hello')
    expect(d.uid).toBe(uid)
    expect(d.path).toEqual([env, namespace, col, uid])
    expect(d.env).toBe(env)
    expect(d.namespace).toBe(namespace)
    expect(d.collection).toBe(col)
  })
})
