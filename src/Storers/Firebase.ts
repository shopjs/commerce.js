import {
  Firestore,
  DocumentSnapshot,
  DocumentReference,
  WhereFilterOp,
  Query,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore'

import {
  IDocument,
  IStorer,
  IStore,
  IStoreCollection,
  IStoreQuery,
  IStoreResult,
} from '../types'

export type OrderByDirection = 'desc' | 'asc'

/**
 * Storer for Firebase
 */
export default class FirebaseStorer implements IStorer {
  fs: Firestore

  constructor(arg: any) {
    this.fs = new Firestore(arg)
  }

  getStore(env: string, namespace: string): FirebaseStore {
    let col = `${env}/${namespace}`
    return new FirebaseStore(this.fs, col)
  }
}

export class FirebaseStore implements IStore {
  fs: Firestore
  namespace: string

  constructor(fs: Firestore, namespace: string) {
    this.fs = fs
    this.namespace = namespace
  }

  from(col: string): IStoreCollection {
    return new FirebaseStoreCollection(this, col)
  }

  transaction(fn: (transaction: any) => void): Promise<any> {
    return this.fs.runTransaction(fn as any)
  }

  batch(): any {
    return this.fs.batch()
  }
}

export class FirebaseStoreCollection implements IStoreCollection {
  collection: string

  store: FirebaseStore
  docRef: DocumentReference

  constructor (store: FirebaseStore, collection: string) {
    this.store = store
    this.collection = collection
    this.docRef = this.store.fs.doc(this.store.namespace)
  }

  async create<T extends IDocument>(docT: new (raw?: any) => T): Promise<T> {
    let doc = new docT()
    doc.newId(`${this.store.namespace}/${this.collection}`)

    await this.docRef.collection(this.collection).doc(doc.id as string).set(doc.raw)

    return doc
  }

  set(doc: IDocument): Promise<any> {
    return this.docRef.collection(this.collection).doc(doc.id as string).set(doc.raw)
  }

  update(id: string, raw: any): Promise<any> {
    return this.docRef.collection(this.collection).doc(id).set(raw)
  }

  async get(id: string): Promise<IStoreResult> {
    let snapshot = await this.docRef.collection(this.collection).doc(id).get()

    return new FirebaseStoreResult(undefined, [snapshot])
  }

  find(params: [string, string, any][]): IStoreQuery {
    let q: any = this.docRef.collection(this.collection)

    for (const where of params) {
      q = q.where.apply(q, where)
    }

    return new FirebaseStoreQuery(q)
  }

  where(params: [string, string, any][]): IStoreQuery {
    return this.find(params)
  }

  delete(id: string): Promise<any> {
    return this.docRef.collection(this.collection).doc(id).delete()
  }

  get namespace(): string {
    return this.store.namespace
  }
}

export class FirebaseStoreQuery implements IStoreQuery {
  query: Query
  constructor(query: Query) {
    this.query = query
  }

  async get(): Promise<IStoreResult> {
    let data = await this.query.get()

    return new FirebaseStoreResult(this.query, data.docs)
  }

  endAt(res: IStoreResult): IStoreQuery {
    return new FirebaseStoreQuery(this.query.endAt((res.underlying() as DocumentSnapshot[])[0]))
  }

  endBefore(res: IStoreResult): IStoreQuery {
    return new FirebaseStoreQuery(this.query.endBefore((res.underlying() as DocumentSnapshot[])[0]))
  }

  limit(limit: number): IStoreQuery {
    return new FirebaseStoreQuery(this.query.limit(limit))
  }

  orderBy(fieldPath: string, directionStr?: OrderByDirection): IStoreQuery {
    return new FirebaseStoreQuery(this.query.orderBy(fieldPath, directionStr))
  }

  startAfter(res: IStoreResult): IStoreQuery {
    return new FirebaseStoreQuery(this.query.startAfter((res.underlying() as DocumentSnapshot[])[0]))
  }

  startAt(res: IStoreResult): IStoreQuery {
    return new FirebaseStoreQuery(this.query.startAt((res.underlying() as DocumentSnapshot[])[0]))
  }

  find(params: [string, string, any][]): IStoreQuery {
    let q = this.query

    for (const where of params) {
      q = (q.where as any).apply(q, where)
    }

    return new FirebaseStoreQuery(q)
  }

  where(params: [string, string, any][]): IStoreQuery {
    return this.find(params)
  }
}

export class FirebaseStoreResult implements IStoreResult {
  query: Query | undefined
  snapshots: QueryDocumentSnapshot[] | DocumentSnapshot[]

  constructor(
    query: Query | undefined,
    snapshots: QueryDocumentSnapshot[] | DocumentSnapshot[])
  {
    this.query = query
    this.snapshots = snapshots
  }

  as<T extends IDocument>(docT: new (raw?: any) => T): T[] {
    return (this.snapshots as any[]).map((data: any) => new docT(data.data()))
  }

  raw(): any[] {
    return (this.snapshots as any[]).map((data: any) => data.data())
  }

  underlying(): any[] {
    return this.snapshots
  }
}
