// Lib
const { postData } = require('./../lib/api-server')

function accountRenderer (url) {
  return async (req, res) => {
    const response = await postData(req.body, url)

    if (response.status === 201) {
      const { data: { data: { id } } } = response
      req.session.customerId = id

      return res.status(201).send(response.data)
    } else {
      let errorData
      if (response.status === 422 || response.status === 404) {
        errorData = response.data.errors
      } else {
        errorData = response.data
      }
      return res.status(response.status).send(errorData)
    }
  }
}

module.exports = { accountRenderer }
