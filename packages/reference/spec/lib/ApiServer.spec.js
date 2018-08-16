import axios from 'axios'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'

import { fetchData } from '../../lib/ApiServer'

axios.defaults.adapter = httpAdapter

const queryObject = {
  filter: {
    path: '/pages/mens'
  },
  page: {
    number: 1,
    size: 1
  },
  fields: {
    slugs: 'resource_type,resource_id,active,slug'
  }
}

const url = 'integration/v1/slugs'

const data = {
  data: [{
    id: '132997',
    type: 'slugs',
    links: {
      self: '/integration/v1/slugs/132997.json_api'
    },
    attributes: {
      resource_type: 'StaticPage',
      resource_id: 50,
      active: true,
      slug: 'mens'
    }
  }]
}

describe('fetchDataRequest makes', () => {
  test('api call', async () => {
    nock('http://localhost:3000')
      .get(/slugs/)
      .reply(200, data)

    const response = await fetchData(queryObject, url)

    expect(response.status).toBe(200)
    expect(response.data.data[0].id).toBe('132997')
    expect(response.data.data[0].type).toBe('slugs')
    expect(response.data.data[0].attributes.resource_type).toBe('StaticPage')
    expect(response.data.data[0].attributes.slug).toBe('mens')
  })
})
