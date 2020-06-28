[commerce.js](../README.md) › [Globals](../globals.md) › ["LineItem"](../modules/_lineitem_.md) › [LineItem](_lineitem_.lineitem.md)

# Class: LineItem

A combination of cart and quantity

## Hierarchy

* [Product](_product_.product.md)

  ↳ **LineItem**

## Implements

* [IProduct](../interfaces/_types_.iproduct.md)
* [ILineItem](../interfaces/_types_.ilineitem.md)

## Index

### Constructors

* [constructor](_lineitem_.lineitem.md#constructor)

### Properties

* [bootstrapPromise](_lineitem_.lineitem.md#bootstrappromise)
* [client](_lineitem_.lineitem.md#client)
* [description](_lineitem_.lineitem.md#description)
* [id](_lineitem_.lineitem.md#id)
* [ignore](_lineitem_.lineitem.md#ignore)
* [image](_lineitem_.lineitem.md#image)
* [imageURL](_lineitem_.lineitem.md#imageurl)
* [listPrice](_lineitem_.lineitem.md#listprice)
* [locked](_lineitem_.lineitem.md#locked)
* [name](_lineitem_.lineitem.md#name)
* [price](_lineitem_.lineitem.md#price)
* [productId](_lineitem_.lineitem.md#productid)
* [productName](_lineitem_.lineitem.md#productname)
* [productSlug](_lineitem_.lineitem.md#productslug)
* [quantity](_lineitem_.lineitem.md#quantity)
* [slug](_lineitem_.lineitem.md#slug)
* [storeId](_lineitem_.lineitem.md#storeid)

### Accessors

* [data](_lineitem_.lineitem.md#data)
* [total](_lineitem_.lineitem.md#total)

## Constructors

###  constructor

\+ **new LineItem**(`raw`: any, `client`: [IProductClient](../interfaces/_types_.iproductclient.md)): *[LineItem](_lineitem_.lineitem.md)*

*Overrides [Product](_product_.product.md).[constructor](_product_.product.md#constructor)*

*Defined in [LineItem.ts:24](https://github.com/shopjs/commerce.js/blob/e02bd83/src/LineItem.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`raw` | any |
`client` | [IProductClient](../interfaces/_types_.iproductclient.md) |

**Returns:** *[LineItem](_lineitem_.lineitem.md)*

## Properties

###  bootstrapPromise

• **bootstrapPromise**: *Promise‹[IProduct](../interfaces/_types_.iproduct.md) | void›*

*Inherited from [Product](_product_.product.md).[bootstrapPromise](_product_.product.md#bootstrappromise)*

*Defined in [Product.ts:47](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L47)*

___

###  client

• **client**: *[IProductClient](../interfaces/_types_.iproductclient.md)*

*Inherited from [Product](_product_.product.md).[client](_product_.product.md#client)*

*Defined in [Product.ts:50](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L50)*

___

###  description

• **description**: *string*

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[description](../interfaces/_types_.ilineitem.md#description)*

*Inherited from [Product](_product_.product.md).[description](_product_.product.md#description)*

*Defined in [Product.ts:44](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L44)*

___

###  id

• **id**: *string*

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[id](../interfaces/_types_.ilineitem.md#id)*

*Inherited from [Product](_product_.product.md).[id](_product_.product.md#id)*

*Defined in [Product.ts:20](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L20)*

___

###  ignore

• **ignore**: *boolean* = false

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[ignore](../interfaces/_types_.ilineitem.md#ignore)*

*Defined in [LineItem.ts:24](https://github.com/shopjs/commerce.js/blob/e02bd83/src/LineItem.ts#L24)*

___

###  image

• **image**: *object*

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[image](../interfaces/_types_.ilineitem.md#image)*

*Inherited from [Product](_product_.product.md).[image](_product_.product.md#image)*

*Defined in [Product.ts:56](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L56)*

#### Type declaration:

* **url**: *string*

___

###  imageURL

• **imageURL**: *string*

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[imageURL](../interfaces/_types_.ilineitem.md#imageurl)*

*Inherited from [Product](_product_.product.md).[imageURL](_product_.product.md#imageurl)*

*Defined in [Product.ts:53](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L53)*

___

###  listPrice

• **listPrice**: *number*

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[listPrice](../interfaces/_types_.ilineitem.md#listprice)*

*Inherited from [Product](_product_.product.md).[listPrice](_product_.product.md#listprice)*

*Defined in [Product.ts:41](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L41)*

___

###  locked

• **locked**: *boolean* = false

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[locked](../interfaces/_types_.ilineitem.md#locked)*

*Defined in [LineItem.ts:21](https://github.com/shopjs/commerce.js/blob/e02bd83/src/LineItem.ts#L21)*

___

###  name

• **name**: *string*

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[name](../interfaces/_types_.ilineitem.md#name)*

*Inherited from [Product](_product_.product.md).[name](_product_.product.md#name)*

*Defined in [Product.ts:32](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L32)*

___

###  price

• **price**: *number*

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[price](../interfaces/_types_.ilineitem.md#price)*

*Inherited from [Product](_product_.product.md).[price](_product_.product.md#price)*

*Defined in [Product.ts:38](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L38)*

___

###  productId

• **productId**: *string*

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[productId](../interfaces/_types_.ilineitem.md#productid)*

*Inherited from [Product](_product_.product.md).[productId](_product_.product.md#productid)*

*Defined in [Product.ts:23](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L23)*

___

###  productName

• **productName**: *string*

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[productName](../interfaces/_types_.ilineitem.md#productname)*

*Inherited from [Product](_product_.product.md).[productName](_product_.product.md#productname)*

*Defined in [Product.ts:35](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L35)*

___

###  productSlug

• **productSlug**: *string*

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[productSlug](../interfaces/_types_.ilineitem.md#productslug)*

*Inherited from [Product](_product_.product.md).[productSlug](_product_.product.md#productslug)*

*Defined in [Product.ts:29](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L29)*

___

###  quantity

• **quantity**: *number* = 1

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[quantity](../interfaces/_types_.ilineitem.md#quantity)*

*Defined in [LineItem.ts:18](https://github.com/shopjs/commerce.js/blob/e02bd83/src/LineItem.ts#L18)*

___

###  slug

• **slug**: *string*

*Implementation of [ILineItem](../interfaces/_types_.ilineitem.md).[slug](../interfaces/_types_.ilineitem.md#slug)*

*Inherited from [Product](_product_.product.md).[slug](_product_.product.md#slug)*

*Defined in [Product.ts:26](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L26)*

___

###  storeId

• **storeId**: *string*

*Inherited from [Product](_product_.product.md).[storeId](_product_.product.md#storeid)*

*Defined in [Product.ts:61](https://github.com/shopjs/commerce.js/blob/e02bd83/src/Product.ts#L61)*

## Accessors

###  data

• **get data**(): *[ILineItem](../interfaces/_types_.ilineitem.md)*

*Defined in [LineItem.ts:40](https://github.com/shopjs/commerce.js/blob/e02bd83/src/LineItem.ts#L40)*

**Returns:** *[ILineItem](../interfaces/_types_.ilineitem.md)*

___

###  total

• **get total**(): *number*

*Defined in [LineItem.ts:35](https://github.com/shopjs/commerce.js/blob/e02bd83/src/LineItem.ts#L35)*

**Returns:** *number*
