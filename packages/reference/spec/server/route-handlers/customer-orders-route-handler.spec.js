import nock from 'nock'

// Handler
import { customerOrdersRenderer } from '../../../server/route-handlers/customer-orders-route-handler'

// Request
import { customerOrdersRequest } from '../../../client/requests/customer-orders-request'

// Constants
import { oms } from '../../../server/constants/api-urls'

// Fixtures
import customerOrdersPayload from '../../fixtures/customer-orders-index'

describe('customerOrdersRenderer', () => {
  it('should pass the customerId from session cookie', async () => {
    const customerId = '123456'

    const req = {
      query: customerOrdersRequest.query,
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
      .reply(201, { data: customerOrdersPayload })

    const response = await customerOrdersRenderer(oms.customerOrdersUrl)(req, res)

    expect(response.data[0].id).toBe('013affd4-eed2-4fa9-8cad-7a0473368ae0')
    expect(response.data[0].attributes.account_reference).toBe('shiftacc')
  })
})
