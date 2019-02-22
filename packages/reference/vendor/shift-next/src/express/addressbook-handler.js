const { SHIFTClient } = require('shift-api')

module.exports = {
  getAddressBook: async (req, res) => {
    const { customerId } = req.session

    if (!customerId) {
      return res.status(200).send({})
    }

    const response = await SHIFTClient.getAddressBookV1(customerId)

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
