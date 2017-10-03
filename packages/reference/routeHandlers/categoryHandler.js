const { getData } = require('./../lib/fetchData')

// Product api urls
const api = require('./../constants/apiUrls')

// Fetch all the categories
function getCategoriesRenderer (nextApp) {
  return (req, res) => {
    const baseUrl = `${process.env.API_HOST}${api.CategoryUrl}.json_api`
    getData(req, baseUrl, res)
  }
}

// Fetch single category basing on category id set in params.
function getCategoryRenderer (nextApp) {
  return (req, res) => {
    const categoryId = req.params.id
    const baseUrl = `${process.env.API_HOST}${api.CategoryUrl}/${categoryId}.json_api`
    getData(req, baseUrl, res)
  }
}

module.exports = {
  getCategoryRenderer,
  getCategoriesRenderer
}
