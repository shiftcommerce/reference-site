import nock from 'nock'

// Handler
import { orderHistoryRenderer } from '../../../server/route-handlers/order-history-route-handler'

// Request
import { orderHistoryRequest } from '../../../client/requests/order-history-request'

// Constants
import { oms } from '../../../server/constants/api-urls'

// Fixtures
import orderHistoryPayload from '../../fixtures/order-history-index'

describe('orderHistoryRenderer', () => {
  it('should pass the customerId from session cookie', async () => {
    const customerId = '123456'

    const req = {
      query: orderHistoryRequest.query,
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
      .get(`/${oms.orderHistoryUrl}`)
      .query(true)
      .reply(201, { data: orderHistoryPayload })

    const response = await orderHistoryRenderer(oms.orderHistoryUrl)(req, res)

    expect(response.data[0].id).toBe('013affd4-eed2-4fa9-8cad-7a0473368ae0')
    expect(response.data[0].attributes.account_reference).toBe('shiftacc')
  })
})
