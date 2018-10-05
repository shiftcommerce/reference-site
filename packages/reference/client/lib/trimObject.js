// Takes in an object and removes all null values and empty objects
export default function trimObject (object) {
  let obj = {}

  // duplicate object to not affect the original
  if (Array.isArray(object)) {
    obj = Array.from(object)
  } else {
    obj = Object.assign({}, object)
  }

  Object.keys(obj).forEach(function (key) {
    if (obj[key] && typeof obj[key] === 'object') {
      obj[key] = trimObject(obj[key])
    } else if (obj[key] === null || obj[key] === '') {
      delete obj[key]
    }

    if (obj[key] && typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0) delete obj[key]
  })

  return obj
}
