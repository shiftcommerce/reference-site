import sinon from 'sinon'

// Actions
import * as apiActions from '../../../../client/actions/apiActions'
import ApiClient from '../../../../client/lib/ApiClient'

import read200 from '../../../fixtures/actions/apiActions/read-200.fixture'
import read304 from '../../../fixtures/actions/apiActions/read-304.fixture'
import read500 from '../../../fixtures/actions/apiActions/read-500.fixture'

describe('Read Endpoint', () => {
  describe('Making a request which returns a 200', () => {
    const stub = sinon.stub(ApiClient.prototype, 'read').callsFake(async () => {
      return read200
    })
    // Arrange
    const request = {
      endpoint: `/testEndpoint`,
      query: {
        fields: {
          menu: 'id,title'
        }
      },
      requestActionType: 'GET_TEST',
      successActionType: 'SET_TEST',
      errorActionType: 'SET_ERROR'
    }

    const fn = apiActions.readEndpoint(request)
    const dispatch = jest.fn()
    const getState = jest.fn()

    // Act
    fn(dispatch, getState)

    stub.restore()

    // Assert
    it('should not error and return the data', async () => {
      expect(dispatch).toHaveBeenCalledWith({ 'payload': { 'data': [{ 'active': true, 'id': '132997', 'resource_id': 50, 'resource_type': 'StaticPage', 'slug': 'mens' }], 'pagination': {} }, 'type': 'SET_TEST' })
      expect(dispatch).toHaveBeenCalledWith({ type: 'GET_TEST' })
      expect(dispatch).not.toHaveBeenCalledWith({ payload: { error: { data: undefined } }, type: 'SET_ERROR' })
    })
  })

  describe('Making a request which returns a 304', () => {
    const stub = sinon.stub(ApiClient.prototype, 'read').callsFake(async () => {
      return read304
    })
    // Arrange
    const request = {
      endpoint: `/testEndpoint`,
      query: {
        fields: {
          menu: 'id,title'
        }
      },
      requestActionType: 'GET_TEST',
      successActionType: 'SET_TEST',
      errorActionType: 'SET_ERROR'
    }

    const fn = apiActions.readEndpoint(request)
    const dispatch = jest.fn()
    const getState = jest.fn()

    // Act
    fn(dispatch, getState)

    stub.restore()

    // Assert
    it('should not error and return data', async () => {
      expect(dispatch).toHaveBeenCalledWith({ 'payload': { 'data': [{ 'active': true, 'id': '132997', 'resource_id': 50, 'resource_type': 'StaticPage', 'slug': 'mens' }], 'pagination': {} }, 'type': 'SET_TEST' })
      expect(dispatch).toHaveBeenCalledWith({ type: 'GET_TEST' })
      expect(dispatch).not.toHaveBeenCalledWith({ payload: { error: { data: undefined } }, type: 'SET_ERROR' })
    })
  })

  describe('Making a request which returns a 500', () => {
    const stub = sinon.stub(ApiClient.prototype, 'read').callsFake(async () => {
      return read500
    })
    // Arrange
    const request = {
      endpoint: `/testEndpoint`,
      query: {
        fields: {
          menu: 'id,title'
        }
      },
      requestActionType: 'GET_TEST',
      successActionType: 'SET_TEST',
      errorActionType: 'SET_ERROR'
    }

    const fn = apiActions.readEndpoint(request)
    const dispatch = jest.fn()
    const getState = jest.fn()

    // Act
    fn(dispatch, getState)

    stub.restore()

    // Assert
    it('should error and return the error', async () => {
      expect(dispatch).toHaveBeenCalledWith({ 'payload': { 'error': { 'data': { 'data': [{ 'attributes': { 'active': true, 'resource_id': 50, 'resource_type': 'StaticPage', 'slug': 'mens' }, 'id': '132997', 'links': { 'self': '/integration/v1/slugs/132997.json_api' }, 'type': 'slugs' }] }, 'request': { 'endpoint': '/testEndpoint', 'errorActionType': 'SET_ERROR', 'query': { 'fields': { 'menu': 'id,title' } }, 'requestActionType': 'GET_TEST', 'successActionType': 'SET_TEST' } } }, 'type': 'SET_ERROR' })
      expect(dispatch).toHaveBeenCalledWith({ type: 'GET_TEST' })
      expect(dispatch).not.toHaveBeenCalledWith({ payload: { 'data': [{ 'active': true, 'id': '132997', 'resource_id': 50, 'resource_type': 'StaticPage', 'slug': 'mens' }], 'pagination': {} }, 'type': 'SET_TEST' })
    })
  })
})
