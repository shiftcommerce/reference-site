import { getRenderer } from '../../../server/routeHandlers/routeHandler'
jest.mock('../../../server/lib/ApiServer')
import { fetchData } from '../../../server/lib/ApiServer'

describe('getRenderer', () => {
  it('should preserve the response status', async () => {
    fetchData.mockImplementation((req, res) => ({
      status: 500,
      data: "error!"
    }))

    const req = {params: {}}
    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    const response = await getRenderer("/some_failing_url")(req, res)
    expect(res.status.mock.calls[0][0]).toBe(500)
  })
})
