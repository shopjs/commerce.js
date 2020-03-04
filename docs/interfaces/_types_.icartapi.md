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

*Defined in [types.ts:127](https://github.com/shopjs/commerce.js/blob/91f7495/src/types.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`email` | string |

**Returns:** *Promise‹[ICart](_types_.icart.md) | undefined›*

___

###  cartSetName

▸ **cartSetName**(`name`: string): *Promise‹[ICart](_types_.icart.md) | undefined›*

*Defined in [types.ts:128](https://github.com/shopjs/commerce.js/blob/91f7495/src/types.ts#L128)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *Promise‹[ICart](_types_.icart.md) | undefined›*

___

###  cartSetStore

▸ **cartSetStore**(`storeId`: string): *Promise‹[ICart](_types_.icart.md) | undefined›*

*Defined in [types.ts:126](https://github.com/shopjs/commerce.js/blob/91f7495/src/types.ts#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`storeId` | string |

**Returns:** *Promise‹[ICart](_types_.icart.md) | undefined›*

___

###  clear

▸ **clear**(): *Promise‹void›*

*Defined in [types.ts:130](https://github.com/shopjs/commerce.js/blob/91f7495/src/types.ts#L130)*

**Returns:** *Promise‹void›*

___

###  setCoupon

▸ **setCoupon**(`code?`: undefined | string): *Promise‹[ICoupon](_types_.icoupon.md) | undefined›*

*Defined in [types.ts:129](https://github.com/shopjs/commerce.js/blob/91f7495/src/types.ts#L129)*

**Parameters:**

Name | Type |
------ | ------ |
`code?` | undefined &#124; string |

**Returns:** *Promise‹[ICoupon](_types_.icoupon.md) | undefined›*
