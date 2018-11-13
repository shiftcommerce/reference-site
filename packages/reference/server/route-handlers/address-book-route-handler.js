// Lib
const { fetchData, postData, deleteData } = require('./../lib/api-server')

function addressBookRenderer (url) {
  return async (req, res) => {
    const urlWithCustomerId = insertCustomerId(url, req)
    const response = await fetchData({}, urlWithCustomerId)

    if (response.status === 201) {
      const { data } = response.data
      return res.status(201).send(data)
    } else if (response.status === 422 || response.status === 404) {
      const errorData = response.data.errors
      return res.status(response.status).send(errorData)
    } else {
      const errorData = response.data
      return res.status(response.status).send(errorData)
    }
  }
}

function postAddressRenderer (url) {
  return async (req, res) => {
    req.body.data.attributes.customer_account_id = req.session.customerId
    const response = await postData(req.body, url)
    return res.status(response.status).send(response.data)
  }
}

function deleteAddressRenderer (url) {
  return async (req, res) => {
    const urlWithAddressId = insertAddressId(url, req)
    const response = await deleteData(urlWithAddressId)

    if (response.status === 204) {
      const { data } = response.data
      return res.status(204).send(data)
    } else if (response.status === 422 || response.status === 404) {
      const errorData = response.data.errors
      return res.status(response.status).send(errorData)
    } else {
      const errorData = response.data
      return res.status(response.status).send(errorData)
    }
  }
}

function insertCustomerId (url, req) {
  const customerId = req.session.customerId
  return url.replace(':customer_account_id', customerId)
}

function insertAddressId (url, req) {
  const addressId = req.url.split('/').slice(-1).pop()
  return url.replace(':address_id', addressId)
}

module.exports = { addressBookRenderer, postAddressRenderer, deleteAddressRenderer }
