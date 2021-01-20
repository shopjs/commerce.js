[@hanzo/commerce.js](../README.md) › [Globals](../globals.md) › ["Order"](../modules/_order_.md) › [Order](_order_.order.md)

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
* [metadata](_order_.order.md#metadata)
* [mode](_order_.order.md#mode)
* [number](_order_.order.md#optional-number)
* [referrerId](_order_.order.md#referrerid)
* [shippingAddress](_order_.order.md#shippingaddress)
* [shippingRates](_order_.order.md#shippingrates)
* [storeId](_order_.order.md#storeid)
* [taxRates](_order_.order.md#taxrates)
* [templateId](_order_.order.md#templateid)
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

*Defined in [Order.ts:92](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L92)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`raw` | any | {} |
`taxRates` | [IGeoRate](../interfaces/_types_.igeorate.md)[] | [] |
`shippingRates` | [IGeoRate](../interfaces/_types_.igeorate.md)[] | [] |
`client` | [IOrderClient](../interfaces/_types_.iorderclient.md) | - |
`cartAPI` | [ICartAPI](../interfaces/_types_.icartapi.md) | - |

**Returns:** *[Order](_order_.order.md)*

## Properties

###  _subtotal

• **_subtotal**: *number* = 0

*Defined in [Order.ts:86](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L86)*

Overwrite subtotal only available in itemless modes

___

###  bootstrapPromise

• **bootstrapPromise**: *Promise‹any›*

*Defined in [Order.ts:92](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L92)*

bootstrapPromise executes after contructo completes any bootstrapp (mostly coupon and lineitems in this case)

___

###  client

• **client**: *[IOrderClient](../interfaces/_types_.iorderclient.md)*

*Defined in [Order.ts:53](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L53)*

___

###  coupon

• **coupon**: *[ICoupon](../interfaces/_types_.icoupon.md) | undefined*

*Defined in [Order.ts:59](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L59)*

___

###  couponCodes

• **couponCodes**: *string[]* = []

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[couponCodes](../interfaces/_types_.iorder.md#couponcodes)*

*Defined in [Order.ts:56](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L56)*

___

###  currency

• **currency**: *string*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[currency](../interfaces/_types_.iorder.md#currency)*

*Defined in [Order.ts:47](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L47)*

___

###  id

• **id**: *string* = ""

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[id](../interfaces/_types_.iorder.md#id)*

*Defined in [Order.ts:32](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L32)*

___

###  items

• **items**: *[LineItem](_lineitem_.lineitem.md)[]*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[items](../interfaces/_types_.iorder.md#items)*

*Defined in [Order.ts:38](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L38)*

___

###  metadata

• **metadata**: *any*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[metadata](../interfaces/_types_.iorder.md#optional-metadata)*

*Defined in [Order.ts:74](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L74)*

___

###  mode

• **mode**: *"deposit" | "contribution" | ""*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[mode](../interfaces/_types_.iorder.md#mode)*

*Defined in [Order.ts:50](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L50)*

___

### `Optional` number

• **number**? : *undefined | number*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[number](../interfaces/_types_.iorder.md#optional-number)*

*Defined in [Order.ts:71](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L71)*

___

###  referrerId

• **referrerId**: *string* = ""

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[referrerId](../interfaces/_types_.iorder.md#referrerid)*

*Defined in [Order.ts:77](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L77)*

___

###  shippingAddress

• **shippingAddress**: *[IAddress](../interfaces/_types_.iaddress.md)*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[shippingAddress](../interfaces/_types_.iorder.md#shippingaddress)*

*Defined in [Order.ts:68](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L68)*

___

###  shippingRates

• **shippingRates**: *[IGeoRate](../interfaces/_types_.igeorate.md)[]*

*Defined in [Order.ts:65](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L65)*

___

###  storeId

• **storeId**: *string*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[storeId](../interfaces/_types_.iorder.md#storeid)*

*Defined in [Order.ts:44](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L44)*

___

###  taxRates

• **taxRates**: *[IGeoRate](../interfaces/_types_.igeorate.md)[]*

*Defined in [Order.ts:62](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L62)*

___

###  templateId

• **templateId**: *string* = ""

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[templateId](../interfaces/_types_.iorder.md#templateid)*

*Defined in [Order.ts:80](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L80)*

___

###  type

• **type**: *string*

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[type](../interfaces/_types_.iorder.md#type)*

*Defined in [Order.ts:41](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L41)*

___

###  userId

• **userId**: *string* = ""

*Implementation of [IOrder](../interfaces/_types_.iorder.md).[userId](../interfaces/_types_.iorder.md#userid)*

*Defined in [Order.ts:35](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L35)*

## Accessors

###  data

• **get data**(): *[IOrder](../interfaces/_types_.iorder.md)*

*Defined in [Order.ts:340](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L340)*

**Returns:** *[IOrder](../interfaces/_types_.iorder.md)*

___

###  discount

• **get discount**(): *number*

*Defined in [Order.ts:189](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L189)*

**Returns:** *number*

___

###  inItemlessMode

• **get inItemlessMode**(): *boolean*

*Defined in [Order.ts:167](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L167)*

**Returns:** *boolean*

___

###  shipping

• **get shipping**(): *number*

*Defined in [Order.ts:328](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L328)*

**Returns:** *number*

___

###  shippingRate

• **get shippingRate**(): *[IGeoRate](../interfaces/_types_.igeorate.md)*

*Defined in [Order.ts:304](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L304)*

**Returns:** *[IGeoRate](../interfaces/_types_.igeorate.md)*

___

###  size

• **get size**(): *number*

*Defined in [Order.ts:162](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L162)*

**Returns:** *number*

the number of items on the order

___

###  subtotal

• **get subtotal**(): *number*

*Defined in [Order.ts:251](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L251)*

**Returns:** *number*

• **set subtotal**(`st`: number): *void*

*Defined in [Order.ts:266](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L266)*

**Parameters:**

Name | Type |
------ | ------ |
`st` | number |

**Returns:** *void*

___

###  tax

• **get tax**(): *number*

*Defined in [Order.ts:297](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L297)*

**Returns:** *number*

___

###  taxRate

• **get taxRate**(): *[IGeoRate](../interfaces/_types_.igeorate.md)*

*Defined in [Order.ts:273](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L273)*

**Returns:** *[IGeoRate](../interfaces/_types_.igeorate.md)*

___

###  total

• **get total**(): *number*

*Defined in [Order.ts:335](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L335)*

**Returns:** *number*

## Methods

###  get

▸ **get**(`id`: any): *[LineItem](_lineitem_.lineitem.md) | undefined*

*Defined in [Order.ts:146](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | any |

**Returns:** *[LineItem](_lineitem_.lineitem.md) | undefined*

___

### `Static` clear

▸ **clear**(): *void*

*Defined in [Order.ts:184](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L184)*

**Returns:** *void*

___

### `Static` load

▸ **load**(`client`: [IOrderClient](../interfaces/_types_.iorderclient.md), `taxRates`: [IGeoRate](../interfaces/_types_.igeorate.md)[], `shippingRates`: [IGeoRate](../interfaces/_types_.igeorate.md)[], `cartAPI`: [ICartAPI](../interfaces/_types_.icartapi.md)): *[Order](_order_.order.md)‹›*

*Defined in [Order.ts:171](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L171)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`client` | [IOrderClient](../interfaces/_types_.iorderclient.md) | - |
`taxRates` | [IGeoRate](../interfaces/_types_.igeorate.md)[] | [] |
`shippingRates` | [IGeoRate](../interfaces/_types_.igeorate.md)[] | [] |
`cartAPI` | [ICartAPI](../interfaces/_types_.icartapi.md) | - |

**Returns:** *[Order](_order_.order.md)‹›*

___

### `Static` save

▸ **save**(`order`: [Order](_order_.order.md)): *void*

*Defined in [Order.ts:180](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/Order.ts#L180)*

**Parameters:**

Name | Type |
------ | ------ |
`order` | [Order](_order_.order.md) |

**Returns:** *void*
