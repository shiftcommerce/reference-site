// Libraries
const axios = require('axios')
const nock = require('nock')
const httpAdapter = require('axios/lib/adapters/http')

// Account handler
const { getAccount } = require('../../express/account-handler')

axios.defaults.adapter = httpAdapter

afterEach(() => { nock.cleanAll() })

describe('getAccount()', () => {
  it('returns an empty response when customerId is not in the session', async () => {
    const req = { session: {} }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    const response = await getAccount(req, res)
    expect(response).toEqual({})
  })

  it('returns the account data', async () => {
    const accountData = {
      id: '10',
      attributes: {
        key: 'value'
      }
    }

    nock(process.env.API_HOST)
      .get(`/test_tenant/v1/customer_accounts/10`)
      .query(true)
      .reply(200, { data: accountData })

    const req = {
      session: {
        customerId: 10
      }
    }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    // Act
    const response = await getAccount(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(200)
    expect(response.data).toEqual(accountData)
  })
})
