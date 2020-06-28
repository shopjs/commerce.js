[commerce.js](../README.md) › [Globals](../globals.md) › ["types"](../modules/_types_.md) › [IOrderClient](_types_.iorderclient.md)

# Interface: IOrderClient

Cart representation

## Hierarchy

* [IProductClient](_types_.iproductclient.md)

  ↳ **IOrderClient**

  ↳ [IClient](_types_.iclient.md)

## Index

### Properties

* [client](_types_.iorderclient.md#client)
* [product](_types_.iorderclient.md#product)

## Properties

###  client

• **client**: *object*

*Inherited from [IProductClient](_types_.iproductclient.md).[client](_types_.iproductclient.md#client)*

*Defined in [types.ts:191](https://github.com/shopjs/commerce.js/blob/bdc45b5/src/types.ts#L191)*

#### Type declaration:

* **getKey**(): *function*

  * (): *string*

* **url**(): *function*

  * (`path`: string): *string*

___

###  product

• **product**: *object*

*Inherited from [IProductClient](_types_.iproductclient.md).[product](_types_.iproductclient.md#product)*

*Defined in [types.ts:188](https://github.com/shopjs/commerce.js/blob/bdc45b5/src/types.ts#L188)*

#### Type declaration:

* **get**(): *function*

  * (`id`: string): *Promise‹[IProduct](_types_.iproduct.md)›*
