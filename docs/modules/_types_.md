[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["types"](_types_.md)

# External module: "types"

## Index

### Interfaces

* [IDocument](../interfaces/_types_.idocument.md)
* [IDocumentRef](../interfaces/_types_.idocumentref.md)
* [IInteraction](../interfaces/_types_.iinteraction.md)
* [IStore](../interfaces/_types_.istore.md)
* [IStoreCollection](../interfaces/_types_.istorecollection.md)
* [IStoreQuery](../interfaces/_types_.istorequery.md)
* [IStoreResult](../interfaces/_types_.istoreresult.md)
* [IStorer](../interfaces/_types_.istorer.md)

### Type aliases

* [MaybeDate](_types_.md#maybedate)
* [MaybeString](_types_.md#maybestring)
* [OrderByDirection](_types_.md#orderbydirection)
* [Ref](_types_.md#ref)

### Variables

* [SYSTEM_REF](_types_.md#const-system_ref)

## Type aliases

###  MaybeDate

Ƭ **MaybeDate**: *Date | undefined | null*

*Defined in [types.ts:153](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L153)*

A date or undefined or null

___

###  MaybeString

Ƭ **MaybeString**: *string | undefined | null*

*Defined in [types.ts:158](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L158)*

A string or undefined or null

___

###  OrderByDirection

Ƭ **OrderByDirection**: *"desc" | "asc"*

*Defined in [types.ts:7](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L7)*

___

###  Ref

Ƭ **Ref**: *[IDocumentRef](../interfaces/_types_.idocumentref.md) | FsDocRef | string*

*Defined in [types.ts:12](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L12)*

A union type representing all the possible Refs supported by DStorer

## Variables

### `Const` SYSTEM_REF

• **SYSTEM_REF**: *string* = "system"

*Defined in [types.ts:6](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/types.ts#L6)*

Default value for a Ref
