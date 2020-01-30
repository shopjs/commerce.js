[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["Storers/Firebase"](../modules/_storers_firebase_.md) › [FirebaseStoreCollection](_storers_firebase_.firebasestorecollection.md)

# Class: FirebaseStoreCollection

## Hierarchy

* **FirebaseStoreCollection**

## Implements

* [IStoreCollection](../interfaces/_types_.istorecollection.md)

## Index

### Constructors

* [constructor](_storers_firebase_.firebasestorecollection.md#constructor)

### Properties

* [collection](_storers_firebase_.firebasestorecollection.md#collection)
* [docRef](_storers_firebase_.firebasestorecollection.md#docref)
* [store](_storers_firebase_.firebasestorecollection.md#store)

### Accessors

* [namespace](_storers_firebase_.firebasestorecollection.md#namespace)

### Methods

* [create](_storers_firebase_.firebasestorecollection.md#create)
* [delete](_storers_firebase_.firebasestorecollection.md#delete)
* [find](_storers_firebase_.firebasestorecollection.md#find)
* [get](_storers_firebase_.firebasestorecollection.md#get)
* [set](_storers_firebase_.firebasestorecollection.md#set)
* [update](_storers_firebase_.firebasestorecollection.md#update)
* [where](_storers_firebase_.firebasestorecollection.md#where)

## Constructors

###  constructor

\+ **new FirebaseStoreCollection**(`store`: [FirebaseStore](_storers_firebase_.firebasestore.md), `collection`: string): *[FirebaseStoreCollection](_storers_firebase_.firebasestorecollection.md)*

*Defined in [Storers/Firebase.ts:64](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`store` | [FirebaseStore](_storers_firebase_.firebasestore.md) |
`collection` | string |

**Returns:** *[FirebaseStoreCollection](_storers_firebase_.firebasestorecollection.md)*

## Properties

###  collection

• **collection**: *string*

*Implementation of [IStoreCollection](../interfaces/_types_.istorecollection.md).[collection](../interfaces/_types_.istorecollection.md#collection)*

*Defined in [Storers/Firebase.ts:61](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L61)*

___

###  docRef

• **docRef**: *DocumentReference*

*Defined in [Storers/Firebase.ts:64](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L64)*

___

###  store

• **store**: *[FirebaseStore](_storers_firebase_.firebasestore.md)*

*Defined in [Storers/Firebase.ts:63](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L63)*

## Accessors

###  namespace

• **get namespace**(): *string*

*Defined in [Storers/Firebase.ts:113](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L113)*

**Returns:** *string*

## Methods

###  create

▸ **create**<**T**>(`docT`: object): *Promise‹T›*

*Defined in [Storers/Firebase.ts:72](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L72)*

**Type parameters:**

▪ **T**: *[IDocument](../interfaces/_types_.idocument.md)*

**Parameters:**

Name | Type |
------ | ------ |
`docT` | object |

**Returns:** *Promise‹T›*

___

###  delete

▸ **delete**(`id`: string): *Promise‹any›*

*Implementation of [IStoreCollection](../interfaces/_types_.istorecollection.md)*

*Defined in [Storers/Firebase.ts:109](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹any›*

___

###  find

▸ **find**(`params`: [string, string, any][]): *[IStoreQuery](../interfaces/_types_.istorequery.md)*

*Implementation of [IStoreCollection](../interfaces/_types_.istorecollection.md)*

*Defined in [Storers/Firebase.ts:95](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [string, string, any][] |

**Returns:** *[IStoreQuery](../interfaces/_types_.istorequery.md)*

___

###  get

▸ **get**(`id`: string): *Promise‹[IStoreResult](../interfaces/_types_.istoreresult.md)›*

*Implementation of [IStoreCollection](../interfaces/_types_.istorecollection.md)*

*Defined in [Storers/Firebase.ts:89](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[IStoreResult](../interfaces/_types_.istoreresult.md)›*

___

###  set

▸ **set**(`doc`: [IDocument](../interfaces/_types_.idocument.md)): *Promise‹any›*

*Implementation of [IStoreCollection](../interfaces/_types_.istorecollection.md)*

*Defined in [Storers/Firebase.ts:81](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`doc` | [IDocument](../interfaces/_types_.idocument.md) |

**Returns:** *Promise‹any›*

___

###  update

▸ **update**(`id`: string, `raw`: any): *Promise‹any›*

*Implementation of [IStoreCollection](../interfaces/_types_.istorecollection.md)*

*Defined in [Storers/Firebase.ts:85](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`raw` | any |

**Returns:** *Promise‹any›*

___

###  where

▸ **where**(`params`: [string, string, any][]): *[IStoreQuery](../interfaces/_types_.istorequery.md)*

*Implementation of [IStoreCollection](../interfaces/_types_.istorecollection.md)*

*Defined in [Storers/Firebase.ts:105](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [string, string, any][] |

**Returns:** *[IStoreQuery](../interfaces/_types_.istorequery.md)*
