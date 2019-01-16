// Libraries
import Router from 'next/router'

// Pages
import { RegisterPage } from '../../../../client/pages/account/register'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

test('redirects to myaccount page when account is created', () => {
  // Arrange - mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  const wrapper = mount(
    <RegisterPage
      account = {{ loggedIn: false }}
      registration = {{ errors: [] }}
    />
  )

  // Act - pretend a user has just logged in
  wrapper.setProps({ account: { loggedIn: true, errors: {}, validationErrors: [] } })

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that the redirect goes to the myaccount page
  expect(Router.router.push.mock.calls[0][0]).toBe('/account/myaccount')
})

test('redirects to myaccount page when account already exists', async () => {
  // Arrange - mock Redux store
  const reduxStore = {
    getState: function () {
      return {
        account: {
          loggedIn: false
        },
        login: {
          loggedIn: true
        }
      }
    }
  }

  // Arrange - mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  // Act
  await RegisterPage.getInitialProps({ reduxStore })

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that the redirect goes to the myaccount page
  expect(Router.router.push.mock.calls[0][0]).toBe('/account/myaccount')
})

test('redirects to myaccount page when user already logged in', async () => {
  // Arrange - mock Redux store
  const reduxStore = {
    getState: function () {
      return {
        account: {
          loggedIn: true
        },
        login: {
          loggedIn: false
        }
      }
    }
  }

  // Arrange - mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  // Act
  await RegisterPage.getInitialProps({ reduxStore })

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that the redirect goes to the myaccount page
  expect(Router.router.push.mock.calls[0][0]).toBe('/account/myaccount')
})
