# These functions need to be synced with the backend

# Input sanitization for georate compared
export clean = (str = '')->
  return str.toUpperCase().replace(/\s/g, '')

# Check if georate matches country + state + city/postalCode
# We assume that georates are built correctly (they are pulled from server)
#
# return if it is matched and level of match
export matchesGeoRate = (g, country, state, city, postalCode) ->
  ctr   = clean(country)
  st    = clean(state)
  ct    = clean(city)
  pc    = clean(postalCode)

  # Invalid input
  if !ctr || !st || (!ct && !pc)
    return [false, 0]

  # Country is Wild Card
  if !g.country
    return [true, 0]

  if g.country == ctr
    # "Country Match"
    if !g.state
      return [true, 1]

    if g.state == st
      # State Match
      if !g.city && !g.postalCodes
        return [true, 2]

      # City Match
      if g.city && g.city == ct
        return [true, 3]

      if g.postalCodes
        codes = g.postalCodes.split ','
        for code in codes
          # Postal Code Match
          if code == pc
            return [true, 3]

      # City/Postal Code Mismatch
      return [false, 2]

    # State Mismatch
    return [false, 1]

  # No Match
  return [false, 0]

# Get the closest georate from a set of georates
#
# return closest georate, level of match, and index
export closestGeoRate = (grs, ctr, st, ct, pc) ->
  retGr = null
  currentLevel = -1
  idx = -1

  for i of grs
    gr = grs[i]

    [isMatch, level] = matchesGeoRate gr, ctr, st, ct, pc

    if isMatch && level > currentLevel
      if level == 3
        return [gr, level, parseInt(i, 10)]

      retGr = grs[i]
      currentLevel = level
      idx = i

  return [retGr, currentLevel, parseInt(idx, 10)]

