[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["types"](../modules/_types_.md) › [IStoreQuery](_types_.istorequery.md)

# Interface: IStoreQuery

## Hierarchy

* **IStoreQuery**

## Implemented by

* [FirebaseStoreQuery](../classes/_storers_firebase_.firebasestorequery.md)

## Index

### Methods

* [endAt](_types_.istorequery.md#endat)
* [endBefore](_types_.istorequery.md#endbefore)
* [find](_types_.istorequery.md#find)
* [get](_types_.istorequery.md#get)
* [limit](_types_.istorequery.md#limit)
* [orderBy](_types_.istorequery.md#orderby)
* [startAfter](_types_.istorequery.md#startafter)
* [startAt](_types_.istorequery.md#startat)
* [where](_types_.istorequery.md#where)

## Methods

###  endAt

▸ **endAt**(`res`: [IStoreResult](_types_.istoreresult.md)): *[IStoreQuery](_types_.istorequery.md)*

*Defined in [types.ts:133](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`res` | [IStoreResult](_types_.istoreresult.md) |

**Returns:** *[IStoreQuery](_types_.istorequery.md)*

___

###  endBefore

▸ **endBefore**(`res`: [IStoreResult](_types_.istoreresult.md)): *[IStoreQuery](_types_.istorequery.md)*

*Defined in [types.ts:134](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`res` | [IStoreResult](_types_.istoreresult.md) |

**Returns:** *[IStoreQuery](_types_.istorequery.md)*

___

###  find

▸ **find**(`params`: [string, string, any][]): *[IStoreQuery](_types_.istorequery.md)*

*Defined in [types.ts:140](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L140)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [string, string, any][] |

**Returns:** *[IStoreQuery](_types_.istorequery.md)*

___

###  get

▸ **get**(): *Promise‹[IStoreResult](_types_.istoreresult.md)›*

*Defined in [types.ts:131](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L131)*

**Returns:** *Promise‹[IStoreResult](_types_.istoreresult.md)›*

___

###  limit

▸ **limit**(`limit`: number): *[IStoreQuery](_types_.istorequery.md)*

*Defined in [types.ts:135](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`limit` | number |

**Returns:** *[IStoreQuery](_types_.istorequery.md)*

___

###  orderBy

▸ **orderBy**(`fieldPath`: string, `directionStr?`: [OrderByDirection](../modules/_types_.md#orderbydirection)): *[IStoreQuery](_types_.istorequery.md)*

*Defined in [types.ts:136](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`fieldPath` | string |
`directionStr?` | [OrderByDirection](../modules/_types_.md#orderbydirection) |

**Returns:** *[IStoreQuery](_types_.istorequery.md)*

___

###  startAfter

▸ **startAfter**(`res`: [IStoreResult](_types_.istoreresult.md)): *[IStoreQuery](_types_.istorequery.md)*

*Defined in [types.ts:137](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L137)*

**Parameters:**

Name | Type |
------ | ------ |
`res` | [IStoreResult](_types_.istoreresult.md) |

**Returns:** *[IStoreQuery](_types_.istorequery.md)*

___

###  startAt

▸ **startAt**(`res`: [IStoreResult](_types_.istoreresult.md)): *[IStoreQuery](_types_.istorequery.md)*

*Defined in [types.ts:138](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`res` | [IStoreResult](_types_.istoreresult.md) |

**Returns:** *[IStoreQuery](_types_.istorequery.md)*

___

###  where

▸ **where**(`params`: [string, string, any][]): *[IStoreQuery](_types_.istorequery.md)*

*Defined in [types.ts:141](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [string, string, any][] |

**Returns:** *[IStoreQuery](_types_.istorequery.md)*
