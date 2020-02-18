[@hanzo/commercejs](../README.md) › [Globals](../globals.md) › ["User"](../modules/_user_.md) › [User](_user_.user.md)

# Class: User

## Hierarchy

* **User**

## Implements

* [IUser](../interfaces/_types_.iuser.md)

## Index

### Constructors

* [constructor](_user_.user.md#constructor)

### Properties

* [email](_user_.user.md#email)
* [firstName](_user_.user.md#firstname)
* [lastName](_user_.user.md#lastname)

### Methods

* [clear](_user_.user.md#static-clear)
* [load](_user_.user.md#static-load)
* [save](_user_.user.md#static-save)

## Constructors

###  constructor

\+ **new User**(`raw`: any, `cartAPI`: [ICartAPI](../interfaces/_types_.icartapi.md)): *[User](_user_.user.md)*

*Defined in [User.ts:22](https://github.com/shopjs/commerce.js/blob/180f42a/src/User.ts#L22)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`raw` | any |  {} |
`cartAPI` | [ICartAPI](../interfaces/_types_.icartapi.md) | - |

**Returns:** *[User](_user_.user.md)*

## Properties

###  email

• **email**: *string*

*Implementation of [IUser](../interfaces/_types_.iuser.md).[email](../interfaces/_types_.iuser.md#email)*

*Defined in [User.ts:16](https://github.com/shopjs/commerce.js/blob/180f42a/src/User.ts#L16)*

___

###  firstName

• **firstName**: *string*

*Implementation of [IUser](../interfaces/_types_.iuser.md).[firstName](../interfaces/_types_.iuser.md#firstname)*

*Defined in [User.ts:19](https://github.com/shopjs/commerce.js/blob/180f42a/src/User.ts#L19)*

___

###  lastName

• **lastName**: *string*

*Implementation of [IUser](../interfaces/_types_.iuser.md).[lastName](../interfaces/_types_.iuser.md#lastname)*

*Defined in [User.ts:22](https://github.com/shopjs/commerce.js/blob/180f42a/src/User.ts#L22)*

## Methods

### `Static` clear

▸ **clear**(`user`: [User](_user_.user.md)): *void*

*Defined in [User.ts:62](https://github.com/shopjs/commerce.js/blob/180f42a/src/User.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`user` | [User](_user_.user.md) |

**Returns:** *void*

___

### `Static` load

▸ **load**(`cartAPI`: [ICartAPI](../interfaces/_types_.icartapi.md)): *[User](_user_.user.md)‹›*

*Defined in [User.ts:54](https://github.com/shopjs/commerce.js/blob/180f42a/src/User.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`cartAPI` | [ICartAPI](../interfaces/_types_.icartapi.md) |

**Returns:** *[User](_user_.user.md)‹›*

___

### `Static` save

▸ **save**(`user`: [User](_user_.user.md)): *void*

*Defined in [User.ts:58](https://github.com/shopjs/commerce.js/blob/180f42a/src/User.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`user` | [User](_user_.user.md) |

**Returns:** *void*
