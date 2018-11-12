import nock from 'nock'

// Handler
import { customerOrdersRenderer } from '../../../server/route-handlers/customer-orders-route-handler'

// Constants
import { oms } from '../../../server/constants/api-urls'

// Fixtures
import customerOrdersPayload from '../../fixtures/customer-orders-index'
import customerOrdersPayloadInvalid from '../../fixtures/customer-orders-index-invalid'

describe('customerOrdersRenderer', () => {
  let consoleSpy

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('should pass the customerId from session cookie', async () => {
    const customerId = '123456'

    const req = {
      session: {
        customerId
      }
    }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    nock(process.env.OMS_HOST)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/${oms.customerOrdersUrl}`)
      .query(true)
      .reply(201, customerOrdersPayload)

    const response = await customerOrdersRenderer(oms.customerOrdersUrl)(req, res)

    expect(response[0].id).toBe('013affd4-eed2-4fa9-8cad-7a0473368ae0')
    expect(response[0].attributes.account_reference).toBe('shiftacc')
  })

  it('should return JSON API errors when status code is 422 or 404', async () => {
    const req = {
      query: { },
      session: { }
    }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    nock(process.env.OMS_HOST)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/${oms.customerOrdersUrl}`)
      .query(true)
      .reply(422, customerOrdersPayloadInvalid)

    const response = await customerOrdersRenderer(oms.customerOrdersUrl)(req, res)

    expect(consoleSpy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(422)
    expect(response[0].status).toBe('422')
    expect(response[0].detail).toBe('No filter[customer_reference] specified')
  })

  it('should return the whole response when status code is unhandled', async () => {
    const req = {
      query: { },
      session: { }
    }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    const errorMessage = '500 Internal server error'

    nock(process.env.OMS_HOST)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/${oms.customerOrdersUrl}`)
      .query(true)
      .reply(500, errorMessage)

    const response = await customerOrdersRenderer(oms.customerOrdersUrl)(req, res)

    expect(consoleSpy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(response).toBe(errorMessage)
  })
})
