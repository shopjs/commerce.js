[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["DStorer"](../modules/_dstorer_.md) › [DStoreCollection](_dstorer_.dstorecollection.md)

# Class: DStoreCollection

## Hierarchy

* **DStoreCollection**

## Implements

* [IStoreCollection](../interfaces/_types_.istorecollection.md)

## Index

### Constructors

* [constructor](_dstorer_.dstorecollection.md#constructor)

### Properties

* [registerFn](_dstorer_.dstorecollection.md#registerfn)
* [storeCollection](_dstorer_.dstorecollection.md#storecollection)

### Accessors

* [collection](_dstorer_.dstorecollection.md#collection)
* [namespace](_dstorer_.dstorecollection.md#namespace)

### Methods

* [create](_dstorer_.dstorecollection.md#create)
* [delete](_dstorer_.dstorecollection.md#delete)
* [find](_dstorer_.dstorecollection.md#find)
* [get](_dstorer_.dstorecollection.md#get)
* [set](_dstorer_.dstorecollection.md#set)
* [update](_dstorer_.dstorecollection.md#update)
* [where](_dstorer_.dstorecollection.md#where)

## Constructors

###  constructor

\+ **new DStoreCollection**(`storeCollection`: [IStoreCollection](../interfaces/_types_.istorecollection.md), `registerFn`: function): *[DStoreCollection](_dstorer_.dstorecollection.md)*

*Defined in [DStorer.ts:116](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/DStorer.ts#L116)*

**Parameters:**

▪ **storeCollection**: *[IStoreCollection](../interfaces/_types_.istorecollection.md)*

▪ **registerFn**: *function*

▸ (`doc`: [IDocument](../interfaces/_types_.idocument.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`doc` | [IDocument](../interfaces/_types_.idocument.md) |

**Returns:** *[DStoreCollection](_dstorer_.dstorecollection.md)*

## Properties

###  registerFn

• **registerFn**: *function*

*Defined in [DStorer.ts:116](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/DStorer.ts#L116)*

#### Type declaration:

▸ (`doc`: [IDocument](../interfaces/_types_.idocument.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`doc` | [IDocument](../interfaces/_types_.idocument.md) |

___

###  storeCollection

• **storeCollection**: *[IStoreCollection](../interfaces/_types_.istorecollection.md)*

*Defined in [DStorer.ts:115](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/DStorer.ts#L115)*

## Accessors

###  collection

• **get collection**(): *string*

*Defined in [DStorer.ts:183](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/DStorer.ts#L183)*

**Returns:** *string*

___

###  namespace

• **get namespace**(): *string*

*Defined in [DStorer.ts:179](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/DStorer.ts#L179)*

**Returns:** *string*

## Methods

###  create

▸ **create**<**T**>(`docT`: object): *Promise‹T›*

*Defined in [DStorer.ts:123](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/DStorer.ts#L123)*

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

*Defined in [DStorer.ts:175](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/DStorer.ts#L175)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹any›*

___

###  find

▸ **find**(`params`: [string, string, any][]): *[IStoreQuery](../interfaces/_types_.istorequery.md)*

*Implementation of [IStoreCollection](../interfaces/_types_.istorecollection.md)*

*Defined in [DStorer.ts:167](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/DStorer.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [string, string, any][] |

**Returns:** *[IStoreQuery](../interfaces/_types_.istorequery.md)*

___

###  get

▸ **get**(`id`: string): *Promise‹[IStoreResult](../interfaces/_types_.istoreresult.md)›*

*Implementation of [IStoreCollection](../interfaces/_types_.istorecollection.md)*

*Defined in [DStorer.ts:163](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/DStorer.ts#L163)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[IStoreResult](../interfaces/_types_.istoreresult.md)›*

___

###  set

▸ **set**(`doc`: [IDocument](../interfaces/_types_.idocument.md)): *Promise‹any›*

*Implementation of [IStoreCollection](../interfaces/_types_.istorecollection.md)*

*Defined in [DStorer.ts:131](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/DStorer.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`doc` | [IDocument](../interfaces/_types_.idocument.md) |

**Returns:** *Promise‹any›*

___

###  update

▸ **update**(`id`: string, `raw`: any): *Promise‹any›*

*Implementation of [IStoreCollection](../interfaces/_types_.istorecollection.md)*

*Defined in [DStorer.ts:147](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/DStorer.ts#L147)*

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

*Defined in [DStorer.ts:171](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/DStorer.ts#L171)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [string, string, any][] |

**Returns:** *[IStoreQuery](../interfaces/_types_.istorequery.md)*
