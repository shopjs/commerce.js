[commerce.js](../README.md) › [Globals](../globals.md) › ["Product"](../modules/_product_.md) › [Product](_product_.product.md)

# Class: Product

Product is something that goes in a cart, we sync these from the server but
only keep the fields we care about

## Hierarchy

* **Product**

  ↳ [LineItem](_lineitem_.lineitem.md)

## Implements

* [IProduct](../interfaces/_types_.iproduct.md)

## Index

### Constructors

* [constructor](_product_.product.md#constructor)

### Properties

* [bootstrapPromise](_product_.product.md#bootstrappromise)
* [client](_product_.product.md#client)
* [description](_product_.product.md#description)
* [id](_product_.product.md#id)
* [listPrice](_product_.product.md#listprice)
* [name](_product_.product.md#name)
* [price](_product_.product.md#price)
* [productId](_product_.product.md#productid)
* [productName](_product_.product.md#productname)
* [productSlug](_product_.product.md#productslug)
* [slug](_product_.product.md#slug)

## Constructors

###  constructor

\+ **new Product**(`raw`: any, `client`: [IProductClient](../interfaces/_types_.iproductclient.md)): *[Product](_product_.product.md)*

*Defined in [Product.ts:50](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Product.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`raw` | any |
`client` | [IProductClient](../interfaces/_types_.iproductclient.md) |

**Returns:** *[Product](_product_.product.md)*

## Properties

###  bootstrapPromise

• **bootstrapPromise**: *Promise‹[IProduct](../interfaces/_types_.iproduct.md) | void›*

*Defined in [Product.ts:47](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Product.ts#L47)*

___

###  client

• **client**: *[IProductClient](../interfaces/_types_.iproductclient.md)*

*Defined in [Product.ts:50](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Product.ts#L50)*

___

###  description

• **description**: *string*

*Implementation of [IProduct](../interfaces/_types_.iproduct.md).[description](../interfaces/_types_.iproduct.md#description)*

*Defined in [Product.ts:44](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Product.ts#L44)*

___

###  id

• **id**: *string*

*Implementation of [IProduct](../interfaces/_types_.iproduct.md).[id](../interfaces/_types_.iproduct.md#id)*

*Defined in [Product.ts:20](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Product.ts#L20)*

___

###  listPrice

• **listPrice**: *number*

*Implementation of [IProduct](../interfaces/_types_.iproduct.md).[listPrice](../interfaces/_types_.iproduct.md#listprice)*

*Defined in [Product.ts:41](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Product.ts#L41)*

___

###  name

• **name**: *string*

*Implementation of [IProduct](../interfaces/_types_.iproduct.md).[name](../interfaces/_types_.iproduct.md#name)*

*Defined in [Product.ts:32](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Product.ts#L32)*

___

###  price

• **price**: *number*

*Implementation of [IProduct](../interfaces/_types_.iproduct.md).[price](../interfaces/_types_.iproduct.md#price)*

*Defined in [Product.ts:38](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Product.ts#L38)*

___

###  productId

• **productId**: *string*

*Implementation of [IProduct](../interfaces/_types_.iproduct.md).[productId](../interfaces/_types_.iproduct.md#productid)*

*Defined in [Product.ts:23](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Product.ts#L23)*

___

###  productName

• **productName**: *string*

*Implementation of [IProduct](../interfaces/_types_.iproduct.md).[productName](../interfaces/_types_.iproduct.md#productname)*

*Defined in [Product.ts:35](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Product.ts#L35)*

___

###  productSlug

• **productSlug**: *string*

*Implementation of [IProduct](../interfaces/_types_.iproduct.md).[productSlug](../interfaces/_types_.iproduct.md#productslug)*

*Defined in [Product.ts:29](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Product.ts#L29)*

___

###  slug

• **slug**: *string*

*Implementation of [IProduct](../interfaces/_types_.iproduct.md).[slug](../interfaces/_types_.iproduct.md#slug)*

*Defined in [Product.ts:26](https://github.com/shopjs/commerce.js/blob/c24ab5c/src/Product.ts#L26)*
