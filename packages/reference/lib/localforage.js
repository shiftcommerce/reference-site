import localforage from 'localforage'

class LocalForage {
  constructor () {
    this.initLocalForage()
  }

  // Set the driver to indexedDB
  // TODO: Fix '.default.config(...).then is not a function' error here?
  initLocalForage () {
    localforage.config({
      driver: localforage.INDEXEDDB,
      name: 'CART'
    }).then(() => localforage.ready())
  }

  // Set the key and value in the indexedDB
  setValue (key, value) {
    localforage.setItem(key, value).then((value) => {
      console.log(value)
    }).catch((err) => {
      console.log('Error in setting key value:', err)
    })
  }

  // Get the value from the indexedDB
  async getValue (key, callback) {
    let keyValue = await localforage.getItem(key).then((value) => {
      return value
    }).catch((err) => {
      console.log('Error in retrieving the key:', err)
    })
    return keyValue
  }
}
export default LocalForage
