// Libraries
import qs from 'qs'
import fetch from 'isomorphic-fetch'

class ApiClient {
  constructor (options = {}) {
    // if there is any external host (other than shift apps) we explicitly want to set,
    // then it needs to be passed to this class. If not, then the call will be handled
    // by express server with the host set to express host
    this.host = options.host || process.env.LOCAL_API_HOST
  }

  read (endpoint, queryObject = {}, options = {}) {
    options['method'] = 'GET'
    const formattedEndpoint = this.encodeParams(endpoint, queryObject)
    return this.sendRequest(formattedEndpoint, options)
  }

  post (endpoint, body = {}, options = {}) {
    options['method'] = 'POST'
    options['body'] = body
    return this.sendRequest(endpoint, options)
  }

  async sendRequest (endpoint, options = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    }
    const url = `${this.host}${endpoint}`
    const headers = options.headers || defaultHeaders
    const method = options.method || 'GET'
    const body = JSON.stringify(options.body)
    const response = await fetch(url, { headers: headers, method: method, body: body })
    const data = await response.json()
    return { status: response.status, data }
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
