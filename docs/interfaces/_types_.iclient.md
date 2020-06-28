[commerce.js](../README.md) › [Globals](../globals.md) › ["types"](../modules/_types_.md) › [IClient](_types_.iclient.md)

# Interface: IClient

## Hierarchy

* [ICartClient](_types_.icartclient.md)

  ↳ [IOrderClient](_types_.iorderclient.md)

* [IProductClient](_types_.iproductclient.md)

* [ICouponClient](_types_.icouponclient.md)

* [ICheckoutClient](_types_.icheckoutclient.md)

  ↳ **IClient**

## Index

### Properties

* [cart](_types_.iclient.md#cart)
* [checkout](_types_.iclient.md#checkout)
* [client](_types_.iclient.md#client)
* [coupon](_types_.iclient.md#coupon)
* [product](_types_.iclient.md#product)

## Properties

###  cart

• **cart**: *object*

*Inherited from [ICartClient](_types_.icartclient.md).[cart](_types_.icartclient.md#cart)*

*Defined in [types.ts:168](https://github.com/shopjs/commerce.js/blob/bdc45b5/src/types.ts#L168)*

#### Type declaration:

* **create**(): *function*

  * (): *Promise‹[ICart](_types_.icart.md)›*

* **set**(): *function*

  * (`cartItem`: [ICartItem](_types_.icartitem.md)): *Promise‹[ICart](_types_.icart.md)›*

* **update**(): *function*

  * (`cart`: [ICart](_types_.icart.md)): *Promise‹[ICart](_types_.icart.md)›*

___

###  checkout

• **checkout**: *object*

*Inherited from [ICheckoutClient](_types_.icheckoutclient.md).[checkout](_types_.icheckoutclient.md#checkout)*

*Defined in [types.ts:158](https://github.com/shopjs/commerce.js/blob/bdc45b5/src/types.ts#L158)*

#### Type declaration:

* **authorize**(`opts`: [IAuthorizeConfig](_types_.iauthorizeconfig.md)): *Promise‹[IOrder](_types_.iorder.md) | undefined›*

* **capture**(`id`: string): *Promise‹[IOrder](_types_.iorder.md) | undefined›*

___

###  client

• **client**: *object*

*Inherited from [IProductClient](_types_.iproductclient.md).[client](_types_.iproductclient.md#client)*

*Overrides [IProductClient](_types_.iproductclient.md).[client](_types_.iproductclient.md#client)*

*Defined in [types.ts:191](https://github.com/shopjs/commerce.js/blob/bdc45b5/src/types.ts#L191)*

#### Type declaration:

* **getKey**(): *function*

  * (): *string*

* **url**(): *function*

  * (`path`: string): *string*

___

###  coupon

• **coupon**: *object*

*Inherited from [ICouponClient](_types_.icouponclient.md).[coupon](_types_.icouponclient.md#coupon)*

*Defined in [types.ts:179](https://github.com/shopjs/commerce.js/blob/bdc45b5/src/types.ts#L179)*

#### Type declaration:

* **get**(): *function*

  * (`code`: string): *Promise‹[ICoupon](_types_.icoupon.md)›*

___

###  product

• **product**: *object*

*Inherited from [IProductClient](_types_.iproductclient.md).[product](_types_.iproductclient.md#product)*

*Overrides [IProductClient](_types_.iproductclient.md).[product](_types_.iproductclient.md#product)*

*Defined in [types.ts:188](https://github.com/shopjs/commerce.js/blob/bdc45b5/src/types.ts#L188)*

#### Type declaration:

* **get**(): *function*

  * (`id`: string): *Promise‹[IProduct](_types_.iproduct.md)›*
