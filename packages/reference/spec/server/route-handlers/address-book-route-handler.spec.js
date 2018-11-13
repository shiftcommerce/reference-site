import {
  addressBookRenderer,
  postAddressRenderer,
  deleteAddressRenderer
} from '../../../server/route-handlers/address-book-route-handler'

// Mock out api server
import * as apiServer from '../../../server/lib/api-server'
jest.mock('../../../server/lib/api-server')

describe('addressBookRender', () => {
  test('inserts the customer id into the url', async () => {
    apiServer.fetchData.mockImplementation(() => ({
      status: 201,
      data: 'data'
    }))

    const req = {
      session: {
        customerId: 99
      }
    }

    const res = {
      status: jest.fn(() => ({
        send: jest.fn()
      }))
    }

    await addressBookRenderer('customer/:customer_account_id/addressBook')(req, res)

    expect(apiServer.fetchData).toHaveBeenCalledWith({}, 'customer/99/addressBook')
  })

  test('returns a correct response when the api returns a 201', async () => {
    apiServer.fetchData.mockImplementation(() => ({
      status: 201,
      data: {
        data: 'data'
      }
    }))

    const req = {
      session: {
        customerId: 99
      }
    }

    const resSend = jest.fn()
    const res = {
      status: jest.fn(() => ({
        send: resSend
      }))
    }

    await addressBookRenderer('customer/:customer_account_id/addressBook')(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(resSend).toHaveBeenCalledWith('data')
  })

  test('returns response errors when the api responds with a 422', async () => {
    apiServer.fetchData.mockImplementation(() => ({
      status: 422,
      data: {
        errors: 'errors'
      }
    }))

    const req = {
      session: {
        customerId: 99
      }
    }

    const resSend = jest.fn()
    const res = {
      status: jest.fn(() => ({
        send: resSend
      }))
    }

    await addressBookRenderer('customer/:customer_account_id/addressBook')(req, res)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(resSend).toHaveBeenCalledWith('errors')
  })

  test('returns response data when the api errors with a 5xx', async () => {
    apiServer.fetchData.mockImplementation(() => ({
      status: 503,
      data: {
        data: 'data'
      }
    }))

    const req = {
      session: {
        customerId: 99
      }
    }

    const resSend = jest.fn()
    const res = {
      status: jest.fn(() => ({
        send: resSend
      }))
    }

    await addressBookRenderer('customer/:customer_account_id/addressBook')(req, res)

    expect(res.status).toHaveBeenCalledWith(503)
    expect(resSend).toHaveBeenCalledWith({ data: 'data' })
  })
})

describe('postAddressRenderer', () => {
  test('inserts customer id into the request body', async () => {
    apiServer.postData.mockImplementation(() => ({
      status: 201,
      data: 'data'
    }))

    const req = {
      body: {
        data: {
          attributes: {}
        }
      },
      session: {
        customerId: 100
      }
    }

    const res = {
      status: jest.fn(() => ({
        send: jest.fn()
      }))
    }

    await postAddressRenderer('addresses')(req, res)

    expect(apiServer.postData).toHaveBeenCalledWith({
      data: {
        attributes: {
          customer_account_id: 100
        }
      }
    }, 'addresses')
  })

  test('returns the status and response returned by the api', async () => {
    apiServer.postData.mockImplementation(() => ({
      status: 999,
      data: 'data'
    }))

    const req = {
      body: {
        data: {
          attributes: {}
        }
      },
      session: {
        customerId: 100
      }
    }

    const resSend = jest.fn()
    const res = {
      status: jest.fn(() => ({
        send: resSend
      }))
    }

    await postAddressRenderer('addresses')(req, res)

    expect(res.status).toHaveBeenCalledWith(999)
    expect(resSend).toHaveBeenCalledWith('data')
  })
})

describe('deleteAddressRenderer', () => {
  test('copies the address id from the f/e proxy url into the b/e url', async () => {
    apiServer.deleteData.mockImplementation(() => ({
      status: 204,
      data: 'data'
    }))

    const req = {
      url: 'addresses/24'
    }

    const res = {
      status: jest.fn(() => ({
        send: jest.fn()
      }))
    }

    await deleteAddressRenderer('v1/addresses/:address_id')(req, res)

    expect(apiServer.deleteData).toHaveBeenCalledWith('v1/addresses/24')
  })

  test('returns a correct response when the api returns a 204', async () => {
    apiServer.deleteData.mockImplementation(() => ({
      status: 204,
      data: {
        data: 'data'
      }
    }))

    const req = {
      url: 'addresses/24'
    }

    const resSend = jest.fn()
    const res = {
      status: jest.fn(() => ({
        send: resSend
      }))
    }

    await deleteAddressRenderer('v1/addresses/:address_id')(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(resSend).toHaveBeenCalledWith('data')
  })

  test('returns response errors when the api responds with a 422', async () => {
    apiServer.deleteData.mockImplementation(() => ({
      status: 422,
      data: {
        errors: 'errors'
      }
    }))

    const req = {
      url: 'addresses/24'
    }

    const resSend = jest.fn()
    const res = {
      status: jest.fn(() => ({
        send: resSend
      }))
    }

    await deleteAddressRenderer('v1/addresses/:address_id')(req, res)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(resSend).toHaveBeenCalledWith('errors')
  })

  test('returns response data when the api errors with a 5xx', async () => {
    apiServer.deleteData.mockImplementation(() => ({
      status: 503,
      data: {
        data: 'data'
      }
    }))

    const req = {
      url: 'addresses/24'
    }

    const resSend = jest.fn()
    const res = {
      status: jest.fn(() => ({
        send: resSend
      }))
    }

    await deleteAddressRenderer('v1/addresses/:address_id')(req, res)

    expect(res.status).toHaveBeenCalledWith(503)
    expect(resSend).toHaveBeenCalledWith({ data: 'data' })
  })
})
