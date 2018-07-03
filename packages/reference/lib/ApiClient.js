// Libraries
import qs from 'qs'
import axios from 'axios'

class ApiClient {
  constructor (options = {}) {
    // if there is any external host (other than shift apps) we explicitly want to set,
    // then it needs to be passed to this class. If not, then the call will be handled
    // by express server with the host set to express host

    this.client = axios.create({
      baseURL: process.env.API_HOST_PROXY,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    })
  }

  read (endpoint, queryObject = {}, options = {}) {
    options['method'] = 'GET'
    const formattedEndpoint = this.encodeParams(endpoint, queryObject)
    return this.getRequest(formattedEndpoint, options)
  }

  post (endpoint, body = {}, options = {}) {
    options['body'] = body
    return this.postRequest(endpoint, options)
  }

  async getRequest (endpoint, options = {}) {
    const body = JSON.stringify(options.body)
    const response = await this.client.get(endpoint, { body: body })
     .catch((error) => {
       console.log('API CLIENT: Error while fetching data', error)
       return error
     })

    return { status: response.status, data: response.data }
  }

  async postRequest (endpoint, options = {}) {
    const body = JSON.stringify(options.body)
    let response = ''
    await this.client.post(endpoint, { body: body })
      .then((res) => {
        response = res
      })
      .catch((error) => {
        console.log('Error while posting data')
        response = error
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
