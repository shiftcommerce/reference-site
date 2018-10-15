const { fetchData } = require('../lib/api-server')

function getRenderer (url) {
  return async (req, res) => {
    let urlWithParams = url
    if (req.params.id) {
      urlWithParams = `${url}/${req.params.id}`
    }

    const queryObject = req.query
    const data = await fetchData(queryObject, urlWithParams)

    return res.status(data.status).send(data.data)
  }
}

module.exports = { getRenderer }
