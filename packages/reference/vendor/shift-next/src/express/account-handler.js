const { fetchData } = require('../lib/api-server')
const { shiftPlatform } = require('../lib/api-urls')

module.exports = {
  getAccount: async (req, res) => {
    const emptyResponse = {}
    const { customerId } = req.session

    if (!customerId) {
      return res.status(200).send(emptyResponse)
    }

    const params = {
      fields: {
        customer_accounts: 'email,meta_attributes'
      },
      // There are some default includes in the platform that we need this to ignore.
      include: ''
    }

    const response = await fetchData(params, shiftPlatform.accountByIdUrl(customerId))

    switch (response.status) {
      case 404:
        return res.status(200).send(emptyResponse)
      case 422:
        return res.status(response.status).send(response.data.errors)
      default:
        return res.status(response.status).send(response.data)
    }
  }
}
