[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["Storers/Firebase"](../modules/_storers_firebase_.md) › [FirebaseStorer](_storers_firebase_.firebasestorer.md)

# Class: FirebaseStorer

Storer for Firebase

## Hierarchy

* **FirebaseStorer**

## Implements

* [IStorer](../interfaces/_types_.istorer.md)

## Index

### Constructors

* [constructor](_storers_firebase_.firebasestorer.md#constructor)

### Properties

* [fs](_storers_firebase_.firebasestorer.md#fs)

### Methods

* [getStore](_storers_firebase_.firebasestorer.md#getstore)

## Constructors

###  constructor

\+ **new FirebaseStorer**(`arg`: any): *[FirebaseStorer](_storers_firebase_.firebasestorer.md)*

*Defined in [Storers/Firebase.ts:26](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`arg` | any |

**Returns:** *[FirebaseStorer](_storers_firebase_.firebasestorer.md)*

## Properties

###  fs

• **fs**: *Firestore*

*Defined in [Storers/Firebase.ts:26](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L26)*

## Methods

###  getStore

▸ **getStore**(`env`: string, `namespace`: string): *[FirebaseStore](_storers_firebase_.firebasestore.md)*

*Implementation of [IStorer](../interfaces/_types_.istorer.md)*

*Defined in [Storers/Firebase.ts:32](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`env` | string |
`namespace` | string |

**Returns:** *[FirebaseStore](_storers_firebase_.firebasestore.md)*
