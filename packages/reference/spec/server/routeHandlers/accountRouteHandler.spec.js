import axios from 'axios'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'

// fixtures
import registerPayload from '../../fixtures/register.fixture'
import registerInvalidPayload from '../../fixtures/registerInvalid.fixture'
import loginAccountPayload from '../../fixtures/loginAccount.fixture'
import loginAccountInvalidPayload from '../../fixtures/loginAccountInvalid.fixture'

axios.defaults.adapter = httpAdapter

describe('create an account', () => {
  describe('with valid data', () => {
    const url = '/register'

    const body = {
      data: {
        type: 'customer_accounts',
        attributes: {
          email: 'a.fletcher1234@gmail.com',
          email_confirmation: 'a.fletcher1234@gmail.com',
          password: 'qwertyuiop',
          password_confirmation: 'qwertyuiop'
        }
      }
    }

    it('should save and return the data', async () => {
      nock(process.env.API_HOST_PROXY)
        .post(url)
        .reply(201, registerPayload)

      const response = await axios({
        method: 'post',
        url: `${process.env.API_HOST_PROXY}${url}`,
        data: body
      })

      expect(response.status).toBe(201)
      expect(response.data.data.id).toBe('23063267')
      expect(response.data.data.type).toBe('customer_accounts')
      expect(response.data.data.attributes.email).toBe('a.fletcher1234@gmail.com')
    })
  })

  describe('with invalid data', () => {
    const url = '/register'

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
      nock(process.env.API_HOST_PROXY)
        .post(url)
        .reply(200, registerInvalidPayload)

      const response = await axios({
        method: 'post',
        url: `${process.env.API_HOST_PROXY}${url}`,
        data: body
      })

      expect(response.status).toBe(200)
      expect(response.data.errors[0].status).toBe('422')
      expect(response.data.errors[0].detail).toBe('password - is too short (minimum is 8 characters)')
    })
  })
})

describe('loggin into an account', () => {
  describe('with valid data', () => {
    const url = '/login'

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
      nock(process.env.API_HOST_PROXY)
        .post(url)
        .reply(201, loginAccountPayload)

      const response = await axios({
        method: 'post',
        url: `${process.env.API_HOST_PROXY}${url}`,
        data: body
      })

      expect(response.status).toBe(201)
      expect(response.data.data.id).toBe('6699f1eb-ac8a-442c-87ea-a814affa5389')
      expect(response.data.data.type).toBe('customer_account_authentications')
      expect(response.data.data.attributes.email).toBe('a.fletcher1234@gmail.com')
      expect(response.data.data.attributes.password).toBe('qwertyuiop')
    })
  })

  describe('with invalid data', () => {
    const url = '/login'

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
      nock(process.env.API_HOST_PROXY)
        .post(url)
        .reply(200, loginAccountInvalidPayload)

      const response = await axios({
        method: 'post',
        url: `${process.env.API_HOST_PROXY}${url}`,
        data: body
      })

      expect(response.status).toBe(200)
      expect(response.data.errors[0].status).toBe('404')
      expect(response.data.errors[0].detail).toBe('Wrong email/reference/token or password')
    })
  })
})
