import { IGeoRate } from './types'

/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// These functions need to be synced with the backend

// Input sanitization for georate compared
export const clean = function(str){
  if (str == null) { str = '' }
  return str.toUpperCase().replace(/\s/g, '')
}

/**
 * Check if georate matches country + state + city/postalCode
 * We assume that georates are built correctly (they are pulled from server)
 * @param grs list of GeoRates
 * @param ctr country
 * @param st state
 * @param ct city
 * @param pc postalCode
 * @return return if it is matched and level of match
 */

export const matchesGeoRate = (
  g: IGeoRate,
  country: string,
  state: string,
  city: string,
  postalCode: string
): [boolean, number] => {
  const ctr   = clean(country)
  const st    = clean(state)
  const ct    = clean(city)
  const pc    = clean(postalCode)

  // Invalid input
  if (!ctr || !st || (!ct && !pc)) {
    return [false, 0]
  }

  // Country is Wild Card
  if (!g.country) {
    return [true, 0]
  }

  if (g.country === ctr) {
    // "Country Match"
    if (!g.state) {
      return [true, 1]
    }

    if (g.state === st) {
      // State Match
      if (!g.city && !g.postalCodes) {
        return [true, 2]
      }

      // City Match
      if (g.city && (g.city === ct)) {
        return [true, 3]
      }

      if (g.postalCodes) {
        const codes = g.postalCodes.split(',')
        for (let code of Array.from(codes)) {
          // Postal Code Match
          if (code === pc) {
            return [true, 3]
          }
        }
      }

      // City/Postal Code Mismatch
      return [false, 2]
    }

    // State Mismatch
    return [false, 1]
  }

  // No Match
  return [false, 0]
}

/**
 * Get the closest georate from a set of georates
 * @param grs list of GeoRates
 * @param ctr country
 * @param st state
 * @param ct city
 * @param pc postalCode
 * @return closest georate, level of match, and index
 */
export const closestGeoRate = (
  grs: IGeoRate[],
  ctr: string,
  st: string,
  ct: string,
  pc: string,
): [IGeoRate | undefined, number, number] => {
  let retGr: IGeoRate | undefined
  let currentLevel = -1
  let idx = -1

  for (let i in grs) {
    const gr = grs[i]

    const [isMatch, level] = matchesGeoRate(gr, ctr, st, ct, pc)

    if (isMatch && (level > currentLevel)) {
      if (level === 3) {
        return [gr, level, parseInt(i, 10)]
      }

      retGr = grs[i]
      currentLevel = level
      idx = parseInt(i, 10)
    }
  }

  return [retGr, currentLevel, idx]
}
