// Libraries
import qs from 'qs'
import axios from 'axios'

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
    return this.getRequest(formattedEndpoint, options)
  }

  post (endpoint, body = {}, options = {}) {
    options['body'] = body
    return this.postRequest(endpoint, options)
  }

  async getRequest (endpoint, options = {}) {
    const url = `${this.host}${endpoint}`
    const body = JSON.stringify(options.body)
    const response = await axios.get(url, { body: body })
      // .catch((error) => {
      //   console.log('API CLIENT: Error while fetching data')
      //   return error
      // })
    return { status: response.status, data: response.data }
  }

  async postRequest (endpoint, options = {}) {
    const url = `${this.host}${endpoint}`
    const body = JSON.stringify(options.body)
    let response = ''
    await axios.post(url, { body: body })
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
