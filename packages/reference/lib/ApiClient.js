// Libraries
import qs from 'qs'
import axios from 'axios'

class ApiClient {
  constructor (options = {}) {
    this.client = axios.create({
      baseURL: process.env.API_HOST_PROXY
    })
  }

  async read (endpoint, queryObject = {}, options = {}) {
    const formattedEndpoint = this.encodeParams(endpoint, queryObject)
    const response = await this.client.get(formattedEndpoint)
      .catch((error) => {
        console.log('API CLIENT: Error while fetching data', error)
        return error
      })

    return { status: response.status, data: response.data }
  }

  async post (endpoint, body = {}, options = {}) {
    const response = await this.client.post(endpoint, body)
      .catch((error) => {
        console.log('Error while posting data', error)
        return error
      })
    return { status: response.status, data: response }
  }

  encodeParams (endpoint, queryObject = {}) {
    if (Object.keys(queryObject).length > 0) {
      const query = qs.stringify(queryObject)
      endpoint = `${endpoint}?${query}`
    }
    return endpoint
  }
}

export default ApiClient
