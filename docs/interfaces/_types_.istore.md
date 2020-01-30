[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["types"](../modules/_types_.md) › [IStore](_types_.istore.md)

# Interface: IStore

Interface for Stores

## Hierarchy

* **IStore**

## Implemented by

* [DStorer](../classes/_dstorer_.dstorer.md)
* [FirebaseStore](../classes/_storers_firebase_.firebasestore.md)

## Index

### Properties

* [namespace](_types_.istore.md#namespace)

### Methods

* [batch](_types_.istore.md#batch)
* [from](_types_.istore.md#from)
* [transaction](_types_.istore.md#transaction)

## Properties

###  namespace

• **namespace**: *string*

*Defined in [types.ts:111](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L111)*

## Methods

###  batch

▸ **batch**(): *any*

*Defined in [types.ts:109](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L109)*

Run in batch (use underlying for now)

**Returns:** *any*

___

###  from

▸ **from**(`col`: string, `registerFn?`: undefined | function): *[IStoreCollection](_types_.istorecollection.md)*

*Defined in [types.ts:99](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`col` | string |
`registerFn?` | undefined &#124; function |

**Returns:** *[IStoreCollection](_types_.istorecollection.md)*

___

###  transaction

▸ **transaction**(`fn`: function): *Promise‹any›*

*Defined in [types.ts:104](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L104)*

Run in transaction (use underlying for now)

**Parameters:**

▪ **fn**: *function*

▸ (`transaction`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | any |

**Returns:** *Promise‹any›*
