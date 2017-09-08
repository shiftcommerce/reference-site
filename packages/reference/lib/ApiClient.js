// Libraries
import qs from 'qs'
import fetch from 'isomorphic-fetch'

class ApiClient {
  constructor (options = {}) {
    this.host = options.host || process.env.API_HOST
    this.access_token = options.access_token || process.env.API_ACCESS_TOKEN
  }

  read (endpoint, queryObject = {}, options = {}) {
    options['method'] = 'GET'
    const formattedEndpoint = this.encodeParams(endpoint, queryObject)
    return this.sendRequest(formattedEndpoint, options)
  }

  post (endpoint, options = {}) {
    options['method'] = 'POST'
    return this.sendRequest(endpoint, options)
  }

  async sendRequest (endpoint, options = {}) {
    const url = this.host + endpoint
    const defaultHeaders = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${this.access_token}`
    }
    const headers = options.headers || defaultHeaders
    const method = options.method || 'GET'
    const body = JSON.stringify(options.body)
    const response = await fetch(url, { headers: headers, method: method, body: body })
    const data = await response.json()
    return { status: response.status, data }
  }

  encodeParams (endpoint, queryObject = {}) {
    if (Object.keys(queryObject).length > 0) {
      endpoint += '?' + qs.stringify(queryObject)
    }
    return endpoint
  }
}

export default ApiClient
