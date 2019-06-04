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

    switch (response.status) {
      case 404:
        return res.status(200).send({})
      case 422:
        return res.status(response.status).send(response.data.errors)
      default:
        return res.status(response.status).send(response.data)
    }
  },
  createAddressBookEntry: async (req, res) => {
    const { customerId } = req.session

    if (!customerId) {
      return res.status(200).send({})
    }

    const response = await SHIFTClient.createAddressBookEntryV1(req.body, customerId)

    switch (response.status) {
      case 404:
        return res.status(200).send({})
      case 422:
        return res.status(response.status).send(response.data.errors)
      default:
        return res.status(response.status).send(response.data)
    }
  },
  deleteAddress: async (req, res) => {
    const { customerId } = req.session

    if (!customerId) {
      return res.status(200).send({})
    }

    const response = await SHIFTClient.deleteAddressV1(req.params.addressId, customerId)

    switch (response.status) {
      case 404:
        return res.status(200).send({})
      case 422:
        return res.status(response.status).send(response.data.errors)
      default:
        return res.status(response.status).send(response.data)
    }
  }
}
