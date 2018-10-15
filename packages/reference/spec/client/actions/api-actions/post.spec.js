import sinon from 'sinon'

// Actions
import * as apiActions from '../../../../client/actions/api-actions'
import ApiClient from '../../../../client/lib/api-client'

import post200 from '../../../fixtures/actions/api-actions/post-200'
import post201 from '../../../fixtures/actions/api-actions/post-201'
import post404 from '../../../fixtures/actions/api-actions/post-404'
import post422 from '../../../fixtures/actions/api-actions/post-422'

describe('Post Endpoint', () => {
  describe('posting a request which returns a 200', () => {
    const stub = sinon.stub(ApiClient.prototype, 'post').callsFake(async () => {
      return post200
    })

    // Arrange
    const request = {
      endpoint: `/testEndpoint`,
      body: {
        data: {
          type: 'customer_accounts',
          attributes: {
            email: 'a.fletcher1234@gmail.com',
            email_confirmation: 'a.fletcher1234@gmail.com',
            password: 'qwertyuiop',
            password_confirmation: 'qwertyuiop'
          }
        }
      },
      requestActionType: 'GET_TEST',
      successActionType: 'SET_TEST',
      errorActionType: 'SET_ERROR'
    }
    const fn = apiActions.postEndpoint(request)
    const dispatch = jest.fn()
    const getState = jest.fn()

    // Act
    fn(dispatch, getState)

    stub.restore()

    // Assert
    it('should not error and return the data', async () => {
      expect(dispatch).toHaveBeenCalledWith({ 'payload': { 'addresses': undefined, 'cart': { 'applied_promotions': undefined, 'available_shipping_methods': undefined, 'available_shipping_promotions': undefined, 'billing_address': undefined, 'channel': 'web', 'created_at': '2018-08-28T13:57:37Z', 'customer_account': undefined, 'discount_summaries': undefined, 'email': 'a.fletcher1234@gmail.com', 'free_shipping': false, 'free_shipping_promotion': undefined, 'id': '31791629', 'line_items': undefined, 'line_items_count': 0, 'meta_attributes': {}, 'payment_transactions': undefined, 'shipping_address': undefined, 'shipping_discount_name': null, 'shipping_method': undefined, 'shipping_total': 0, 'shipping_total_discount': 0, 'sub_total': 0, 'tax': 0, 'test': false, 'total': 0, 'total_discount': 0, 'updated_at': '2018-08-28T13:57:37Z' }, 'created_at': '2018-08-28T13:57:37.802Z', 'customer_segments': [], 'email': 'a.fletcher1234@gmail.com', 'id': '23063267', 'meta_attributes': {}, 'orders': undefined, 'password_recovery': undefined, 'reference': null, 'updated_at': '2018-08-28T13:57:37.802Z' }, 'type': 'SET_TEST' })
      expect(dispatch).toHaveBeenCalledWith({ type: 'GET_TEST' })
      expect(dispatch).not.toHaveBeenCalledWith({ payload: { error: { data: undefined } }, type: 'SET_ERROR' })
    })
  })

  describe('posting a request which returns a 201', () => {
    const stub = sinon.stub(ApiClient.prototype, 'post').callsFake(async () => {
      return post201
    })

    // Arrange
    const request = {
      endpoint: `/testEndpoint`,
      body: {
        data: {
          type: 'customer_accounts',
          attributes: {
            email: 'a.fletcher1234@gmail.com',
            email_confirmation: 'a.fletcher1234@gmail.com',
            password: 'qwertyuiop',
            password_confirmation: 'qwertyuiop'
          }
        }
      },
      requestActionType: 'GET_TEST',
      successActionType: 'SET_TEST',
      errorActionType: 'SET_ERROR'
    }
    const fn = apiActions.postEndpoint(request)
    const dispatch = jest.fn()
    const getState = jest.fn()

    // Act
    fn(dispatch, getState)

    stub.restore()

    // Assert
    it('should not error and return the data', async () => {
      expect(dispatch).toHaveBeenCalledWith({ 'payload': { 'addresses': undefined, 'cart': { 'applied_promotions': undefined, 'available_shipping_methods': undefined, 'available_shipping_promotions': undefined, 'billing_address': undefined, 'channel': 'web', 'created_at': '2018-08-28T13:57:37Z', 'customer_account': undefined, 'discount_summaries': undefined, 'email': 'a.fletcher1234@gmail.com', 'free_shipping': false, 'free_shipping_promotion': undefined, 'id': '31791629', 'line_items': undefined, 'line_items_count': 0, 'meta_attributes': {}, 'payment_transactions': undefined, 'shipping_address': undefined, 'shipping_discount_name': null, 'shipping_method': undefined, 'shipping_total': 0, 'shipping_total_discount': 0, 'sub_total': 0, 'tax': 0, 'test': false, 'total': 0, 'total_discount': 0, 'updated_at': '2018-08-28T13:57:37Z' }, 'created_at': '2018-08-28T13:57:37.802Z', 'customer_segments': [], 'email': 'a.fletcher1234@gmail.com', 'id': '23063267', 'meta_attributes': {}, 'orders': undefined, 'password_recovery': undefined, 'reference': null, 'updated_at': '2018-08-28T13:57:37.802Z' }, 'type': 'SET_TEST' })
      expect(dispatch).toHaveBeenCalledWith({ type: 'GET_TEST' })
      expect(dispatch).not.toHaveBeenCalledWith({ payload: { error: { data: undefined } }, type: 'SET_ERROR' })
    })
  })

  describe('posting a request which returns a 200 but with errors', () => {
    const stub = sinon.stub(ApiClient.prototype, 'post').callsFake(async () => {
      return post404
    })

    // Arrange
    const request = {
      endpoint: `/testEndpoint`,
      body: {
        data: {
          type: 'customer_accounts',
          attributes: {
            email: 'a.fletcher1234@gmail.com',
            email_confirmation: 'a.fletcher1234@gmail.com',
            password: 'qwertyuiop',
            password_confirmation: 'qwertyuiop'
          }
        }
      },
      requestActionType: 'GET_TEST',
      successActionType: 'SET_TEST',
      errorActionType: 'SET_ERROR'
    }
    const fn = apiActions.postEndpoint(request)
    const dispatch = jest.fn()
    const getState = jest.fn()

    // Act
    fn(dispatch, getState)

    stub.restore()

    // Assert
    it('should error and return the errors', async () => {
      expect(dispatch).toHaveBeenCalledWith({ type: 'GET_TEST' })
      expect(dispatch).toHaveBeenCalledWith({ 'payload': { 'error': { 'data': [{ 'code': '404', 'detail': 'Wrong email/reference/token or password', 'status': '404', 'title': 'Record not found' }] } }, 'type': 'SET_ERROR' })
    })
  })

  describe('posting a request which returns a 422', () => {
    const stub = sinon.stub(ApiClient.prototype, 'post').callsFake(async () => {
      return post422
    })

    // Arrange
    const request = {
      endpoint: `/testEndpoint`,
      body: {
        data: {
          type: 'customer_accounts',
          attributes: {
            email: 'a.fletcher1234@gmail.com',
            email_confirmation: 'a.fletcher1234@gmail.com',
            password: 'qwertyuiop',
            password_confirmation: 'qwertyuiop'
          }
        }
      },
      requestActionType: 'GET_TEST',
      successActionType: 'SET_TEST',
      errorActionType: 'SET_ERROR'
    }
    const fn = apiActions.postEndpoint(request)
    const dispatch = jest.fn()
    const getState = jest.fn()

    // Act
    fn(dispatch, getState)

    stub.restore()

    // Assert
    it('should error and return the errors', async () => {
      expect(dispatch).toHaveBeenCalledWith({ type: 'GET_TEST' })
      expect(dispatch).toHaveBeenCalledWith({ 'payload': { 'error': { 'data': [{ 'code': '100', 'detail': 'password - is too short (minimum is 8 characters)', 'source': { 'pointer': '/data/attributes/password' }, 'status': '422', 'title': 'is too short (minimum is 8 characters)' }] } }, 'type': 'SET_ERROR' })
    })
  })
})
