const fetch = require('isomorphic-fetch')
const qs = require('qs')

// Default headers for all external API requests
const defaultHeaders = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json',
  'Authorization': `Bearer ${process.env.API_ACCESS_TOKEN}`
}

function formatUrl (url, request) {
  if (Object.keys(request.query).length > 0) {
    const query = qs.stringify(request.query)
    url = `${url}?${query}`
  }
  return url
}

function getData (request, url, response) {
  const method = request.method || 'GET'

  fetch(formatUrl(url, request), { headers: defaultHeaders, method: method }).then((res) => {
    return res.json()
  }).then((data) => {
    return response.json(data)
  })
}

function postData (request, url, response) {
  const method = request.method || 'POST'

  fetch(formatUrl(url, request), { headers: defaultHeaders, method: method, body: request.body }).then((res) => {
    return res.json()
  }).then((data) => {
    return response.json(data)
  })
}

module.exports = { getData, postData }
