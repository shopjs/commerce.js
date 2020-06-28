[commerce.js](../README.md) › [Globals](../globals.md) › ["types"](../modules/_types_.md) › [IProductClient](_types_.iproductclient.md)

# Interface: IProductClient

Product Client

## Hierarchy

* **IProductClient**

  ↳ [IOrderClient](_types_.iorderclient.md)

  ↳ [IClient](_types_.iclient.md)

## Index

### Properties

* [client](_types_.iproductclient.md#client)
* [product](_types_.iproductclient.md#product)

## Properties

###  client

• **client**: *object*

*Defined in [types.ts:191](https://github.com/shopjs/commerce.js/blob/bdc45b5/src/types.ts#L191)*

#### Type declaration:

* **getKey**(): *function*

  * (): *string*

* **url**(): *function*

  * (`path`: string): *string*

___

###  product

• **product**: *object*

*Defined in [types.ts:188](https://github.com/shopjs/commerce.js/blob/bdc45b5/src/types.ts#L188)*

#### Type declaration:

* **get**(): *function*

  * (`id`: string): *Promise‹[IProduct](_types_.iproduct.md)›*
