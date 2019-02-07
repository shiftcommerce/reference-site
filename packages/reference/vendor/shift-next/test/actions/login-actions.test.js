import * as loginActions from '../../src/actions/login-actions'
import * as actionTypes from '../../src/actions/action-types'
import * as apiActions from '../../src/actions/api-actions'

test('createLogin() initiates a correct request', () => {
  const postLoginSpy = jest.spyOn(apiActions, 'postEndpoint')

  loginActions.createLogin({
    email: 'email@example.com',
    password: 'password123'
  })

  expect(postLoginSpy).toHaveBeenCalledTimes(1)
  const request = postLoginSpy.mock.calls[0][0]
  expect(request.endpoint).toEqual('/login')
  expect(request.body.data).toEqual({
    type: 'customer_account_authentications',
    attributes: {
      email: 'email@example.com',
      password: 'password123',
      meta_attributes: {}
    }
  })
  expect(request.successActionType).toEqual(actionTypes.SET_LOGIN)
})
