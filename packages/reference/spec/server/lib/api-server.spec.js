import axios from 'axios'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'

import { fetchData } from '../../../server/lib/api-server'

import getSlugPayload from '../../fixtures/get-slug'

axios.defaults.adapter = httpAdapter

afterEach(() => { nock.cleanAll() })

test('fetchDataRequest returns correct data', async () => {
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

  nock(process.env.API_HOST)
    .get(`/${url}`)
    .query(true)
    .reply(200, getSlugPayload)

  const response = await fetchData(queryObject, url)

  expect(response.status).toBe(200)
  expect(response.data.data[0].id).toBe('132997')
  expect(response.data.data[0].type).toBe('slugs')
  expect(response.data.data[0].attributes.resource_type).toBe('StaticPage')
  expect(response.data.data[0].attributes.slug).toBe('mens')
})
