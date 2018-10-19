const axios = require('axios')
const qs = require('qs')

// libs
const { setCacheHeaders } = require('./setCacheHeaders')

const auth = {
  username: process.env.API_TENANT,
  password: process.env.API_ACCESS_TOKEN
}

const headers = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json'
}

const fetchData = async (queryObject, url) => {
  const query = qs.stringify(queryObject)

  try {
    const response = await axios.get(`${process.env.API_HOST}/${url}?${query}`, {
      auth: auth,
      headers: headers
    })

    setCacheHeaders(response)
    return response
  } catch (error) {
    console.error(error)
    return error.response
  }
}

const fetchOmsData = async (queryObject, url) => {
  const query = qs.stringify(queryObject)

  try {
    const response = await axios.get(`${process.env.OMS_HOST}/${url}?${query}`, {
      headers: headers
    })

    return response
  } catch (error) {
    console.error(error)
    return error.response
  }
}

const postData = async (body, url) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${process.env.API_HOST}/${url}`,
      headers: headers,
      auth: auth,
      data: body
    })

    setCacheHeaders(response)
    return response
  } catch (error) {
    console.error('ERROR', error.response)
    return error.response
  }
}

module.exports = { fetchData, fetchOmsData, postData }
