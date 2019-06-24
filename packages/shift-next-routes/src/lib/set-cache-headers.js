// copy over any CDN cache key response headers from one response to another
function setSurrogateHeaders (headers, response) {
  if (!headers) {
    return false
  }
  Object.keys(headers)
    .filter(name => name.toLowerCase().indexOf('surrogate') === 0)
    .forEach(key => {
      response.set(key, headers[key])
    })
}

module.exports = { setSurrogateHeaders }
