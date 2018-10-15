// Lib
const { postData } = require('./../lib/api-server')

function accountRenderer (url) {
  return async (req, res) => {
    const response = await postData(req.body, url)

    if (response.status === 201) {
      const { data } = response.data
      const customerId = data.relationships.customer_account.data.id
      req.session.customerId = customerId

      return res.status(201).send(data)
    } else if (response.status === 422 || response.status === 404) {
      const errorData = response.data.errors

      return res.status(200).send(errorData)
    } else {
      const errorData = response.data

      return res.status(response.status).send(errorData)
    }
  }
}

module.exports = { accountRenderer }
