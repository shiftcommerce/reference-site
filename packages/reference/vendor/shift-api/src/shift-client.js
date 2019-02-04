const HTTPClient = require('./http-client')
const ApiParser = require('../lib/json-api-parser')

class SHIFTClient {
  config (config) {
    // TODO: implement when we allow people to define a config for http client
  }

  getMenusV1 (query) {
    const url = 'v1/menus'
    const response = HTTPClient.get(url, query)

    return response
      .then(response => {
        const parsedPayload = new ApiParser().parse(response.data)
        return {
          status: response.status,
          data: parsedPayload.data[0]
        }
      })
  }
}

module.exports = new SHIFTClient()
