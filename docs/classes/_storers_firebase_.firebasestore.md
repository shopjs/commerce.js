[@ecomv3/document](../README.md) › [Globals](../globals.md) › ["Storers/Firebase"](../modules/_storers_firebase_.md) › [FirebaseStore](_storers_firebase_.firebasestore.md)

# Class: FirebaseStore

## Hierarchy

* **FirebaseStore**

## Implements

* [IStore](../interfaces/_types_.istore.md)

## Index

### Constructors

* [constructor](_storers_firebase_.firebasestore.md#constructor)

### Properties

* [fs](_storers_firebase_.firebasestore.md#fs)
* [namespace](_storers_firebase_.firebasestore.md#namespace)

### Methods

* [batch](_storers_firebase_.firebasestore.md#batch)
* [from](_storers_firebase_.firebasestore.md#from)
* [transaction](_storers_firebase_.firebasestore.md#transaction)

## Constructors

###  constructor

\+ **new FirebaseStore**(`fs`: Firestore, `namespace`: string): *[FirebaseStore](_storers_firebase_.firebasestore.md)*

*Defined in [Storers/Firebase.ts:40](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`fs` | Firestore |
`namespace` | string |

**Returns:** *[FirebaseStore](_storers_firebase_.firebasestore.md)*

## Properties

###  fs

• **fs**: *Firestore*

*Defined in [Storers/Firebase.ts:39](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L39)*

___

###  namespace

• **namespace**: *string*

*Implementation of [IStore](../interfaces/_types_.istore.md).[namespace](../interfaces/_types_.istore.md#namespace)*

*Defined in [Storers/Firebase.ts:40](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L40)*

## Methods

###  batch

▸ **batch**(): *any*

*Implementation of [IStore](../interfaces/_types_.istore.md)*

*Defined in [Storers/Firebase.ts:55](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L55)*

**Returns:** *any*

___

###  from

▸ **from**(`col`: string): *[IStoreCollection](../interfaces/_types_.istorecollection.md)*

*Defined in [Storers/Firebase.ts:47](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`col` | string |

**Returns:** *[IStoreCollection](../interfaces/_types_.istorecollection.md)*

___

###  transaction

▸ **transaction**(`fn`: function): *Promise‹any›*

*Defined in [Storers/Firebase.ts:51](https://github.com/davidtai/ecom3/blob/bf442b9/packages/document/src/Storers/Firebase.ts#L51)*

**Parameters:**

▪ **fn**: *function*

▸ (`transaction`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | any |

**Returns:** *Promise‹any›*
