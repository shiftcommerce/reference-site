import axios from 'axios'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'

// fixtures
import registerPayload from '../../fixtures/register'
import registerInvalidPayload from '../../fixtures/register-invalid'
import loginAccountPayload from '../../fixtures/login-account'
import loginAccountInvalidPayload from '../../fixtures/login-account-invalid'

import { accountRenderer } from '../../../server/route-handlers/account-route-handler'

axios.defaults.adapter = httpAdapter

describe('create an account', () => {
  afterEach(() => { nock.cleanAll() })

  describe('with valid data', () => {
    const url = 'register'

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

    it('should save, return the data and log the user in', async () => {
      nock(process.env.API_HOST)
        .post(`/${url}`, body)
        .reply(201, registerPayload)

      const req = {
        body: body,
        session: {}
      }

      const res = {
        status: jest.fn(x => ({
          send: jest.fn(y => y)
        }))
      }

      const response = await accountRenderer(url)(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(response.data.id).toBe('23063267')
      expect(response.data.type).toBe('customer_accounts')
      expect(response.data.attributes.email).toBe('a.fletcher1234@gmail.com')
      expect(response.data.attributes.meta_attributes.first_name.value).toBe('a')
      expect(response.data.attributes.meta_attributes.last_name.value).toBe('fletcher')
      expect(req.session.customerId).toBe('23063267')
    })
  })

  describe('with invalid data', () => {
    const url = 'register'

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

    it('should return an error', async () => {
      nock(process.env.API_HOST)
        .post(`/${url}`, body)
        .reply(422, registerInvalidPayload)

      console.error = jest.fn()

      const req = {
        body: body,
        session: {}
      }

      const res = {
        status: jest.fn(x => ({
          send: jest.fn(y => y)
        }))
      }

      const response = await accountRenderer(url)(req, res)

      expect(res.status).toHaveBeenCalledWith(422)
      expect(response[0].status).toBe('422')
      expect(response[0].detail).toBe('password - is too short (minimum is 8 characters)')
      expect(console.error).toHaveBeenCalled()
    })
  })
})

describe('login into an account', () => {
  afterEach(() => { nock.cleanAll() })

  describe('with valid data', () => {
    const url = 'login'

    const body = {
      data: {
        type: 'customer_account_authentications',
        attributes: {
          email: 'a.fletcher1234@gmail.com',
          password: 'qwertyuiop'
        }
      }
    }

    it('should log the user in', async () => {
      nock(process.env.API_HOST)
        .post(`/${url}`, body)
        .reply(201, loginAccountPayload)

      const req = {
        body: body,
        session: {}
      }

      const res = {
        status: jest.fn(x => ({
          send: jest.fn(y => y)
        }))
      }

      const response = await accountRenderer(url)(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(response.data.id).toBe('6699f1eb-ac8a-442c-87ea-a814affa5389')
      expect(response.data.type).toBe('customer_account_authentications')
      expect(response.data.attributes.email).toBe('a.fletcher1234@gmail.com')
      expect(response.data.attributes.password).toBe('qwertyuiop')
      expect(req.session.customerId).toBe('6699f1eb-ac8a-442c-87ea-a814affa5389')
    })
  })

  describe('with invalid data', () => {
    const url = 'login'

    const body = {
      data: {
        type: 'customer_account_authentications',
        attributes: {
          email: 'a.fletcher9999@gmail.com',
          password: 'qwertyuiop'
        }
      }
    }

    it('should return an error', async () => {
      nock(process.env.API_HOST)
        .post(`/${url}`, body)
        .reply(404, loginAccountInvalidPayload)

      console.error = jest.fn()

      const req = {
        body: body,
        session: {}
      }

      const res = {
        status: jest.fn(x => ({
          send: jest.fn(y => y)
        }))
      }

      const response = await accountRenderer(url)(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(response[0].detail).toBe('Wrong email/reference/token or password')
      expect(req.session.customerId).toBe(undefined)
      expect(console.error).toHaveBeenCalled()
    })
  })
})
