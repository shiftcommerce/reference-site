import nock from 'nock'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

// Actions
import * as apiActions from './../../actions/apiActions'

axios.defaults.adapter = httpAdapter

describe('Read Endpoint', () => {
  test('dispatch loading to true, on initial call', () => {
    // Arrange
    const request = {
      endpoint: `/testEndpoint`,
      query: {
        fields: {
          menu: 'id,title'
        }
      },
      requestActionType: 'GET_TEST',
      successActionType: 'SET_TEST'
    }
    const fn = apiActions.readEndpoint(request)
    const dispatch = jest.fn()
    const getState = jest.fn()

    nock('http://localhost:3000')
      .get(/testEndpoint/)
      .reply(200, {})

    // Act
    fn(dispatch, getState)

    // Assert
    expect(fn).toEqual(expect.any(Function))
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_TEST'
    })
  })
})
