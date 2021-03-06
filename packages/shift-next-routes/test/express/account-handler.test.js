// Libraries
const nock = require('nock')
const { SHIFTClient } = require('@shiftcommerce/shift-node-api')

// Account handler
const { getAccount,
  loginAccount,
  registerAccount,
  getCustomerOrders,
  updateCustomerAccount,
  updateAddress
} = require('../../src/express/account-handler')

// Fixtures
const loginAccountPayload = require('../fixtures/login-account')
const registerPayload = require('../fixtures/register-account')
const registerInvalidPayload = require('../fixtures/register-invalid')
const omsResponse = require('../fixtures/oms-response')
const omsResponseParsed = require('../fixtures/oms-response-parsed')

// Config
const { shiftApiConfig } = require('@shiftcommerce/shift-node-api')

beforeAll(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant',
    omsHost: 'http://oms.example.com',
    servicesSharedSecret: 'super_secret'
  })
})

afterAll(() => {
  shiftApiConfig.reset()
})

afterEach(() => { nock.cleanAll() })

describe('getAccount()', () => {
  test('returns an empty response when customerId is not in the session', async () => {
    const req = { session: {} }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    const response = await getAccount(req, res)
    expect(response).toEqual({})
  })

  test('returns the account data', async () => {
    const accountData = {
      id: '10',
      attributes: {
        key: 'value'
      }
    }

    // because axios.defaults.adapter = httpAdapter isnt working we are having to nock the options request that axios makes
    nock(process.env.API_HOST)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Authorization' })
      .options('/test_tenant/v1/customer_accounts/10')
      .query(true)
      .reply(200)

    nock(process.env.API_HOST)
      .get('/test_tenant/v1/customer_accounts/10')
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

describe('loginAccount()', () => {
  describe('with valid data', () => {
    const body = {
      data: {
        type: 'customer_account_authentications',
        attributes: {
          email: 'a.fletcher1234@gmail.com',
          password: 'qwertyuiop'
        }
      }
    }

    test('should log the user in and update their guest cart', async () => {
      const req = {
        body: body,
        session: {},
        signedCookies: {
          cart: '123'
        }
      }

      const res = {
        status: jest.fn(x => ({
          send: jest.fn(y => y)
        }))
      }

      const expectedCartUpdatePayload = {
        data: {
          type: 'carts',
          attributes: {
            customer_account_id: '23063264'
          }
        }
      }

      // because axios.defaults.adapter = httpAdapter isnt working we are having to nock the options request that axios makes
      nock(process.env.API_HOST)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Authorization' })
        .options('/test_tenant/v1/customer_account_authentications')
        .query(true)
        .reply(200)

      nock(process.env.API_HOST)
        .post('/test_tenant/v1/customer_account_authentications')
        .reply(201, loginAccountPayload)

      // because axios.defaults.adapter = httpAdapter isnt working we are having to nock the options request that axios makes
      nock(process.env.API_HOST)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Authorization' })
        .options('/test_tenant/v1/carts/123')
        .query(true)
        .reply(200)

      const updateCartMock = nock(process.env.API_HOST)
        .patch(`/${process.env.API_TENANT}/v1/carts/123`, expectedCartUpdatePayload)
        .reply(200, { customer_account: 'customer_account_data' })

      const response = await loginAccount(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(response.data.id).toBe('6699f1eb-ac8a-442c-87ea-a814affa5389')
      expect(response.data.type).toBe('customer_account_authentications')
      expect(response.data.attributes.email).toBe('a.fletcher1234@gmail.com')
      expect(response.data.attributes.password).toBe('qwertyuiop')
      expect(response.data.relationships.customer_account.data.id).toBe('23063264')
      expect(req.session.customerId).toBe('23063264')
      expect(updateCartMock.isDone()).toBe(true)
    })
  })
})

describe('registerAccount()', () => {
  describe('with valid data', () => {
    const body = {
      data: {
        type: 'customer_accounts',
        attributes: {
          email: 'a.fletcher1234@gmail.com',
          email_confirmation: 'a.fletcher1234@gmail.com',
          password: 'qwertyuiop',
          password_confirmation: 'qwertyuiop',
          first_name: 'a',
          last_name: 'fletcher'
        }
      }
    }

    test('should create the account, log the user in and upadte their cart', async () => {
      const req = {
        body: body,
        session: {},
        signedCookies: {
          cart: '123'
        }
      }

      const res = {
        status: jest.fn(x => ({
          send: jest.fn(y => y)
        }))
      }

      const expectedCartUpdatePayload = {
        data: {
          type: 'carts',
          attributes: {
            customer_account_id: '23063267'
          }
        }
      }

      // because axios.defaults.adapter = httpAdapter isnt working we are having to nock the options request that axios makes
      nock(process.env.API_HOST)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Authorization' })
        .options('/test_tenant/v1/customer_accounts')
        .query(true)
        .reply(200)

      nock(process.env.API_HOST)
        .post('/test_tenant/v1/customer_accounts')
        .reply(201, registerPayload)

      // because axios.defaults.adapter = httpAdapter isnt working we are having to nock the options request that axios makes
      nock(process.env.API_HOST)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Authorization' })
        .options('/test_tenant/v1/carts/123')
        .query(true)
        .reply(200)

      const updateCartMock = nock(process.env.API_HOST)
        .patch(`/${process.env.API_TENANT}/v1/carts/123`, expectedCartUpdatePayload)
        .reply(200, { customer_account: 'customer_account_data' })

      const response = await registerAccount(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(response.data.id).toBe('23063267')
      expect(response.data.type).toBe('customer_accounts')
      expect(response.data.attributes.email).toBe('a.fletcher1234@gmail.com')
      expect(response.data.attributes.meta_attributes.first_name.value).toBe('a')
      expect(response.data.attributes.meta_attributes.last_name.value).toBe('fletcher')
      expect(req.session.customerId).toBe('23063267')
      expect(updateCartMock.isDone()).toEqual(true)
    })
  })

  describe('with invalid data', () => {
    const body = {
      data: {
        type: 'customer_accounts',
        attributes: {
          email: 'a.fletcher1234@gmail.com',
          email_confirmation: 'a.fletcher1234@gmail.com',
          password: 'qwe',
          password_confirmation: 'qwe'
        }
      }
    }

    test('should return an error', async () => {
      // because axios.defaults.adapter = httpAdapter isnt working we are having to nock the options request that axios makes
      nock(process.env.API_HOST)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Authorization' })
        .options('/test_tenant/v1/customer_accounts')
        .query(true)
        .reply(200)

      nock(process.env.API_HOST)
        .post('/test_tenant/v1/customer_accounts')
        .reply(422, registerInvalidPayload)

      const req = {
        body: body,
        session: {}
      }

      const res = {
        status: jest.fn(x => ({
          send: jest.fn(y => y)
        }))
      }

      const response = await registerAccount(req, res)
      expect(response[0].status).toBe('422')
      expect(response[0].title).toBe('is too short (minimum is 8 characters)')
      expect(response[0].detail).toBe('password - is too short (minimum is 8 characters)')
    })
  })
})

describe('getCustomerOrders()', () => {
  test('returns the account data', async () => {
    // because axios.defaults.adapter = httpAdapter isnt working we are having to nock the options request that axios makes
    nock(shiftApiConfig.get().omsHost)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Authorization' })
      .options(true)
      .reply(200)

    nock(shiftApiConfig.get().omsHost)
      .get('/oms/v1/customer_orders/')
      .query(true)
      .reply(200, omsResponse)

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
    const response = await getCustomerOrders(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(200)
    expect(response.data).toEqual(omsResponseParsed)
  })
})

describe('updateCustomerAccount()', () => {
  test('returns an unauthorized response when customerId is not in the session', async () => {
    const req = { session: {} }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    const response = await updateCustomerAccount(req, res)
    expect(response).toEqual({})
    expect(res.status).toHaveBeenCalledWith(401)
  })

  test('returns the updated account data when successful', async () => {
    const updateSpy = jest.spyOn(SHIFTClient, 'updateCustomerAccountV1').mockImplementation(() => ({
      status: 200,
      data: 'updated account data'
    }))

    const req = {
      session: {
        customerId: 10
      },
      body: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'email@example.com',
        mobilePhone: '07123456789',
        day: '10',
        month: 'January',
        year: '2000'
      }
    }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    const expectedPayload = {
      data: {
        type: 'customer_accounts',
        attributes: {
          meta_attributes: {
            first_name: {
              value: 'First name',
              data_type: 'string'
            },
            last_name: {
              value: 'Last name',
              data_type: 'string'
            },
            mobile_phone: {
              value: '07123456789',
              data_type: 'string'
            },
            date_of_birth: {
              value: '10/January/2000',
              data_type: 'string'
            }
          },
          email: 'email@example.com'
        }
      }
    }

    const response = await updateCustomerAccount(req, res)
    expect(updateSpy).toHaveBeenCalledWith(expectedPayload, 10)
    expect(response).toEqual('updated account data')
    expect(res.status).toHaveBeenCalledWith(200)

    updateSpy.mockRestore()
  })

  test('returns errors when no email is submitted', async () => {
    function RequestException (obj) {
      this.response = obj.response
    }

    const updateSpy = jest.spyOn(SHIFTClient, 'updateCustomerAccountV1').mockImplementation(() => {
      throw new RequestException({
        response: {
          status: 404,
          data: {
            errors: 'request errors'
          }
        }
      })
    })

    const req = {
      session: {
        customerId: 10
      },
      body: 'update body'
    }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    const expectedPayload = {
      data: {
        type: 'customer_accounts',
        attributes: {
          meta_attributes: {
            first_name: {
              value: undefined,
              data_type: 'string'
            },
            last_name: {
              value: undefined,
              data_type: 'string'
            },
            mobile_phone: {
              value: undefined,
              data_type: 'string'
            },
            date_of_birth: {
              value: 'undefined/undefined/undefined',
              data_type: 'string'
            }
          },
          email: undefined
        }
      }
    }

    const response = await updateCustomerAccount(req, res)
    expect(updateSpy).toHaveBeenCalledWith(expectedPayload, 10)
    expect(response).toEqual('request errors')
    expect(res.status).toHaveBeenCalledWith(404)

    updateSpy.mockRestore()
  })
})

describe('updateAddress()', () => {
  test('returns an unauthorized response when customerId is not in the session', async () => {
    const req = { session: {} }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    const response = await updateAddress(req, res)
    expect(response).toEqual({})
    expect(res.status).toHaveBeenCalledWith(401)
  })

  test('returns the updated address data when successful', async () => {
    const updateSpy = jest.spyOn(SHIFTClient, 'updateCustomerAddressV1').mockImplementation(() => ({
      status: 200,
      data: 'updated address data'
    }))

    const req = {
      session: {
        customerId: 10
      },
      params: {
        addressId: 20
      },
      body: {
        first_name: 'First name'
      }
    }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    const response = await updateAddress(req, res)
    expect(updateSpy).toHaveBeenCalledWith({ first_name: 'First name' }, 20, 10)
    expect(response).toEqual('updated address data')
    expect(res.status).toHaveBeenCalledWith(200)

    updateSpy.mockRestore()
  })

  test('returns errors when request fails', async () => {
    function RequestException (obj) {
      this.response = obj.response
    }

    const updateSpy = jest.spyOn(SHIFTClient, 'updateCustomerAddressV1').mockImplementation(() => {
      throw new RequestException({
        response: {
          status: 404,
          data: {
            errors: 'request errors'
          }
        }
      })
    })

    const req = {
      session: {
        customerId: 10
      },
      params: {
        addressId: 20
      },
      body: {
        first_name: 'First name'
      }
    }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn(y => y)
      }))
    }

    const response = await updateAddress(req, res)
    expect(updateSpy).toHaveBeenCalledWith({ first_name: 'First name' }, 20, 10)
    expect(response).toEqual('request errors')
    expect(res.status).toHaveBeenCalledWith(404)

    updateSpy.mockRestore()
  })
})
