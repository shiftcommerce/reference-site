import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as loginActions from '../../../client/actions/login-actions'
import * as actionTypes from '../../../client/actions/action-types'

afterEach(() => { nock.cleanAll() })

test('return SET_LOGIN action type on calling setLoggedInFromCookies()', () => {
  // Act
  const action = loginActions.setLoggedInFromCookies()

  // Assert
  expect(action.type).toEqual(actionTypes.SET_LOGIN)
})

test('return ERROR_LOGIN action type if errors are returned from API', () => {
  // Arrange
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  const errorData = {
    title: 'Record not found',
    detail: 'Wrong email/reference/token or password',
    code: '404',
    status: '404'
  }

  nock(process.env.API_HOST_PROXY)
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .post('/login')
    .reply(404, errorData)

  const account = {
    email: 'homersimpson@test.com',
    password: 'testtesttest'
  }

  const store = mockStore({
    login: {
      errors: []
    }
  })

  const expectedActions = [
    {
      type: actionTypes.GET_LOGIN,
      data: undefined
    },
    {
      type: actionTypes.ERROR_LOGIN,
      payload: { error: { data: errorData } }
    }
  ]

  // Act
  return store.dispatch(loginActions.createLogin(account))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
})
