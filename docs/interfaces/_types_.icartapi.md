[commerce.js](../README.md) › [Globals](../globals.md) › ["types"](../modules/_types_.md) › [ICartAPI](_types_.icartapi.md)

# Interface: ICartAPI

Abstraction of Cart API on the Commerce object

## Hierarchy

* **ICartAPI**

## Implemented by

* [Commerce](../classes/_commerce_.commerce.md)

## Index

### Methods

* [cartSetEmail](_types_.icartapi.md#cartsetemail)
* [cartSetName](_types_.icartapi.md#cartsetname)
* [cartSetStore](_types_.icartapi.md#cartsetstore)
* [clear](_types_.icartapi.md#clear)
* [setCoupon](_types_.icartapi.md#setcoupon)

## Methods

###  cartSetEmail

▸ **cartSetEmail**(`email`: string): *Promise‹[ICart](_types_.icart.md) | undefined›*

*Defined in [types.ts:139](https://github.com/hanzoai/commerce.js/blob/16d65ef/src/types.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`email` | string |

**Returns:** *Promise‹[ICart](_types_.icart.md) | undefined›*

___

###  cartSetName

▸ **cartSetName**(`name`: string): *Promise‹[ICart](_types_.icart.md) | undefined›*

*Defined in [types.ts:140](https://github.com/hanzoai/commerce.js/blob/16d65ef/src/types.ts#L140)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *Promise‹[ICart](_types_.icart.md) | undefined›*

___

###  cartSetStore

▸ **cartSetStore**(`storeId`: string): *Promise‹[ICart](_types_.icart.md) | undefined›*

*Defined in [types.ts:138](https://github.com/hanzoai/commerce.js/blob/16d65ef/src/types.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`storeId` | string |

**Returns:** *Promise‹[ICart](_types_.icart.md) | undefined›*

___

###  clear

▸ **clear**(): *Promise‹void›*

*Defined in [types.ts:142](https://github.com/hanzoai/commerce.js/blob/16d65ef/src/types.ts#L142)*

**Returns:** *Promise‹void›*

___

###  setCoupon

▸ **setCoupon**(`code?`: undefined | string): *Promise‹[ICoupon](_types_.icoupon.md) | undefined›*

*Defined in [types.ts:141](https://github.com/hanzoai/commerce.js/blob/16d65ef/src/types.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`code?` | undefined &#124; string |

**Returns:** *Promise‹[ICoupon](_types_.icoupon.md) | undefined›*
