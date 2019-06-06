const { SHIFTClient } = require('@shiftcommerce/shift-node-api')

const addressBookApiEndpointQuery = {
  fields: {
    addresses: 'address_line_1,address_line_2,city,country,first_name,last_name,meta_attributes,postcode,preferred_billing,preferred_shipping,state',
  }
}

module.exports = {
  getAddressBook: async (req, res) => {
    req.query = { ...req.query, ...addressBookApiEndpointQuery }
    const { customerId } = req.session

    if (!customerId) {
      return res.status(200).send({})
    }

    const response = await SHIFTClient.getAddressBookV1(customerId, req.query)
    return handleResponse(response, req, res)
  },

  createAddressBookEntry: async (req, res) => {
    const { customerId } = req.session

    if (!customerId) {
      return res.status(200).send({})
    }

    const response = await SHIFTClient.createAddressBookEntryV1(req.body, customerId)
    return handleResponse(response, req, res)
  },

  deleteAddress: async (req, res) => {
    const { customerId } = req.session

    if (!customerId) {
      return res.status(200).send({})
    }

    const response = await SHIFTClient.deleteAddressV1(req.params.addressId, customerId)
    return handleResponse(response, req, res)
  }
}

function handleResponse(response, req, res) {
  switch (response.status) {
  case 404:
    return res.status(200).send({})
  case 422:
    req.log && req.log.error({ status: response.status, errors: response.data.errors })
    return res.status(response.status).send(response.data.errors)
  default:
    return res.status(response.status).send(response.data)
  }
}
