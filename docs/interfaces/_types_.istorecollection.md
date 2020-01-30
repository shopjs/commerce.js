[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["types"](../modules/_types_.md) › [IStoreCollection](_types_.istorecollection.md)

# Interface: IStoreCollection

## Hierarchy

* **IStoreCollection**

## Implemented by

* [DStoreCollection](../classes/_dstorer_.dstorecollection.md)
* [FirebaseStoreCollection](../classes/_storers_firebase_.firebasestorecollection.md)

## Index

### Properties

* [collection](_types_.istorecollection.md#collection)
* [namespace](_types_.istorecollection.md#namespace)

### Methods

* [create](_types_.istorecollection.md#create)
* [delete](_types_.istorecollection.md#delete)
* [find](_types_.istorecollection.md#find)
* [get](_types_.istorecollection.md#get)
* [set](_types_.istorecollection.md#set)
* [update](_types_.istorecollection.md#update)
* [where](_types_.istorecollection.md#where)

## Properties

###  collection

• **collection**: *string*

*Defined in [types.ts:127](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L127)*

___

###  namespace

• **namespace**: *string*

*Defined in [types.ts:126](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L126)*

## Methods

###  create

▸ **create**<**T**>(`docT`: object): *Promise‹T›*

*Defined in [types.ts:115](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L115)*

**Type parameters:**

▪ **T**: *[IDocument](_types_.idocument.md)*

**Parameters:**

Name | Type |
------ | ------ |
`docT` | object |

**Returns:** *Promise‹T›*

___

###  delete

▸ **delete**(`id`: string): *Promise‹any›*

*Defined in [types.ts:124](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L124)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹any›*

___

###  find

▸ **find**(`params`: [string, string, any][]): *[IStoreQuery](_types_.istorequery.md)*

*Defined in [types.ts:121](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [string, string, any][] |

**Returns:** *[IStoreQuery](_types_.istorequery.md)*

___

###  get

▸ **get**(`id`: string): *Promise‹[IStoreResult](_types_.istoreresult.md)›*

*Defined in [types.ts:120](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[IStoreResult](_types_.istoreresult.md)›*

___

###  set

▸ **set**(`doc`: [IDocument](_types_.idocument.md)): *Promise‹any›*

*Defined in [types.ts:117](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`doc` | [IDocument](_types_.idocument.md) |

**Returns:** *Promise‹any›*

___

###  update

▸ **update**(`id`: string, `raw`: any): *Promise‹any›*

*Defined in [types.ts:118](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`raw` | any |

**Returns:** *Promise‹any›*

___

###  where

▸ **where**(`params`: [string, string, any][]): *[IStoreQuery](_types_.istorequery.md)*

*Defined in [types.ts:122](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [string, string, any][] |

**Returns:** *[IStoreQuery](_types_.istorequery.md)*
