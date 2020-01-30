import { observable, computed } from 'mobx'
import { Buffer } from 'buffer/'
import nanoid from 'nanoid'

import { Ref, SYSTEM_REF } from './types'
import { IDocument, IDocumentRef, MaybeDate, MaybeString } from './types'
import Interaction from './Interaction'

export class DocumentRef implements IDocumentRef {
  /**
   * Unique id
   */
  @observable
  id: string

  /**
   * Document path
   */
  @observable
  path: string

  constructor(id: string = '', path: string = '') {
    this.id = id
    this.path = path
  }
}

/**
 * This is the basic Document class from which all other documents extend.
 * It uses MobX to provide automagically functional reactive computed values
 * and updates.
 */
export default class Document implements IDocument {

  /**
   * Special Values
   */

  /*
   * Reference to itself
   */
  _ref: DocumentRef = new DocumentRef()


  /**
   * Standard Values
   */

  /**
   * Reference to the creator of the object
   */
  @observable
  created: Interaction = new Interaction()

  /**
   * Date of last updates, automatically set to now
   */
  @observable
  updated: Interaction[] = [new Interaction()]

  /**
   * Reference to the deleter of the object
   * Date of deletion, automatically set to undefined, set to a value otherwise
   */
  @observable
  deleted: Interaction = new Interaction(SYSTEM_REF, null)

  /**
   * Build a Document by reading in a raw js object
   * @param raw the raw javascript object to merge into the document
   */
  constructor(raw: any = {}) {
    Object.assign(this, raw)

    if (raw.created) {
      this.created = new Interaction(raw.created.interactorRef, raw.created.interactedAt)
    }

    if (raw.updated) {
      this.updated = raw.updated.map((x: any) => new Interaction(x.interactorRef, x.interactedAt))
    }

    if (raw.deleted) {
      this.deleted = new Interaction(raw.deleted.interactorRef, raw.deleted.interactedAt)
    }
  }

  /**
   * Return the HashID
   * @return the hash id of the Document if there is a valid one
   */
  @computed get id(): MaybeString {
    return this._ref.id
  }

  /**
   * Set the id based on the path and uid
   * @param collectionPath path of parent collection of the document
   * @param uid the uid of the document
   * @return the resulting hash id of the Document
   */
  newId(collectionPath: string = '/', uid: string = nanoid()): string {
    this._ref.path = collectionPath + '/' + uid
    this._ref.id = uid

    return this._ref.id
  }

  /**
   * Return the uid
   * @return the hash uid of the Document if there is a valid one
   */
  @computed get uid(): MaybeString {
    if (this.id) {
      return this.path[this.path.length-1]
    }
  }

  /**
   * Return the path elements
   * @return the path elements
   */
  @computed get path(): string[] {
    if (this._ref.path) {
      return this._ref.path.split('/')
    }

    return []
  }

  /**
   * Return the environment
   * @return the environment
   */
  @computed get env(): MaybeString {
    return this.path[0]
  }

  /**
   * Return the namespace id
   * @return the namespace id
   */
  @computed get namespace(): MaybeString {
    return this.path[1]
  }

  /**
   * Return the collection path
   * @return any other collection path
   */
  @computed get collection(): string {
    return this.path.slice(2, -1).join('/')
  }

  /**
   * Return the document as a plain javascript object
   * @return plain javascript object
   */
  @computed get raw(): any {
    let raw = Object.assign({}, this)
    raw._ref = Object.assign({}, this._ref)
    raw.created = Object.assign({}, this.created)
    raw.updated = this.updated.map((x: Interaction) => Object.assign({}, x))
    raw.deleted = Object.assign({}, this.deleted)

    return raw
  }
}

let z = new Document()
