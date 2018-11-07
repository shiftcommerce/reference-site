const { fetchData } = require('../lib/api-server')

function getRenderer (url) {
  return async (req, res) => {
    let urlWithParams = url

    if (req.params.id) {
      urlWithParams = `${url}/${req.params.id}`
    }

    const response = await fetchData(req.query, urlWithParams)

    return res.status(response.status).send(response.data)
  }
}

module.exports = { getRenderer }
