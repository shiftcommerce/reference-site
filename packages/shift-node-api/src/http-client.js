const qs = require('qs')
const axios = require('axios')

const shiftApiConfig = require('./lib/config')
const { setCacheHeaders } = require('./lib/set-cache-headers')
const { generateTimeBasedToken } = require('./lib/time-based-token')

const defaultHeaders = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json'
}

class HTTPClient {
  get (url, queryObject, headers = {}) {
    const query = qs.stringify(queryObject)
    const requestUrl = this.createRequestUrl(url, query)

    let omsHmacRequest = null
    let omsHmacToken = null

    if (url.includes(shiftApiConfig.get().omsHost)) {
      omsHmacRequest = true
      omsHmacToken = generateTimeBasedToken(shiftApiConfig.get().servicesSharedSecret)
    }

    const logger = shiftApiConfig.get().logger
    logger && logger.debug(`GET ${requestUrl}`)

    const response = axios({
      method: 'get',
      url: requestUrl,
      headers: { ...defaultHeaders, ...headers },
      auth: {
        username: shiftApiConfig.get().apiTenant,
        password: omsHmacRequest ? omsHmacToken : shiftApiConfig.get().apiAccessToken
      }
    })

    return this.determineResponse(response)
  }

  post (url, body, headers = {}) {
    const requestUrl = this.createRequestUrl(url)

    const logger = shiftApiConfig.get().logger
    logger && logger.debug({ msg: `POST ${requestUrl}`, body })

    const response = axios({
      method: 'post',
      url: requestUrl,
      headers: { ...defaultHeaders, ...headers },
      auth: {
        username: shiftApiConfig.get().apiTenant,
        password: shiftApiConfig.get().apiAccessToken
      },
      data: body
    })

    return this.determineResponse(response)
  }

  patch (url, body, headers = {}) {
    const requestUrl = this.createRequestUrl(url)

    const logger = shiftApiConfig.get().logger
    logger && logger.debug({ msg: `PATCH ${requestUrl}`, body })

    const response = axios({
      method: 'patch',
      url: requestUrl,
      headers: { ...defaultHeaders, ...headers },
      auth: {
        username: shiftApiConfig.get().apiTenant,
        password: shiftApiConfig.get().apiAccessToken
      },
      data: body
    })

    return this.determineResponse(response)
  }

  delete (url, headers = {}) {
    const requestUrl = this.createRequestUrl(url)

    const logger = shiftApiConfig.get().logger
    logger && logger.debug(`DELETE ${requestUrl}`)

    const response = axios({
      method: 'delete',
      url: requestUrl,
      headers: { ...defaultHeaders, ...headers },
      auth: {
        username: shiftApiConfig.get().apiTenant,
        password: shiftApiConfig.get().apiAccessToken
      }
    })

    return this.determineResponse(response)
  }

  createRequestUrl (url, query) {
    let requestUrl

    if (!query) {
      requestUrl = `${shiftApiConfig.get().apiHost}/${shiftApiConfig.get().apiTenant}/${url}`
    } else if (url.includes(shiftApiConfig.get().omsHost)) {
      // TODO: remove this statement when platform proxy is live
      requestUrl = `${url}/?${query}`
    } else {
      requestUrl = `${shiftApiConfig.get().apiHost}/${shiftApiConfig.get().apiTenant}/${url}?${query}`
    }

    return requestUrl
  }

  determineResponse (response) {
    return response
      .then(response => {
        setCacheHeaders(response)
        return Promise.resolve({
          status: response.status,
          data: response.data,
          headers: response.headers
        })
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

module.exports = new HTTPClient()
