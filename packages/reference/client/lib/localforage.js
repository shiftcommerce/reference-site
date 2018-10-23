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

    /* eslint-disable */
    // This block has purely been added to stop
    // unhandled promises occuring in the test suite
    localforage.ready().then(() => {
      // This code runs once localforage
      // has fully initialized the selected driver.
    }).catch((error) => {
      // "No available storage method found."
      // One of the cases that `ready()` rejects,
      // is when no usable storage driver is found
      // Ensure we catch this error, but still log out other errors.
      if (error.message !== 'No available storage method found.') {
        console.log(error)
      }
    })
    /* eslint-enable */
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
