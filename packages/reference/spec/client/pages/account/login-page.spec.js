// Libraries
import Router from 'next/router'

// Pages
import LoginPage from '../../../../client/pages/account/login'

test('redirects to myaccount page when account already exists', async () => {
  // Mock Redux store
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

  // Mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  // Act
  await LoginPage.getInitialProps({ reduxStore })

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that the redirect goes to the myaccount page
  expect(Router.router.push.mock.calls[0][0]).toBe('/account/myaccount')
})

test('redirects to myaccount page when user already logged in', async () => {
  // Mock Redux store
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

  // Mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  // Act
  await LoginPage.getInitialProps({ reduxStore })

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that the redirect goes to the myaccount page
  expect(Router.router.push.mock.calls[0][0]).toBe('/account/myaccount')
})