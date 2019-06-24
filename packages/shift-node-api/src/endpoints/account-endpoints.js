const HTTPClient = require('../http-client')
const filterResponse = require('../lib/filter-response')

function getAccountV1 (queryObject, customerId) {
  return HTTPClient.get(`v1/customer_accounts/${customerId}`, queryObject).then(filterResponse)
}

function updateCustomerAccountV1 (body, customerAccountId) {
  return HTTPClient.patch(`v1/customer_accounts/${customerAccountId}`, body)
}

function createCustomerAccountV1 (account) {
  return HTTPClient.post('v1/customer_accounts', account).then(filterResponse)
}

function loginCustomerAccountV1 (account) {
  return HTTPClient.post('v1/customer_account_authentications', account).then(filterResponse)
}

function getCustomerOrdersV1 (query) {
  return HTTPClient.get('https://shift-oms-dev.herokuapp.com/oms/v1/customer_orders', query).then(filterResponse)
}

function getAddressBookV1 (customerAccountId, query) {
  return HTTPClient.get(`v1/customer_accounts/${customerAccountId}/addresses`, query)
}

function createAddressBookEntryV1 (body, customerAccountId) {
  return HTTPClient.post(`v1/customer_accounts/${customerAccountId}/addresses`, body)
}

function updateCustomerAddressV1 (body, addressId, customerAccountId) {
  return HTTPClient.patch(`v1/customer_accounts/${customerAccountId}/addresses/${addressId}`, body)
}

function deleteAddressV1 (addressId, customerAccountId) {
  return HTTPClient.delete(`v1/customer_accounts/${customerAccountId}/addresses/${addressId}`)
}

function getCustomerAccountByEmailV1 (email) {
  return HTTPClient.get(`v1/customer_accounts/email:${email}`)
}

function createPasswordRecoveryV1 (accountId, data) {
  return HTTPClient.post(`v1/customer_accounts/${accountId}/password_recovery`, data)
}

function getCustomerAccountByTokenV1 (token) {
  return HTTPClient.get(`v1/customer_accounts/token:${token}`)
}

function updateCustomerAccountPasswordV1 (accountId, body) {
  return HTTPClient.patch(`v1/customer_accounts/${accountId}/password_recovery`, body)
}

module.exports = {
  getAccountV1,
  updateCustomerAccountV1,
  createCustomerAccountV1,
  loginCustomerAccountV1,
  getCustomerOrdersV1,
  getAddressBookV1,
  createAddressBookEntryV1,
  deleteAddressV1,
  getCustomerAccountByEmailV1,
  createPasswordRecoveryV1,
  getCustomerAccountByTokenV1,
  updateCustomerAccountPasswordV1,
  updateCustomerAddressV1
}
