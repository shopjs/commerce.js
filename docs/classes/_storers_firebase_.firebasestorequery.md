[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["Storers/Firebase"](../modules/_storers_firebase_.md) › [FirebaseStoreQuery](_storers_firebase_.firebasestorequery.md)

# Class: FirebaseStoreQuery

## Hierarchy

* **FirebaseStoreQuery**

## Implements

* [IStoreQuery](../interfaces/_types_.istorequery.md)

## Index

### Constructors

* [constructor](_storers_firebase_.firebasestorequery.md#constructor)

### Properties

* [query](_storers_firebase_.firebasestorequery.md#query)

### Methods

* [endAt](_storers_firebase_.firebasestorequery.md#endat)
* [endBefore](_storers_firebase_.firebasestorequery.md#endbefore)
* [find](_storers_firebase_.firebasestorequery.md#find)
* [get](_storers_firebase_.firebasestorequery.md#get)
* [limit](_storers_firebase_.firebasestorequery.md#limit)
* [orderBy](_storers_firebase_.firebasestorequery.md#orderby)
* [startAfter](_storers_firebase_.firebasestorequery.md#startafter)
* [startAt](_storers_firebase_.firebasestorequery.md#startat)
* [where](_storers_firebase_.firebasestorequery.md#where)

## Constructors

###  constructor

\+ **new FirebaseStoreQuery**(`query`: Query): *[FirebaseStoreQuery](_storers_firebase_.firebasestorequery.md)*

*Defined in [Storers/Firebase.ts:119](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | Query |

**Returns:** *[FirebaseStoreQuery](_storers_firebase_.firebasestorequery.md)*

## Properties

###  query

• **query**: *Query*

*Defined in [Storers/Firebase.ts:119](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L119)*

## Methods

###  endAt

▸ **endAt**(`res`: [IStoreResult](../interfaces/_types_.istoreresult.md)): *[IStoreQuery](../interfaces/_types_.istorequery.md)*

*Implementation of [IStoreQuery](../interfaces/_types_.istorequery.md)*

*Defined in [Storers/Firebase.ts:130](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`res` | [IStoreResult](../interfaces/_types_.istoreresult.md) |

**Returns:** *[IStoreQuery](../interfaces/_types_.istorequery.md)*

___

###  endBefore

▸ **endBefore**(`res`: [IStoreResult](../interfaces/_types_.istoreresult.md)): *[IStoreQuery](../interfaces/_types_.istorequery.md)*

*Implementation of [IStoreQuery](../interfaces/_types_.istorequery.md)*

*Defined in [Storers/Firebase.ts:134](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`res` | [IStoreResult](../interfaces/_types_.istoreresult.md) |

**Returns:** *[IStoreQuery](../interfaces/_types_.istorequery.md)*

___

###  find

▸ **find**(`params`: [string, string, any][]): *[IStoreQuery](../interfaces/_types_.istorequery.md)*

*Implementation of [IStoreQuery](../interfaces/_types_.istorequery.md)*

*Defined in [Storers/Firebase.ts:154](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [string, string, any][] |

**Returns:** *[IStoreQuery](../interfaces/_types_.istorequery.md)*

___

###  get

▸ **get**(): *Promise‹[IStoreResult](../interfaces/_types_.istoreresult.md)›*

*Implementation of [IStoreQuery](../interfaces/_types_.istorequery.md)*

*Defined in [Storers/Firebase.ts:124](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L124)*

**Returns:** *Promise‹[IStoreResult](../interfaces/_types_.istoreresult.md)›*

___

###  limit

▸ **limit**(`limit`: number): *[IStoreQuery](../interfaces/_types_.istorequery.md)*

*Implementation of [IStoreQuery](../interfaces/_types_.istorequery.md)*

*Defined in [Storers/Firebase.ts:138](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`limit` | number |

**Returns:** *[IStoreQuery](../interfaces/_types_.istorequery.md)*

___

###  orderBy

▸ **orderBy**(`fieldPath`: string, `directionStr?`: [OrderByDirection](../modules/_storers_firebase_.md#orderbydirection)): *[IStoreQuery](../interfaces/_types_.istorequery.md)*

*Implementation of [IStoreQuery](../interfaces/_types_.istorequery.md)*

*Defined in [Storers/Firebase.ts:142](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`fieldPath` | string |
`directionStr?` | [OrderByDirection](../modules/_storers_firebase_.md#orderbydirection) |

**Returns:** *[IStoreQuery](../interfaces/_types_.istorequery.md)*

___

###  startAfter

▸ **startAfter**(`res`: [IStoreResult](../interfaces/_types_.istoreresult.md)): *[IStoreQuery](../interfaces/_types_.istorequery.md)*

*Implementation of [IStoreQuery](../interfaces/_types_.istorequery.md)*

*Defined in [Storers/Firebase.ts:146](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`res` | [IStoreResult](../interfaces/_types_.istoreresult.md) |

**Returns:** *[IStoreQuery](../interfaces/_types_.istorequery.md)*

___

###  startAt

▸ **startAt**(`res`: [IStoreResult](../interfaces/_types_.istoreresult.md)): *[IStoreQuery](../interfaces/_types_.istorequery.md)*

*Implementation of [IStoreQuery](../interfaces/_types_.istorequery.md)*

*Defined in [Storers/Firebase.ts:150](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`res` | [IStoreResult](../interfaces/_types_.istoreresult.md) |

**Returns:** *[IStoreQuery](../interfaces/_types_.istorequery.md)*

___

###  where

▸ **where**(`params`: [string, string, any][]): *[IStoreQuery](../interfaces/_types_.istorequery.md)*

*Implementation of [IStoreQuery](../interfaces/_types_.istorequery.md)*

*Defined in [Storers/Firebase.ts:164](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L164)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [string, string, any][] |

**Returns:** *[IStoreQuery](../interfaces/_types_.istorequery.md)*
