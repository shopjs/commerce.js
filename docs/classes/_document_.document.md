[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["Document"](../modules/_document_.md) › [Document](_document_.document.md)

# Class: Document

This is the basic Document class from which all other documents extend.
It uses MobX to provide automagically functional reactive computed values
and updates.

## Hierarchy

* **Document**

## Implements

* [IDocument](../interfaces/_types_.idocument.md)

## Index

### Constructors

* [constructor](_document_.document.md#constructor)

### Properties

* [_ref](_document_.document.md#_ref)
* [created](_document_.document.md#created)
* [deleted](_document_.document.md#deleted)
* [updated](_document_.document.md#updated)

### Accessors

* [collection](_document_.document.md#collection)
* [env](_document_.document.md#env)
* [id](_document_.document.md#id)
* [namespace](_document_.document.md#namespace)
* [path](_document_.document.md#path)
* [raw](_document_.document.md#raw)
* [uid](_document_.document.md#uid)

### Methods

* [newId](_document_.document.md#newid)

## Constructors

###  constructor

\+ **new Document**(`raw`: any): *[Document](_document_.document.md)*

*Defined in [Document.ts:66](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L66)*

Build a Document by reading in a raw js object

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`raw` | any |  {} | the raw javascript object to merge into the document  |

**Returns:** *[Document](_document_.document.md)*

## Properties

###  _ref

• **_ref**: *[DocumentRef](_document_.documentref.md)* =  new DocumentRef()

*Defined in [Document.ts:42](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L42)*

Special Values

___

###  created

• **created**: *[Interaction](_interaction_.interaction.md)* =  new Interaction()

*Implementation of [IDocument](../interfaces/_types_.idocument.md).[created](../interfaces/_types_.idocument.md#created)*

*Defined in [Document.ts:53](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L53)*

Reference to the creator of the object

___

###  deleted

• **deleted**: *[Interaction](_interaction_.interaction.md)* =  new Interaction(SYSTEM_REF, null)

*Implementation of [IDocument](../interfaces/_types_.idocument.md).[deleted](../interfaces/_types_.idocument.md#deleted)*

*Defined in [Document.ts:66](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L66)*

Reference to the deleter of the object
Date of deletion, automatically set to undefined, set to a value otherwise

___

###  updated

• **updated**: *[Interaction](_interaction_.interaction.md)[]* =  [new Interaction()]

*Implementation of [IDocument](../interfaces/_types_.idocument.md).[updated](../interfaces/_types_.idocument.md#updated)*

*Defined in [Document.ts:59](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L59)*

Date of last updates, automatically set to now

## Accessors

###  collection

• **get collection**(): *string*

*Defined in [Document.ts:151](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L151)*

Return the collection path

**Returns:** *string*

any other collection path

___

###  env

• **get env**(): *[MaybeString](../modules/_types_.md#maybestring)*

*Defined in [Document.ts:135](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L135)*

Return the environment

**Returns:** *[MaybeString](../modules/_types_.md#maybestring)*

the environment

___

###  id

• **get id**(): *[MaybeString](../modules/_types_.md#maybestring)*

*Defined in [Document.ts:92](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L92)*

Return the HashID

**Returns:** *[MaybeString](../modules/_types_.md#maybestring)*

the hash id of the Document if there is a valid one

___

###  namespace

• **get namespace**(): *[MaybeString](../modules/_types_.md#maybestring)*

*Defined in [Document.ts:143](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L143)*

Return the namespace id

**Returns:** *[MaybeString](../modules/_types_.md#maybestring)*

the namespace id

___

###  path

• **get path**(): *string[]*

*Defined in [Document.ts:123](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L123)*

Return the path elements

**Returns:** *string[]*

the path elements

___

###  raw

• **get raw**(): *any*

*Defined in [Document.ts:159](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L159)*

Return the document as a plain javascript object

**Returns:** *any*

plain javascript object

___

###  uid

• **get uid**(): *[MaybeString](../modules/_types_.md#maybestring)*

*Defined in [Document.ts:113](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L113)*

Return the uid

**Returns:** *[MaybeString](../modules/_types_.md#maybestring)*

the hash uid of the Document if there is a valid one

## Methods

###  newId

▸ **newId**(`collectionPath`: string, `uid`: string): *string*

*Defined in [Document.ts:102](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Document.ts#L102)*

Set the id based on the path and uid

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`collectionPath` | string | "/" | path of parent collection of the document |
`uid` | string |  nanoid() | the uid of the document |

**Returns:** *string*

the resulting hash id of the Document
