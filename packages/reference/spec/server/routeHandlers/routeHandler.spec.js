import { getRenderer } from '../../../server/routeHandlers/routeHandler'
import { fetchData } from '../../../server/lib/ApiServer'

jest.mock('../../../server/lib/ApiServer')

describe('getRenderer', () => {
  it('should preserve the response status', async () => {
    fetchData.mockImplementation((req, res) => ({
      status: 500,
      data: 'error!'
    }))

    const req = { params: {} }
    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    await getRenderer('/some_failing_url')(req, res)

    expect(res.status.mock.calls[0][0]).toBe(500)
  })
})
