[commerce.js](../README.md) › [Globals](../globals.md) › ["Commerce"](../modules/_commerce_.md) › [Commerce](_commerce_.commerce.md)

# Class: Commerce

Cart keeps track of items being added and removed from the cart/order

## Hierarchy

* **Commerce**

## Implements

* [ICartAPI](../interfaces/_types_.icartapi.md)

## Index

### Constructors

* [constructor](_commerce_.commerce.md#constructor)

### Properties

* [_storeId](_commerce_.commerce.md#_storeid)
* [analytics](_commerce_.commerce.md#analytics)
* [analyticsProductTransform](_commerce_.commerce.md#analyticsproducttransform)
* [bootstrapPromise](_commerce_.commerce.md#bootstrappromise)
* [client](_commerce_.commerce.md#client)
* [order](_commerce_.commerce.md#order)
* [payment](_commerce_.commerce.md#payment)
* [updateQueue](_commerce_.commerce.md#updatequeue)
* [updateQueuePromise](_commerce_.commerce.md#updatequeuepromise)
* [user](_commerce_.commerce.md#user)

### Accessors

* [cartId](_commerce_.commerce.md#cartid)
* [isCartInit](_commerce_.commerce.md#iscartinit)
* [items](_commerce_.commerce.md#items)
* [size](_commerce_.commerce.md#size)
* [storeId](_commerce_.commerce.md#storeid)

### Methods

* [cartInit](_commerce_.commerce.md#cartinit)
* [cartSetEmail](_commerce_.commerce.md#cartsetemail)
* [cartSetItem](_commerce_.commerce.md#cartsetitem)
* [cartSetName](_commerce_.commerce.md#cartsetname)
* [cartSetStore](_commerce_.commerce.md#cartsetstore)
* [checkout](_commerce_.commerce.md#checkout)
* [clear](_commerce_.commerce.md#clear)
* [del](_commerce_.commerce.md#del)
* [executeUpdateItem](_commerce_.commerce.md#executeupdateitem)
* [executeUpdates](_commerce_.commerce.md#executeupdates)
* [get](_commerce_.commerce.md#get)
* [refresh](_commerce_.commerce.md#refresh)
* [set](_commerce_.commerce.md#set)
* [setCoupon](_commerce_.commerce.md#setcoupon)
* [setStoreId](_commerce_.commerce.md#setstoreid)

### Object literals

* [cart](_commerce_.commerce.md#cart)

## Constructors

###  constructor

\+ **new Commerce**(`client`: [IClient](../interfaces/_types_.iclient.md), `order?`: any, `taxRates`: [IGeoRate](../interfaces/_types_.igeorate.md)[], `shippingRates`: [IGeoRate](../interfaces/_types_.igeorate.md)[], `analytics`: any, `aPT`: [AnalyticsProductTransformFn](../modules/_commerce_.md#analyticsproducttransformfn)): *[Commerce](_commerce_.commerce.md)*

*Defined in [Commerce.ts:109](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L109)*

Create an instance of Commerce

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`client` | [IClient](../interfaces/_types_.iclient.md) | - | is the http client for talking to carts |
`order?` | any | - | is the default order configuration |
`taxRates` | [IGeoRate](../interfaces/_types_.igeorate.md)[] | [] | is an array of IGeoRates for taxes |
`shippingRates` | [IGeoRate](../interfaces/_types_.igeorate.md)[] | [] | is an array of IGeoRates for taxes |
`analytics` | any | undefined | is the call to the analytics library |
`aPT` | [AnalyticsProductTransformFn](../modules/_commerce_.md#analyticsproducttransformfn) | (v) => v | is a function for transforming analytics objects before sending them  |

**Returns:** *[Commerce](_commerce_.commerce.md)*

## Properties

###  _storeId

• **_storeId**: *string*

*Defined in [Commerce.ts:109](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L109)*

the current storeId

___

###  analytics

• **analytics**: *any*

*Defined in [Commerce.ts:90](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L90)*

payment is the object for tracking the user's payment information

___

###  analyticsProductTransform

• **analyticsProductTransform**: *[AnalyticsProductTransformFn](../modules/_commerce_.md#analyticsproducttransformfn)*

*Defined in [Commerce.ts:97](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L97)*

analyticsProductTransform is a function for transforming analytics objects
before sending them

___

###  bootstrapPromise

• **bootstrapPromise**: *Promise‹any›*

*Defined in [Commerce.ts:103](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L103)*

bootstrapPromise executes after contructor completes any bootstrap

___

###  client

• **client**: *[IClient](../interfaces/_types_.iclient.md)*

*Defined in [Commerce.ts:52](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L52)*

client is reference to a IClient

___

###  order

• **order**: *[Order](_order_.order.md)*

*Defined in [Commerce.ts:72](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L72)*

order is the object for tracking the user's order/cart info

___

###  payment

• **payment**: *any*

*Defined in [Commerce.ts:84](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L84)*

payment is the object for tracking the user's payment information

___

###  updateQueue

• **updateQueue**: *[CartUpdateRequest](../modules/_commerce_.md#cartupdaterequest)[]* = []

*Defined in [Commerce.ts:59](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L59)*

updateQueue contains the list of cart item updates so we can ensure
updates are pushed fifo

___

###  updateQueuePromise

• **updateQueuePromise**: *Promise‹void›* = new Promise((res) => { res() })

*Defined in [Commerce.ts:66](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L66)*

updateQueuePromise is a reference to the promise generated by the
updateQueue for the purposes of awaiting outside of the direct call

___

###  user

• **user**: *[User](_user_.user.md)*

*Defined in [Commerce.ts:78](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L78)*

user is an object for tracking the user's contact information

## Accessors

###  cartId

• **get cartId**(): *string*

*Defined in [Commerce.ts:162](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L162)*

Get the cart id

**Returns:** *string*

the cartId of the current cart from storage.  If there is no
current cart, return empty

___

###  isCartInit

• **get isCartInit**(): *boolean*

*Defined in [Commerce.ts:170](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L170)*

Get the cart id

**Returns:** *boolean*

___

###  items

• **get items**(): *[LineItem](_lineitem_.lineitem.md)[]*

*Defined in [Commerce.ts:144](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L144)*

**Returns:** *[LineItem](_lineitem_.lineitem.md)[]*

the items on the order

___

###  size

• **get size**(): *number*

*Defined in [Commerce.ts:152](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L152)*

**Returns:** *number*

the number of items on the order

___

###  storeId

• **get storeId**(): *string*

*Defined in [Commerce.ts:190](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L190)*

**Returns:** *string*

## Methods

###  cartInit

▸ **cartInit**(): *Promise‹[ICart](../interfaces/_types_.icart.md)›*

*Defined in [Commerce.ts:199](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L199)*

Initialize the cart system.

**Returns:** *Promise‹[ICart](../interfaces/_types_.icart.md)›*

initialized or recovered cart instance

___

###  cartSetEmail

▸ **cartSetEmail**(`email`: string): *Promise‹[ICart](../interfaces/_types_.icart.md) | undefined›*

*Implementation of [ICartAPI](../interfaces/_types_.icartapi.md)*

*Defined in [Commerce.ts:600](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L600)*

Set the cart's email directly on the server (shouldn't be used directly in high level
operations)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`email` | string | user email |

**Returns:** *Promise‹[ICart](../interfaces/_types_.icart.md) | undefined›*

ICart returned from server

___

###  cartSetItem

▸ **cartSetItem**(`id`: string, `quantity`: number): *Promise‹[ICart](../interfaces/_types_.icart.md) | undefined›*

*Defined in [Commerce.ts:565](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L565)*

Set the cart's items directly on the server (shouldn't be used directly in high level
operations)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string | productId |
`quantity` | number | of product |

**Returns:** *Promise‹[ICart](../interfaces/_types_.icart.md) | undefined›*

ICart returned from server

___

###  cartSetName

▸ **cartSetName**(`name`: string): *Promise‹[ICart](../interfaces/_types_.icart.md) | undefined›*

*Implementation of [ICartAPI](../interfaces/_types_.icartapi.md)*

*Defined in [Commerce.ts:615](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L615)*

Set the cart's user name directly on the server (shouldn't be used directly in high level
operations)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | user's name |

**Returns:** *Promise‹[ICart](../interfaces/_types_.icart.md) | undefined›*

ICart returned from server

___

###  cartSetStore

▸ **cartSetStore**(`storeId`: string): *Promise‹[ICart](../interfaces/_types_.icart.md) | undefined›*

*Implementation of [ICartAPI](../interfaces/_types_.icartapi.md)*

*Defined in [Commerce.ts:585](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L585)*

Set the cart's store directly on the server (shouldn't be used directly in high level
operations)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeId` | string | id of the store |

**Returns:** *Promise‹[ICart](../interfaces/_types_.icart.md) | undefined›*

ICart returned from server

___

###  checkout

▸ **checkout**(`payment`: [IPayment](../interfaces/_types_.ipayment.md)): *Promise‹[IOrder](../interfaces/_types_.iorder.md) | undefined›*

*Defined in [Commerce.ts:676](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L676)*

Checkout the order

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`payment` | [IPayment](../interfaces/_types_.ipayment.md) | contains the user's credit card credentials |

**Returns:** *Promise‹[IOrder](../interfaces/_types_.iorder.md) | undefined›*

IOrder returned from server's capture endpoint

___

###  clear

▸ **clear**(): *Promise‹void›*

*Implementation of [ICartAPI](../interfaces/_types_.icartapi.md)*

*Defined in [Commerce.ts:630](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L630)*

Set the cart's user name directly on the server (shouldn't be used directly in high level
operations)

**Returns:** *Promise‹void›*

ICart returned from server

___

###  del

▸ **del**(`id`: string): *Promise‹[LineItem](_lineitem_.lineitem.md) | undefined›*

*Defined in [Commerce.ts:507](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L507)*

Delete an item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string | productId |

**Returns:** *Promise‹[LineItem](_lineitem_.lineitem.md) | undefined›*

LineItem that was deleted

___

###  executeUpdateItem

▸ **executeUpdateItem**(`id`: string, `quantity`: number, `locked`: boolean, `ignore`: boolean): *Promise‹[LineItem](_lineitem_.lineitem.md) | undefined›*

*Defined in [Commerce.ts:406](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L406)*

Execute update for item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string | productId |
`quantity` | number | amount of productId in cart |
`locked` | boolean | is this lineitem modifiable in the UI |
`ignore` | boolean | is this lineitem ignored by the UI (loading in progress, freebie etc) |

**Returns:** *Promise‹[LineItem](_lineitem_.lineitem.md) | undefined›*

LineItem if item is updated or undefined if something was invalid

___

###  executeUpdates

▸ **executeUpdates**(): *Promise‹void›*

*Defined in [Commerce.ts:296](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L296)*

Execute all queued updates

**Returns:** *Promise‹void›*

promise for when all queued updates are done

___

###  get

▸ **get**(`id`: string): *Promise‹[LineItem](_lineitem_.lineitem.md) | undefined›*

*Defined in [Commerce.ts:221](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L221)*

Get the current state of a specific lineitem

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string | the product id of a lineitem |

**Returns:** *Promise‹[LineItem](_lineitem_.lineitem.md) | undefined›*

lineitem or undefined if product isn't in cart

___

###  refresh

▸ **refresh**(`id`: any): *Promise‹[LineItem](_lineitem_.lineitem.md) | undefined›*

*Defined in [Commerce.ts:281](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L281)*

Refresh a lineitem by product id.  Add lineitem to asynchronous update queue

**Parameters:**

Name | Type |
------ | ------ |
`id` | any |

**Returns:** *Promise‹[LineItem](_lineitem_.lineitem.md) | undefined›*

return the LineItem if it exists or nothing if it doesn't.

___

###  set

▸ **set**(`id`: any, `quantity`: any, `locked`: boolean, `ignore`: boolean, `force`: boolean): *Promise‹void›*

*Defined in [Commerce.ts:265](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L265)*

Set a lineitem by product id.  Add lineitem to asynchronous update queue

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`id` | any | - | productId |
`quantity` | any | - | amount of productId in cart |
`locked` | boolean | false | is this lineitem modifiable in the UI |
`ignore` | boolean | false | is this lineitem ignored by the UI (loading in progress, freebie etc) |
`force` | boolean | false | - |

**Returns:** *Promise‹void›*

promise for when all set operations are completed

___

###  setCoupon

▸ **setCoupon**(`code?`: undefined | string): *Promise‹[ICoupon](../interfaces/_types_.icoupon.md) | undefined›*

*Implementation of [ICartAPI](../interfaces/_types_.icartapi.md)*

*Defined in [Commerce.ts:645](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L645)*

Apply a coupon/promoCode

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`code?` | undefined &#124; string | coupon code/ID |

**Returns:** *Promise‹[ICoupon](../interfaces/_types_.icoupon.md) | undefined›*

ICoupon returned from server

___

###  setStoreId

▸ **setStoreId**(`sId`: any): *Promise‹void›*

*Defined in [Commerce.ts:175](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L175)*

**Parameters:**

Name | Type |
------ | ------ |
`sId` | any |

**Returns:** *Promise‹void›*

## Object literals

###  cart

### ▪ **cart**: *object*

*Defined in [Commerce.ts:41](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L41)*

metadata of the current cart

###  email

• **email**: *string* = ""

*Defined in [Commerce.ts:44](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L44)*

###  id

• **id**: *string* = ""

*Defined in [Commerce.ts:42](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L42)*

###  name

• **name**: *string* = ""

*Defined in [Commerce.ts:45](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L45)*

###  storeId

• **storeId**: *string* = ""

*Defined in [Commerce.ts:43](https://github.com/shopjs/commerce.js/blob/edb5ef8/src/Commerce.ts#L43)*
