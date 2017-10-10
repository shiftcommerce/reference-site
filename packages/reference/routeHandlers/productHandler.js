const fetchData = require('./../lib/fetchData')

// Product api urls
const api = require('./../constants/apiUrls')

// Fetch product details basing on the product id set in the params
function getProductRenderer (nextApp) {
  return (req, res) => {
    const productID = req.params.id
    const baseUrl = `${api.Host}${api.ProductUrl}/${productID}.json_api`

    fetchData.getData(req, baseUrl, res)
  }
}

module.exports = { getProductRenderer }
