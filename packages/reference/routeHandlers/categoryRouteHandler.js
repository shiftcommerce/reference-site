const { getData } = require('./../lib/ApiServer')

// Product api urls
const api = require('./../constants/apiUrls')

// Fetch all the categories
function getCategoriesRenderer (nextApp) {
  return (req, res) => {
    const baseUrl = `${api.Host}${api.MenuUrl}.json_api`
    getData(req, baseUrl, res)
  }
}

// Fetch single category basing on category id set in params.
function getCategoryRenderer (nextApp) {
  return (req, res) => {
    const baseUrl = `${api.Host}${api.CategoryUrl}.json_api`
    getData(req, baseUrl, res)
  }
}

module.exports = {
  getCategoryRenderer,
  getCategoriesRenderer
}
