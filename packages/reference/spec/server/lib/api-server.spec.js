import axios from 'axios'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'

import { fetchData, postData, patchData, deleteData } from '../../../server/lib/api-server'

// fixtures
import registerPayload from '../../fixtures/register'
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

test('postDataRequest saves and returns data', async () => {
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

test('patchData updates and returns data', async () => {
  const url = 'integration/v1/customer_accounts'

  const body = {
    data: {
      type: 'customer_accounts',
      attributes: {
        email: 'updated_email@example.com'
      }
    }
  }

  nock(process.env.API_HOST)
    .patch(`/${url}`)
    .reply(200, registerPayload)

  const response = await patchData(body, url)

  expect(response.status).toBe(200)
  expect(response.data.data.id).toBe('23063267')
  expect(response.data.data.type).toBe('customer_accounts')
})

test('deleteData correctly returns successful responses', async () => {
  // Mock out the delete request
  nock(process.env.API_HOST)
    .delete('/deleteEndpoint')
    .reply(204)

  // Make the request
  const response = await deleteData('deleteEndpoint')

  expect(response.status).toEqual(204)
})

test('deleteData correctly returns error responses and logs to console', async () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

  // Mock out the delete request
  nock(process.env.API_HOST)
    .delete('/deleteEndpoint')
    .reply(500)

  // Make the request
  const response = await deleteData('deleteEndpoint')

  // Assert the response is correct
  expect(response.status).toEqual(500)

  // Assert that an error has been logged to the console
  expect(spy).toHaveBeenCalledTimes(1)

  // Clean up after mocking out the console
  spy.mockRestore()
})
