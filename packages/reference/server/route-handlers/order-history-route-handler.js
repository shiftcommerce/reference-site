// Lib
const { fetchOmsData } = require('./../lib/api-server')

function orderHistoryRenderer (url) {
  return async (req, res) => {
    const filterParams = {
      filter: {
        account_reference: process.env.API_TENANT,
        customer_reference: req.session.customerId
      }
    }

    const queryWithFilterParams = { ...req.query, ...filterParams }

    const response = await fetchOmsData(queryWithFilterParams, url)

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

module.exports = { orderHistoryRenderer }
