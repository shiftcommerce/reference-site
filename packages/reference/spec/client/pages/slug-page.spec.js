// Libraries
import { createMockStore } from 'redux-test-utils'
import Router from 'next/router'

// Pages
import { Slug } from '../../../client/pages/slug'

// Shared constants
const resourceType = 'staticpage'
const resourceId = 1

const slug = {
  data: [
    {
      resource_type: resourceType,
      resource_id: resourceId
    }
  ]
}

const initialState = {
  slug: slug
}

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

// Tests

test('Performs router replace to homepage when given /', async () => {
  // Mock the redux store
  const reduxStore = createMockStore(initialState)
  reduxStore.dispatch = jest.fn()

  // Set the slug
  const query = { slug: '/homepage' }

  // Mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  await Slug.getInitialProps({ reduxStore, query })

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that it sets the correct slug and goes to the homepage
  expect(Router.router.push.mock.calls[0][0]).toBe(`/${resourceType.toLowerCase()}?id=${resourceId}`)
  expect(Router.router.push.mock.calls[0][1]).toBe('/')
})

test('Performs router push to resource when given slug', async () => {
  // Mock the redux store
  const reduxStore = createMockStore(initialState)
  reduxStore.dispatch = jest.fn()

  // Set the slug
  const query = { slug: '/coffee' }

  // Mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  await Slug.getInitialProps({ reduxStore, query })

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that the sets the correct slug and goes to the correct resource
  expect(Router.router.push.mock.calls[0][0]).toBe(`/${resourceType.toLowerCase()}?id=${resourceId}`)
  expect(Router.router.push.mock.calls[0][1]).toBe(query.slug)
})
