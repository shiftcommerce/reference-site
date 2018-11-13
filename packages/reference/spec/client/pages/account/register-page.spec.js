// Libraries
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Router from 'next/router'

// Reducers
import rootReducer from '../../../../client/reducers/root-reducer'

// actionTypes
import * as types from '../../../../client/actions/action-types'

// Fixtures
import accountPayload from '../../../fixtures/account-payload'

// Pages
import RegisterPage from '../../../../client/pages/account/register'

test('redirects to myaccount page when account is created', () => {
  // Arrange - mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  // Arrange - build a Redux store and the component
  const store = createStore(rootReducer)
  mount(
    <Provider store={store}>
      <RegisterPage />
    </Provider>
  )

  // Act - pretend the account is being set
  store.dispatch({
    type: types.SET_ACCOUNT,
    payload: accountPayload.data.attributes
  })

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
