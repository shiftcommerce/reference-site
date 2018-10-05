import localforage from 'localforage'

class LocalForage {
  constructor () {
    if (typeof window !== 'undefined') {
      this.initLocalForage()
    }
  }

  // Set the driver to indexedDB
  initLocalForage () {
    localforage.config({
      driver: localforage.INDEXEDDB,
      name: 'CART'
    })
  }

  // Set the key and value in the indexedDB
  setValue (key, value) {
    localforage.setItem(key, value).then((value) => {
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
