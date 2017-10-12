const fetchData = require('./../lib/ApiServer')

// Product api urls
const api = require('./../constants/apiUrls')

// Fetch product details basing on the product id set in the params
function createOrderRenderer (nextApp) {
  return (req, res) => {
    const baseUrl = `${process.env.API_HOST}${api.CreateOrderUrl}.json_api`
    req.body = req.body.body
    // TODO: Remove this once auth app integrated
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.OMS_ACCESS_TOKEN}`
      }
    }
    fetchData.postData(req, baseUrl, res, options)
  }
}

module.exports = { createOrderRenderer }
