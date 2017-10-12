const axios = require('axios')
const qs = require('qs')
// We need circular-json to avoid
// `TypeError: Converting circular structure to JSON`
// while sending response data back to app
const CircularJSON = require('circular-json')

// Default headers for all external API requests
let defaultHeaders = {
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

// Merge any optional headers passed in
function formatHeaders (headers) {
  return Object.assign(defaultHeaders, headers)
}

function getData (request, url, response, options = {}) {
  axios.get(formatUrl(url, request), { headers: formatHeaders(options.headers) })
  .then((res) => {
    response.json(JSON.parse(CircularJSON.stringify(res.data)))
  })
  .catch((error) => {
    console.log('Error while fetching data')
    response.json(error)
  })
}

function postData (request, url, response, options = {}) {
  const method = request.method || 'POST'
  axios(formatUrl(url, request), { headers: formatHeaders(options.headers), method: method, data: request.body })
  .then((res) => {
    response.json(CircularJSON.stringify(res))
  })
  .catch((error) => {
    console.log('Error while posting data')
    response.json(error)
  })
}

module.exports = { getData, postData }
