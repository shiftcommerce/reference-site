// Libraries
import Router from 'next/router'
import nock from 'nock'

// Pages
import { Slug } from '../../../client/pages/slug'

// Shared constants
const resourceType = 'staticpage'
const resourceId = 1

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

beforeEach(() => {
  nock(process.env.API_HOST_PROXY, { 'encodedQueryParams': true })
    .get('/getSlug/')
    .query(true)
    .reply(200, { 'data': [{
      'attributes': {
        'resource_id': 1,
        'resource_type': 'StaticPage'
      }
    }] }, ['access-control-allow-origin', '*'])
})

afterEach(() => { nock.cleanAll() })

test('Performs router replace to homepage when given /', async () => {
  // Set the slug
  const query = { slug: '/homepage' }

  // Mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  await Slug.getInitialProps({ query })

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that it sets the correct slug and goes to the homepage
  expect(Router.router.push.mock.calls[0][0]).toBe(`/${resourceType.toLowerCase()}?id=${resourceId}`)
  expect(Router.router.push.mock.calls[0][1]).toBe('/')
})

test('Performs router push to resource when given slug', async () => {
  // Set the slug
  const query = { slug: '/coffee' }

  // Mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  await Slug.getInitialProps({ query })

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that the sets the correct slug and goes to the correct resource
  expect(Router.router.push.mock.calls[0][0]).toBe(`/${resourceType.toLowerCase()}?id=${resourceId}`)
  expect(Router.router.push.mock.calls[0][1]).toBe(query.slug)
})
