// Shift-api client
const { SHIFTClient } = require('@shiftcommerce/shift-node-api')
const { isSecure } = require('../lib/util')
const { getSessionExpiryTime } = require('../lib/session')

const accountApiEndpointQuery = {
  fields: {
    customer_accounts: 'email,meta_attributes'
  }
}

module.exports = {
  getAccount: async (req, res) => {
    const { customerId } = req.session
    req.query = { ...req.query, ...accountApiEndpointQuery }

    if (!customerId) {
      return res.status(200).send({})
    }

    const response = await SHIFTClient.getAccountV1(req.query, customerId)

    switch (response.status) {
      case 404:
        return res.status(200).send({})
      case 422:
        req.log && req.log.debug({ status: response.status, errors: response.data.errors })
        return res.status(response.status).send(response.data.errors)
      default:
        return res.status(response.status).send(response.data)
    }
  },

  loginAccount: async (req, res) => {
    try {
      const response = await SHIFTClient.loginCustomerAccountV1(req.body)

      if (response.status === 201) {
        extractCustomerId(req, response.data.data)
        req.log && req.log.info(`Login by user ${req.session.customerId}`)
        await assignCartToUser(req, res)
      }

      return res.status(response.status).send(response.data)
    } catch (error) {
      return handleErrorResponse(error, req, res)
    }
  },

  registerAccount: async (req, res) => {
    try {
      const response = await SHIFTClient.createCustomerAccountV1(req.body)

      if (response.status === 201) {
        extractCustomerId(req, response.data.data)
        await assignCartToUser(req, res)
      }

      return res.status(response.status).send(response.data)
    } catch (error) {
      return handleErrorResponse(error, req, res)
    }
  },

  getCustomerOrders: async (req, res) => {
    const query = {
      filter: {
        account_reference: process.env.API_TENANT,
        customer_reference: req.session.customerId
      },
      fields: {
        customer_orders: 'account_reference,reference,placed_at,line_items,pricing,shipping_methods,shipping_addresses,discounts',
        line_items: 'quantity,sku,pricing,shipping_method,shipping_address,discounts',
        shipping_methods: 'label,price',
        shipping_addresses: 'name,company,lines,city,state,postcode,country',
        discounts: 'label,amount_inc_tax,coupon_code'
      },
      include: 'customer,shipping_methods,shipping_addresses,discounts,line_items,line_items.shipping_method,line_items.shipping_address,line_items.discounts'
    }

    const response = await SHIFTClient.getCustomerOrdersV1(query)

    switch (response.status) {
      case 404:
        return res.status(200).send({})
      case 422:
        return res.status(response.status).send(response.data.errors)
      default:
        return res.status(response.status).send(response.data)
    }
  },

  requestForgotPasswordEmail: async (req, res) => {
    const customerAccountEmail = req.query.email

    const emailResponse = await SHIFTClient.getCustomerAccountByEmailV1(customerAccountEmail)

    const passwordResetRequest = {
      data: {
        type: 'password_recoveries',
        attributes: {
          reset_link_with_placeholder: 'https://www.example.com/reset-password?email={{email}}&token={{token}}'
        }
      }
    }

    try {
      const response = await SHIFTClient.createPasswordRecoveryV1(emailResponse.data.id, passwordResetRequest)
      return res.status(response.status).send(response.data)
    } catch (error) {
      return handleErrorResponse(error, req, res)
    }
  },

  resetPassword: async (req, res) => {
    const request = req.body

    let getAccount = {}

    try {
      getAccount = await SHIFTClient.getCustomerAccountByTokenV1(req.body.data.attributes.token)
    } catch (error) {
      return handleErrorResponse(error, req, res)
    }

    try {
      const response = await SHIFTClient.updateCustomerAccountPasswordV1(getAccount.data.id, request)
      return res.status(response.status).send(response.data)
    } catch (error) {
      return handleErrorResponse(error, req, res)
    }
  },

  updateCustomerAccount: async (req, res) => {
    const { customerId } = req.session

    if (!customerId) {
      req.log && req.log.warn('update customer account request with no customerId in session')
      return res.status(401).send({})
    }

    const { firstName, lastName, email, mobilePhone, day, month, year } = req.body

    const body = {
      data: {
        type: 'customer_accounts',
        attributes: {
          meta_attributes: {
            first_name: {
              value: firstName,
              data_type: 'string'
            },
            last_name: {
              value: lastName,
              data_type: 'string'
            },
            mobile_phone: {
              value: mobilePhone,
              data_type: 'string'
            },
            date_of_birth: {
              value: `${day}/${month}/${year}`,
              data_type: 'string'
            }
          },
          email
        }
      }
    }

    try {
      const response = await SHIFTClient.updateCustomerAccountV1(body, customerId)

      return res.status(response.status).send(response.data)
    } catch (error) {
      return handleErrorResponse(error, req, res)
    }
  },

  updateAddress: async (req, res) => {
    const { customerId } = req.session

    if (!customerId) {
      req.log && req.log.warn('update customer address request with no customerId in session')
      return res.status(401).send({})
    }

    try {
      const response = await SHIFTClient.updateCustomerAddressV1(req.body, req.params.addressId, customerId)
      return res.status(response.status).send(response.data)
    } catch (error) {
      return handleErrorResponse(error, req, res)
    }
  }
}

function extractCustomerId (req, data) {
  if (data.type === 'customer_accounts') {
    req.session.customerId = data.id
  } else if (data.type === 'customer_account_authentications') {
    req.session.customerId = data.relationships.customer_account.data.id
  }
}

function handleErrorResponse(error,req, res) {
  const response = error.response
  switch (response.status) {
    case 404:
    case 422:
      req.log && req.log.debug({ status: response.status, errors: response.data.errors })
      return res.status(response.status).send(response.data.errors)
    default:
      return res.status(response.status).send(response.data)
  }
}

async function assignCartToUser (req, res) {
  if (!req.session.customerId) return
  const cartId = req.signedCookies.cart
  req.log && req.log.info({ msg: 'assigning cart to user', cartId, customerId: req.session.customerId })

  if (cartId) {
    await SHIFTClient.assignCartToCustomerV1(cartId, req.session.customerId)
  } else {
    const customerAccountResponse = await SHIFTClient.getAccountV1({}, req.session.customerId)

    res.cookie('cart', customerAccountResponse.data.included.find(i => i.type === 'carts').id, {
      signed: true,
      secure: isSecure(),
      expires: getSessionExpiryTime()
    })
  }
}
