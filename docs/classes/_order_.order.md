[commerce.js](../README.md) › [Globals](../globals.md) › ["Order"](../modules/_order_.md) › [Order](_order_.order.md)

# Class: Order

Order contains information about what the user is buying

## Hierarchy

* **Order**

## Implements

* [IOrder](../interfaces/_types_.iorder.md)

## Index

### Constructors

* [constructor](_order_.order.md#constructor)

### Properties

* [_subtotal](_order_.order.md#_subtotal)
* [bootstrapPromise](_order_.order.md#bootstrappromise)
* [client](_order_.order.md#client)
* [coupon](_order_.order.md#coupon)
* [couponCodes](_order_.order.md#couponcodes)
* [currency](_order_.order.md#currency)
* [id](_order_.order.md#id)
* [items](_order_.order.md#items)
* [mode](_order_.order.md#mode)
* [shippingAddress](_order_.order.md#shippingaddress)
* [shippingRates](_order_.order.md#shippingrates)
* [storeId](_order_.order.md#storeid)
* [taxRates](_order_.order.md#taxrates)
* [type](_order_.order.md#type)
* [userId](_order_.order.md#userid)

### Accessors

* [data](_order_.order.md#data)
* [discount](_order_.order.md#discount)
* [inItemlessMode](_order_.order.md#initemlessmode)
* [shipping](_order_.order.md#shipping)
* [shippingRate](_order_.order.md#shippingrate)
* [size](_order_.order.md#size)
* [subtotal](_order_.order.md#subtotal)
* [tax](_order_.order.md#tax)
* [taxRate](_order_.order.md#taxrate)
* [total](_order_.order.md#total)

### Methods

* [get](_order_.order.md#get)
* [clear](_order_.order.md#static-clear)
* [load](_order_.order.md#static-load)
* [save](_order_.order.md#static-save)

## Constructors

###  constructor

\+ **new Order**(`raw`: any, `taxRates`: [IGeoRate](../interfaces/_types_.igeorate.md)[], `shippingRates`: [IGeoRate](../interfaces/_types_.igeorate.md)[], `client`: [IOrderClient](../interfaces/_types_.iorderclient.md), `cartAPI`: [ICartAPI](../interfaces/_types_.icartapi.md)): *[Order](_order_.order.md)*

*Defined in [Order.ts:79](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L79)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`raw` | any |  {} |
`taxRates` | [IGeoRate](../interfaces/_types_.igeorate.md)[] |  [] |
`shippingRates` | [IGeoRate](../interfaces/_types_.igeorate.md)[] |  [] |
`client` | [IOrderClient](../interfaces/_types_.iorderclient.md) | - |
`cartAPI` | [ICartAPI](../interfaces/_types_.icartapi.md) | - |

**Returns:** *[Order](_order_.order.md)*

## Properties

###  _subtotal

• **_subtotal**: *number* = 0

*Defined in [Order.ts:73](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L73)*

Overwrite subtotal only available in itemless modes

___

###  bootstrapPromise

• **bootstrapPromise**: *Promise‹any›*

*Defined in [Order.ts:79](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L79)*

bootstrapPromise executes after contructo completes any bootstrapp (mostly coupon and lineitems in this case)

___

###  client

• **client**: *[IOrderClient](../interfaces/_types_.iorderclient.md)*

*Defined in [Order.ts:52](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L52)*

___

###  coupon

• **coupon**: *[ICoupon](../interfaces/_types_.icoupon.md) | undefined*

*Defined in [Order.ts:58](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L58)*

___

###  couponCodes

• **couponCodes**: *string[]* =  []

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[couponCodes](../interfaces/_types_.iorder.md#couponcodes)*

*Defined in [Order.ts:55](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L55)*

___

###  currency

• **currency**: *string*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[currency](../interfaces/_types_.iorder.md#currency)*

*Defined in [Order.ts:46](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L46)*

___

###  id

• **id**: *string* = ""

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[id](../interfaces/_types_.iorder.md#id)*

*Defined in [Order.ts:31](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L31)*

___

###  items

• **items**: *[LineItem](_lineitem_.lineitem.md)[]*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[items](../interfaces/_types_.iorder.md#items)*

*Defined in [Order.ts:37](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L37)*

___

###  mode

• **mode**: *"deposit" | "contribution" | ""*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[mode](../interfaces/_types_.iorder.md#mode)*

*Defined in [Order.ts:49](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L49)*

___

###  shippingAddress

• **shippingAddress**: *[IAddress](../interfaces/_types_.iaddress.md)*

*Defined in [Order.ts:67](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L67)*

___

###  shippingRates

• **shippingRates**: *[IGeoRate](../interfaces/_types_.igeorate.md)[]*

*Defined in [Order.ts:64](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L64)*

___

###  storeId

• **storeId**: *string*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[storeId](../interfaces/_types_.iorder.md#storeid)*

*Defined in [Order.ts:43](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L43)*

___

###  taxRates

• **taxRates**: *[IGeoRate](../interfaces/_types_.igeorate.md)[]*

*Defined in [Order.ts:61](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L61)*

___

###  type

• **type**: *string*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[type](../interfaces/_types_.iorder.md#type)*

*Defined in [Order.ts:40](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L40)*

___

###  userId

• **userId**: *string* = ""

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[userId](../interfaces/_types_.iorder.md#userid)*

*Defined in [Order.ts:34](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L34)*

## Accessors

###  data

• **get data**(): *[IOrder](../interfaces/_types_.iorder.md)*

*Defined in [Order.ts:329](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L329)*

**Returns:** *[IOrder](../interfaces/_types_.iorder.md)*

___

###  discount

• **get discount**(): *number*

*Defined in [Order.ts:180](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L180)*

**Returns:** *number*

___

###  inItemlessMode

• **get inItemlessMode**(): *boolean*

*Defined in [Order.ts:158](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L158)*

**Returns:** *boolean*

___

###  shipping

• **get shipping**(): *number*

*Defined in [Order.ts:317](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L317)*

**Returns:** *number*

___

###  shippingRate

• **get shippingRate**(): *[IGeoRate](../interfaces/_types_.igeorate.md)*

*Defined in [Order.ts:294](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L294)*

**Returns:** *[IGeoRate](../interfaces/_types_.igeorate.md)*

___

###  size

• **get size**(): *number*

*Defined in [Order.ts:153](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L153)*

**Returns:** *number*

the number of items on the order

___

###  subtotal

• **get subtotal**(): *number*

*Defined in [Order.ts:242](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L242)*

**Returns:** *number*

• **set subtotal**(`st`: number): *void*

*Defined in [Order.ts:257](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L257)*

**Parameters:**

Name | Type |
------ | ------ |
`st` | number |

**Returns:** *void*

___

###  tax

• **get tax**(): *number*

*Defined in [Order.ts:287](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L287)*

**Returns:** *number*

___

###  taxRate

• **get taxRate**(): *[IGeoRate](../interfaces/_types_.igeorate.md)*

*Defined in [Order.ts:264](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L264)*

**Returns:** *[IGeoRate](../interfaces/_types_.igeorate.md)*

___

###  total

• **get total**(): *number*

*Defined in [Order.ts:324](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L324)*

**Returns:** *number*

## Methods

###  get

▸ **get**(`id`: any): *[LineItem](_lineitem_.lineitem.md) | undefined*

*Defined in [Order.ts:137](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L137)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | any |

**Returns:** *[LineItem](_lineitem_.lineitem.md) | undefined*

___

### `Static` clear

▸ **clear**(): *void*

*Defined in [Order.ts:175](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L175)*

**Returns:** *void*

___

### `Static` load

▸ **load**(`client`: [IOrderClient](../interfaces/_types_.iorderclient.md), `taxRates`: [IGeoRate](../interfaces/_types_.igeorate.md)[], `shippingRates`: [IGeoRate](../interfaces/_types_.igeorate.md)[], `cartAPI`: [ICartAPI](../interfaces/_types_.icartapi.md)): *[Order](_order_.order.md)‹›*

*Defined in [Order.ts:162](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L162)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`client` | [IOrderClient](../interfaces/_types_.iorderclient.md) | - |
`taxRates` | [IGeoRate](../interfaces/_types_.igeorate.md)[] |  [] |
`shippingRates` | [IGeoRate](../interfaces/_types_.igeorate.md)[] |  [] |
`cartAPI` | [ICartAPI](../interfaces/_types_.icartapi.md) | - |

**Returns:** *[Order](_order_.order.md)‹›*

___

### `Static` save

▸ **save**(`order`: [Order](_order_.order.md)): *void*

*Defined in [Order.ts:171](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Order.ts#L171)*

**Parameters:**

Name | Type |
------ | ------ |
`order` | [Order](_order_.order.md) |

**Returns:** *void*
