[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["types"](../modules/_types_.md) › [IDocument](_types_.idocument.md)

# Interface: IDocument

Interface for Documents

## Hierarchy

* **IDocument**

## Implemented by

* [Document](../classes/_document_.document.md)

## Index

### Properties

* [collection](_types_.idocument.md#collection)
* [created](_types_.idocument.md#created)
* [deleted](_types_.idocument.md#deleted)
* [env](_types_.idocument.md#env)
* [id](_types_.idocument.md#id)
* [namespace](_types_.idocument.md#namespace)
* [path](_types_.idocument.md#path)
* [raw](_types_.idocument.md#raw)
* [uid](_types_.idocument.md#uid)
* [updated](_types_.idocument.md#updated)

### Methods

* [newId](_types_.idocument.md#newid)

## Properties

###  collection

• **collection**: *string*

*Defined in [types.ts:54](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L54)*

Collection which is being used

___

###  created

• **created**: *[IInteraction](_types_.iinteraction.md)*

*Defined in [types.ts:69](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L69)*

Reference to the creator of the object

___

###  deleted

• **deleted**: *[IInteraction](_types_.iinteraction.md)*

*Defined in [types.ts:80](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L80)*

Reference to the deleter of the object
Date of deletion, automatically set to undefined, set to a value otherwise

___

###  env

• **env**: *[MaybeString](../modules/_types_.md#maybestring)*

*Defined in [types.ts:44](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L44)*

Environement which is being used

___

###  id

• **id**: *[MaybeString](../modules/_types_.md#maybestring)*

*Defined in [types.ts:34](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L34)*

Id combining uid and path

___

###  namespace

• **namespace**: *[MaybeString](../modules/_types_.md#maybestring)*

*Defined in [types.ts:49](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L49)*

Namespace which is being used

___

###  path

• **path**: *string[]*

*Defined in [types.ts:59](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L59)*

Path derived from id

___

###  raw

• **raw**: *any*

*Defined in [types.ts:85](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L85)*

The document as a plain javascript object

___

###  uid

• **uid**: *[MaybeString](../modules/_types_.md#maybestring)*

*Defined in [types.ts:39](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L39)*

Uid derived from id

___

###  updated

• **updated**: *[IInteraction](_types_.iinteraction.md)[]*

*Defined in [types.ts:74](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L74)*

Date of last updates

## Methods

###  newId

▸ **newId**(`a?`: undefined | string, `b?`: undefined | string): *string*

*Defined in [types.ts:64](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L64)*

Create new id from path and id

**Parameters:**

Name | Type |
------ | ------ |
`a?` | undefined &#124; string |
`b?` | undefined &#124; string |

**Returns:** *string*
