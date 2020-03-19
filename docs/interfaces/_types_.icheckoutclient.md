[commerce.js](../README.md) › [Globals](../globals.md) › ["types"](../modules/_types_.md) › [ICheckoutClient](_types_.icheckoutclient.md)

# Interface: ICheckoutClient

Checkout Client

## Hierarchy

* **ICheckoutClient**

  ↳ [IClient](_types_.iclient.md)

## Index

### Properties

* [checkout](_types_.icheckoutclient.md#checkout)

## Properties

###  checkout

• **checkout**: *object*

*Defined in [types.ts:151](https://github.com/shopjs/commerce.js/blob/bcd2ce3/src/types.ts#L151)*

#### Type declaration:

* **authorize**(`opts`: [IAuthorizeConfig](_types_.iauthorizeconfig.md)): *Promise‹[IOrder](_types_.iorder.md) | undefined›*

* **capture**(`id`: string): *Promise‹[IOrder](_types_.iorder.md) | undefined›*
