if !Array::filter
  Array::filter = (func, thisArg) ->
    'use strict'
    if !((typeof func == 'Function' or typeof func == 'function') and this)
      throw new TypeError
    len = @length >>> 0
    res = new Array(len)
    t = this
    c = 0
    i = -1
    if thisArg == undefined
      while ++i != len
        # checks to see if the key was set
        if i of this
          if func(t[i], i, t)
            res[c++] = t[i]
    else
      while ++i != len
        # checks to see if the key was set
        if i of this
          if func.call(thisArg, t[i], i, t)
            res[c++] = t[i]
    res.length = c
    # shrink down array to proper size
    res
