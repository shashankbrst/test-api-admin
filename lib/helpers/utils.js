const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

const getBaseUrl = req => {
  return req.protocol + '://' + req.get('host') + '/'
}

/**
 * A function that splits a string `limit` times and adds the remainder as a final array index.
 * > var a = 'convoluted.madeup.example';
 * > a.split('.', 1);
 * < ['convoluted']
 * // What I expected:
 * < ['convoluted', 'madeup.example']
 */
const split = (str, separator, limit) => {
  str = str.split(separator)

  if (str.length > limit) {
    var ret = str.splice(0, limit)
    ret.push(str.join(separator))

    return ret
  }

  return str
}

const isValid = param => {
  let flag = true
  if (param === undefined || param === null || param.length === 0) {
    flag = false
  }
  return flag
}

export { getRandomInt, getBaseUrl, split, isValid }
