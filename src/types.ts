import { DocumentReference as FsDocRef } from '@google-cloud/firestore'

/**
 * Default value for a Ref
 */
export const SYSTEM_REF: string = 'system'
export type OrderByDirection = 'desc' | 'asc'

/**
 * A union type representing all the possible Refs supported by DStorer
 */
export type Ref = IDocumentRef | FsDocRef | typeof SYSTEM_REF

/**
 * Interface for Interactions
 */
export interface IInteraction {
  interactorRef: Ref
  interactedAt: MaybeDate
}

export interface IDocumentRef {
  id: string
  path: string
}

/**
 * Interface for Documents
 */
export interface IDocument {
  /**
   * Id combining uid and path
   */
  id: MaybeString

  /**
   * Uid derived from id
   */
  uid: MaybeString

  /**
   * Environement which is being used
   */
  env: MaybeString

  /**
   * Namespace which is being used
   */
  namespace: MaybeString

  /**
   * Collection which is being used
   */
  collection: string

  /**
   * Path derived from id
   */
  path: string[]

  /**
   * Create new id from path and id
   */
  newId(a?: string, b?: string): string

  /**
   * Reference to the creator of the object
   */
  created: IInteraction

  /**
   * Date of last updates
   */
  updated: IInteraction[]

  /**
   * Reference to the deleter of the object
   * Date of deletion, automatically set to undefined, set to a value otherwise
   */
  deleted: IInteraction

  /**
   * The document as a plain javascript object
   */
  raw: any
}

/**
 * Interface for DStorer backends
 */
export interface IStorer {
  getStore(env: string, namespace: string): IStore
}

/**
 * Interface for Stores
 */
export interface IStore {
  from(col: string, registerFn?: (doc: IDocument) => void): IStoreCollection

  /**
   * Run in transaction (use underlying for now)
   */
  transaction(fn: (transaction: any) => void): Promise<any>

  /**
   * Run in batch (use underlying for now)
   */
  batch(): any

  namespace: string
}

export interface IStoreCollection {
  create<T extends IDocument>(docT: new (raw?: any) => T): Promise<T>

  set(doc: IDocument): Promise<any>
  update(id: string, raw: any): Promise<any>

  get(id: string): Promise<IStoreResult>
  find(params: [string, string, any][]): IStoreQuery
  where(params: [string, string, any][]): IStoreQuery

  delete(id: string): Promise<any>

  namespace: string
  collection: string
}

export interface IStoreQuery {
  get(): Promise<IStoreResult>

  endAt(res: IStoreResult): IStoreQuery
  endBefore(res: IStoreResult): IStoreQuery
  limit(limit: number): IStoreQuery
  orderBy(fieldPath: string, directionStr?: OrderByDirection): IStoreQuery
  startAfter(res: IStoreResult): IStoreQuery
  startAt(res: IStoreResult): IStoreQuery

  find(params: [string, string, any][]): IStoreQuery
  where(params: [string, string, any][]): IStoreQuery
}

export interface IStoreResult {
  as<T extends IDocument>(docT: new (raw?: any) => T): T[]
  raw(): any[]
  underlying(): any[]
}

/**
 * A date or undefined or null
 */
export type MaybeDate = Date | undefined | null

/**
 * A string or undefined or null
 */
export type MaybeString = string | undefined | null
