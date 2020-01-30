[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["Interaction"](../modules/_interaction_.md) › [Interaction](_interaction_.interaction.md)

# Class: Interaction

Interaction object, stores time and ID of the interactor

## Hierarchy

* **Interaction**

## Implements

* [IInteraction](../interfaces/_types_.iinteraction.md)

## Index

### Constructors

* [constructor](_interaction_.interaction.md#constructor)

### Properties

* [interactedAt](_interaction_.interaction.md#interactedat)
* [interactorRef](_interaction_.interaction.md#interactorref)

## Constructors

###  constructor

\+ **new Interaction**(`ref`: [Ref](../modules/_types_.md#ref), `refAt`: [MaybeDate](../modules/_types_.md#maybedate)): *[Interaction](_interaction_.interaction.md)*

*Defined in [Interaction.ts:19](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Interaction.ts#L19)*

Build an Interaction with a ref and a date

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`ref` | [Ref](../modules/_types_.md#ref) |  SYSTEM_REF | a reference to what is driving the interaction |
`refAt` | [MaybeDate](../modules/_types_.md#maybedate) |  new Date() | the timestamp for at which the interaction happened  |

**Returns:** *[Interaction](_interaction_.interaction.md)*

## Properties

###  interactedAt

• **interactedAt**: *[MaybeDate](../modules/_types_.md#maybedate)*

*Implementation of [IInteraction](../interfaces/_types_.iinteraction.md).[interactedAt](../interfaces/_types_.iinteraction.md#interactedat)*

*Defined in [Interaction.ts:19](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Interaction.ts#L19)*

Datetime of interaction

___

###  interactorRef

• **interactorRef**: *[Ref](../modules/_types_.md#ref)*

*Implementation of [IInteraction](../interfaces/_types_.iinteraction.md).[interactorRef](../interfaces/_types_.iinteraction.md#interactorref)*

*Defined in [Interaction.ts:13](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Interaction.ts#L13)*

Reference to what triggered the interaction
