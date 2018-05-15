const compare = (arr1, arr2) => {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    // a man's array does not look like a girl's array
    if (arr1.length !== arr2.length) return false
  }

  const keys = Object.keys(arr1)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (Array.isArray(arr1[key])) {
      if (Array.isArray(arr2[key])) {
        // a man has an array, a girl has a different array
        if (!compare(arr1[key], arr2[key])) return false
        // a man may share an array with a girl
        continue
      }
      // a man has an array, a girl does not
      return false
    }

    if (typeof arr1[key] === 'object') {
      if (typeof arr2[key] === 'object') {
        // a man has an object, a girl has a different object
        if (!compare(arr1[key], arr2[key])) return false
        continue
      }
      // a man has an object, a girl does not
      return false
    }
    // a man has values that a girl does not share
    if (arr1[key] !== arr2[key]) return false
  }

  return true
}

const mapify = (arr1, retObject = {}, currKey = '') => {
  const isObject = typeof arr1 === 'object'
  const isArray = Array.isArray(arr1)
  const keys = Object.keys(arr1)

  keys.forEach(key => {
    if (Array.isArray(arr1[key]) || typeof arr1[key] === 'object') {
      if (isArray) {
        return mapify(arr1[key], retObject, `${currKey}[_]`)
      } else if (isObject) {
        return mapify(arr1[key], retObject, `${currKey}.${key}`)
      }
    } else {
      if (isArray) {
        if (retObject[`${currKey}[_]`]) retObject[`${currKey}[_]`].push(arr1[key])
        else retObject[`${currKey}[_]`] = [arr1[key]]
      } else if (isObject) {
        if (retObject[`${currKey}.${key}`]) retObject[`${currKey}.${key}`].push(arr1[key])
        else retObject[`${currKey}.${key}`] = [arr1[key]]
      }
    }
  })
  return retObject
}

const compareUnsorted = (arr1, arr2) => {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    // a man's array does not look like a girl's array
    if (arr1.length !== arr2.length) return false
  }

  const map1 = mapify(arr1)
  const map2 = mapify(arr2)

  const keys = Object.keys(map1)
  for (let i = 0; i < keys.length; i++) {  
    const key = keys[i]
    // girl does not have property of man
    if (!map2[key]) return false
    
    for (let j = 0; j < map1[key].length; j++) {
      const map1Value = map1[key][j]
      // a man has values that a girl does not share
      if (!map2[key].includes(map1Value)) return false
    }
  }

  return true
}

module.exports = {
  compareUnsorted,
  compare
}