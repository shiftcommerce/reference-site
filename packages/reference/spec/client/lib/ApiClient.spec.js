// import moxios from 'moxios'
import nock from 'nock'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

import ApiClient from '../../../client/lib/ApiClient'
import Payload from '../../fixtures/productsPayload.fixture'

const nockScope = nock(/.*/)

const testRequest = {
  endpoint: '/Products',
  query: {
    fields: {
      include: 'asset_files,variants,bundles,template,meta.*'
    }
  }
}

axios.defaults.adapter = httpAdapter

describe('ApiClient does', () => {
  const expectedData = Payload

  test('read', async () => {
    nockScope.intercept(/Products/, 'GET').reply(200, Payload)

    const client = new ApiClient()

    const response = await client.read(testRequest.endpoint, testRequest.query)

    expect(response.status).toBe(200)
    expect(response.data).toEqual(expectedData)
  })
})
