import axios from 'axios'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'

// Handler
import { createOrderRenderer } from '../../../server/route-handlers/order-route-handler'

// Constants
import { platform } from '../../../server/constants/api-urls'

// Fixtures
import createOrderResponse from '../../fixtures/create-order-response'
import createOrderResponseInvalid from '../../fixtures/create-order-response-invalid'

axios.defaults.adapter = httpAdapter

const url = `/${platform.CreateOrderUrl}?include=line_items`

describe('createOrderRenderer', () => {
  describe('with valid data', () => {
    it('should create an order with valid data', async () => {
      const body = {
        data: {
          type: 'create_order',
          attributes: {
            billing_address: { },
            channel: 'web',
            currency: 'GBP',
            email: 'guest@order.com',
            ip_address: '1.1.1.1',
            line_items_resources: [],
            shipping_address: { },
            shipping_method: { },
            discount_summaries: [],
            sub_total: 19.45,
            total: 19.45,
            placed_at: '2018-10-31T14:37:34.113Z',
            payment_transactions_resources: []
          }
        }
      }

      const req = {
        body: body
      }

      const res = {
        status: jest.fn(x => ({
          send: jest.fn(y => y)
        }))
      }

      nock(process.env.API_HOST)
        .post(url, body)
        .reply(201, createOrderResponse)

      const response = await createOrderRenderer()(req, res)

      expect(response.data.type).toBe('create_order')
      expect(response.data.attributes.email).toBe('guest@order.com')
      expect(response.data.attributes.ip_address).toBe('1.1.1.1')
    })
  })

  describe('with invalid data', () => {
    it('should return an error', async () => {
      const body = {
        data: { }
      }

      const req = {
        body: body
      }

      const res = {
        status: jest.fn(x => ({
          send: jest.fn(y => y)
        }))
      }

      console.error = jest.fn()

      nock(process.env.API_HOST)
        .post(url, body)
        .reply(422, createOrderResponseInvalid)

      const response = await createOrderRenderer()(req, res)

      expect(res.status).toHaveBeenCalledWith(422)
      expect(response.errors[0].status).toBe('422')
      expect(response.errors[0].detail).toBe('Invalid payload')
    })
  })
})
