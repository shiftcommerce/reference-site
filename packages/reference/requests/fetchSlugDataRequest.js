const axios = require('axios')
const qs = require('qs')

const auth = {
  username: process.env.API_TENANT,
  password: process.env.API_ACCESS_TOKEN
}

const page = {
  number: 1,
  size: 1
}

const fields = {
  slugs: 'resource_type,resource_id,active,slug'
}

const headers = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json'
}

const fetchSlugData = async slug => {
  const queryObject = {
    filter: {
      path: slug
    },
    page: page,
    fields: fields
  }

  const query = qs.stringify(queryObject)

  try {
    const response = await axios.get(`${process.env.API_HOST}/${process.env.API_TENANT}/v1/slugs?${query}`, {
      headers: headers,
      auth: auth
    })
    if (response.status === 200) {
      const page = response
      if (Array.isArray(page.data.data)) {
        page.data.data = page.data.data[0]
      }
      return page
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = fetchSlugData
