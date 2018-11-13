// Lib
const { fetchData, postData } = require('../lib/api-server')

function getRenderer (url) {
  return async (req, res) => {
    const emptyResponse = {}
    const { customerId } = req.session

    if (!customerId) {
      return res.status(200).send(emptyResponse)
    }

    const accountUrl = `${url}/${customerId}`
    const params = {
      fields: {
        customer_accounts: 'email,meta_attributes'
      },
      // There are some default includes in the platform that we need this to ignore.
      include: ''
    }

    const response = await fetchData(params, accountUrl)

    if (response.status === 200) {
      const data = response.data

      return res.status(200).send(data)
    } else if (response.status === 404) {
      return res.status(200).send(emptyResponse)
    } else if (response.status === 422) {
      const errorData = response.data.errors

      return res.status(response.status).send(errorData)
    } else {
      const errorData = response.data

      return res.status(response.status).send(errorData)
    }
  }
}

function postRenderer (url) {
  return async (req, res) => {
    const response = await postData(req.body, url)
    if (response.status === 201) {
      const { data } = response.data

      if (data.type === 'customer_accounts') {
        req.session.customerId = data.id
      } else if (data.type === 'customer_account_authentications') {
        req.session.customerId = data.relationships.customer_account.data.id
      }

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

module.exports = { getRenderer, postRenderer }
