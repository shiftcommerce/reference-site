const { fetchData } = require('../lib/ApiServer')

function getRenderer (url) {
  return async (req, res) => {
    let urlWithParams = url
    if (req.params.id) {
      urlWithParams = `${url}/${req.params.id}`
    }

    const queryObject = req.query
    const data = await fetchData(queryObject, urlWithParams)

    return res.status(200).send(data.data)
  }
}

module.exports = { getRenderer }
