import { getRenderer } from '../../../server/route-handlers/route-handler'
import { fetchData } from '../../../server/lib/api-server'

jest.mock('../../../server/lib/api-server')

describe('getRenderer', () => {
  it('should generate a query with an id if parameter is present', async () => {
    fetchData.mockImplementation((req, res) => ({
      status: 200,
      data: 'response'
    }))

    const url = '/some_fake_url'

    const req = {
      query: {
        test: 'a'
      },
      params: {
        id: '1001'
      }
    }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    await getRenderer(url)(req, res)

    expect(res.status.mock.calls[0][0]).toBe(200)
    expect(fetchData).toBeCalledWith(req.query, `${url}/${req.params.id}`)
  })

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
