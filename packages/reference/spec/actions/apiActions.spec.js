// Actions
import * as apiActions from './../../actions/apiActions'

// ApiClient
import ApiClient from './../../lib/ApiClient'

describe('Read Endpoint', () => {
  test('dispatch loading to true, on initial call', () => {
    // Arrange
    const request = {
      endpoint: `/testEndpoint`,
      query: {
        fields: {
          categories: 'id,title'
        }
      },
      successActionType: 'SET_TEST'
    }
    const fn = apiActions.readEndpoint(request)
    const dispatch = jest.fn()
    const getState = jest.fn()

    // Act
    fn(dispatch, getState)

    // Assert
    expect(fn).toEqual(expect.any(Function))
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_TEST',
      payload: {
        loading: true
      }
    })
  })
})
