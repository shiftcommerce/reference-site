import axios from 'axios'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'

import { fetchData, postData } from '../../lib/ApiServer'

// fixtures
import registerPayload from '../fixtures/register.fixture'
import getSlugPayload from '../fixtures/getSlug.fixture'

axios.defaults.adapter = httpAdapter

describe('fetchDataRequest makes', () => {
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

  it('should return the data', async () => {
    nock(process.env.API_HOST)
      .get(`/${url}?filter%5Bpath%5D=%2Fpages%2Fmens&page%5Bnumber%5D=1&page%5Bsize%5D=1&fields%5Bslugs%5D=resource_type%2Cresource_id%2Cactive%2Cslug`)
      .reply(200, getSlugPayload)

    const response = await fetchData(queryObject, url)

    expect(response.status).toBe(200)
    expect(response.data.data[0].id).toBe('132997')
    expect(response.data.data[0].type).toBe('slugs')
    expect(response.data.data[0].attributes.resource_type).toBe('StaticPage')
    expect(response.data.data[0].attributes.slug).toBe('mens')
  })
})

describe('postDataRequest', () => {
  const url = 'integration/v1/customer_accounts'

  const body = {
    data: {
      type: 'customer_accounts',
      attributes: {
        email: 'a.fletcher1234@gmail.com',
        email_confirmation: 'a.fletcher1234@gmail.com',
        password: 'qwertyuiop',
        password_confirmation: 'qwertyuiop'
      }
    }
  }

  it('should save and return the data', async () => {
    nock(process.env.API_HOST)
      .post(`/${url}`)
      .reply(201, registerPayload)
      .log(console.log)

    const response = await postData(body, url)

    expect(response.status).toBe(201)
    expect(response.data.data.id).toBe('23063267')
    expect(response.data.data.type).toBe('customer_accounts')
    expect(response.data.data.attributes.email).toBe('a.fletcher1234@gmail.com')
  })
})
