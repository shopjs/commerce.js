[@hanzo/commercejs](../README.md) › [Globals](../globals.md) › ["types"](../modules/_types_.md) › [ICartClient](_types_.icartclient.md)

# Interface: ICartClient

Cart Client

## Hierarchy

* **ICartClient**

  ↳ [IClient](_types_.iclient.md)

## Index

### Properties

* [cart](_types_.icartclient.md#cart)

## Properties

###  cart

• **cart**: *object*

*Defined in [types.ts:155](https://github.com/shopjs/commerce.js/blob/180f42a/src/types.ts#L155)*

#### Type declaration:

* **create**(): *function*

  * (): *Promise‹[ICart](_types_.icart.md)›*

* **set**(): *function*

  * (`cartItem`: [ICartItem](_types_.icartitem.md)): *Promise‹[ICart](_types_.icart.md)›*

* **update**(): *function*

  * (`cart`: [ICart](_types_.icart.md)): *Promise‹[ICart](_types_.icart.md)›*
