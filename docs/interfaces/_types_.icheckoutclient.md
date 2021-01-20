[@hanzo/commerce.js](../README.md) › [Globals](../globals.md) › ["types"](../modules/_types_.md) › [ICheckoutClient](_types_.icheckoutclient.md)

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

*Defined in [types.ts:158](https://github.com/hanzoai/commerce.js/blob/80c8ee8/src/types.ts#L158)*

#### Type declaration:

* **authorize**(`opts`: [IAuthorizeConfig](_types_.iauthorizeconfig.md)): *Promise‹[IOrder](_types_.iorder.md) | undefined›*

* **capture**(`id`: string): *Promise‹[IOrder](_types_.iorder.md) | undefined›*
