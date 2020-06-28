[commerce.js](../README.md) › [Globals](../globals.md) › ["utils"](_utils_.md)

# Module: "utils"

## Index

### Variables

* [printLevel](_utils_.md#let-printlevel)

### Functions

* [clean](_utils_.md#const-clean)
* [closestGeoRate](_utils_.md#const-closestgeorate)
* [log](_utils_.md#const-log)
* [matchesGeoRate](_utils_.md#const-matchesgeorate)
* [setLogLevel](_utils_.md#const-setloglevel)

## Variables

### `Let` printLevel

• **printLevel**: *string* = "none"

*Defined in [utils.ts:5](https://github.com/shopjs/commerce.js/blob/98f86b0/src/utils.ts#L5)*

## Functions

### `Const` clean

▸ **clean**(`str`: any): *any*

*Defined in [utils.ts:20](https://github.com/shopjs/commerce.js/blob/98f86b0/src/utils.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | any |

**Returns:** *any*

___

### `Const` closestGeoRate

▸ **closestGeoRate**(`grs`: [IGeoRate](../interfaces/_types_.igeorate.md)[], `ctr`: string, `st`: string, `ct`: string, `pc`: string): *[[IGeoRate](../interfaces/_types_.igeorate.md) | undefined, number, number]*

*Defined in [utils.ts:111](https://github.com/shopjs/commerce.js/blob/98f86b0/src/utils.ts#L111)*

Get the closest georate from a set of georates

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`grs` | [IGeoRate](../interfaces/_types_.igeorate.md)[] | list of GeoRates |
`ctr` | string | country |
`st` | string | state |
`ct` | string | city |
`pc` | string | postalCode |

**Returns:** *[[IGeoRate](../interfaces/_types_.igeorate.md) | undefined, number, number]*

closest georate, level of match, and index

___

### `Const` log

▸ **log**(...`args`: any[]): *void*

*Defined in [utils.ts:11](https://github.com/shopjs/commerce.js/blob/98f86b0/src/utils.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*

___

### `Const` matchesGeoRate

▸ **matchesGeoRate**(`g`: [IGeoRate](../interfaces/_types_.igeorate.md), `country`: string, `state`: string, `city`: string, `postalCode`: string): *[boolean, number]*

*Defined in [utils.ts:35](https://github.com/shopjs/commerce.js/blob/98f86b0/src/utils.ts#L35)*

Check if georate matches country + state + city/postalCode
We assume that georates are built correctly (they are pulled from server)

**Parameters:**

Name | Type |
------ | ------ |
`g` | [IGeoRate](../interfaces/_types_.igeorate.md) |
`country` | string |
`state` | string |
`city` | string |
`postalCode` | string |

**Returns:** *[boolean, number]*

return if it is matched and level of match

___

### `Const` setLogLevel

▸ **setLogLevel**(`level`: string): *void*

*Defined in [utils.ts:7](https://github.com/shopjs/commerce.js/blob/98f86b0/src/utils.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`level` | string |

**Returns:** *void*
