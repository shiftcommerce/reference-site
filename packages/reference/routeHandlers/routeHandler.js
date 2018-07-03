const fetchData = require('../requests/fetchDataRequest')

function getRenderer (url) {
  return async (req, res) => {
    if (req.params.id) {
      url += `/${req.params.id}`
    }
    const queryObject = req.query
    const data = await fetchData(queryObject, url)

    return res.status(200).send(data.data)
  }
}

module.exports = { getRenderer }
