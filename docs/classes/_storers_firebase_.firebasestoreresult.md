[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["Storers/Firebase"](../modules/_storers_firebase_.md) › [FirebaseStoreResult](_storers_firebase_.firebasestoreresult.md)

# Class: FirebaseStoreResult

## Hierarchy

* **FirebaseStoreResult**

## Implements

* [IStoreResult](../interfaces/_types_.istoreresult.md)

## Index

### Constructors

* [constructor](_storers_firebase_.firebasestoreresult.md#constructor)

### Properties

* [query](_storers_firebase_.firebasestoreresult.md#query)
* [snapshots](_storers_firebase_.firebasestoreresult.md#snapshots)

### Methods

* [as](_storers_firebase_.firebasestoreresult.md#as)
* [raw](_storers_firebase_.firebasestoreresult.md#raw)
* [underlying](_storers_firebase_.firebasestoreresult.md#underlying)

## Constructors

###  constructor

\+ **new FirebaseStoreResult**(`query`: Query | undefined, `snapshots`: QueryDocumentSnapshot[] | DocumentSnapshot[]): *[FirebaseStoreResult](_storers_firebase_.firebasestoreresult.md)*

*Defined in [Storers/Firebase.ts:171](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L171)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | Query &#124; undefined |
`snapshots` | QueryDocumentSnapshot[] &#124; DocumentSnapshot[] |

**Returns:** *[FirebaseStoreResult](_storers_firebase_.firebasestoreresult.md)*

## Properties

###  query

• **query**: *Query | undefined*

*Defined in [Storers/Firebase.ts:170](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L170)*

___

###  snapshots

• **snapshots**: *QueryDocumentSnapshot[] | DocumentSnapshot[]*

*Defined in [Storers/Firebase.ts:171](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L171)*

## Methods

###  as

▸ **as**<**T**>(`docT`: object): *T[]*

*Defined in [Storers/Firebase.ts:181](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L181)*

**Type parameters:**

▪ **T**: *[IDocument](../interfaces/_types_.idocument.md)*

**Parameters:**

Name | Type |
------ | ------ |
`docT` | object |

**Returns:** *T[]*

___

###  raw

▸ **raw**(): *any[]*

*Implementation of [IStoreResult](../interfaces/_types_.istoreresult.md)*

*Defined in [Storers/Firebase.ts:185](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L185)*

**Returns:** *any[]*

___

###  underlying

▸ **underlying**(): *any[]*

*Implementation of [IStoreResult](../interfaces/_types_.istoreresult.md)*

*Defined in [Storers/Firebase.ts:189](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L189)*

**Returns:** *any[]*
