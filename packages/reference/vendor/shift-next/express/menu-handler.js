const { SHIFTClient } = require('shift-api')

module.exports = {
  getMenu: async (req, res) => {
    const emptyResponse = {}

    const response = await SHIFTClient.getMenusV1(req.query)

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
