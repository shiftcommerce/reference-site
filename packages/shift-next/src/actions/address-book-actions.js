// actionTypes
import * as actionTypes from './action-types'

// Actions
import { readEndpoint, postEndpoint, deleteEndpoint } from './api-actions'

export function saveToAddressBook (address, params = {}, options) {
  const request = {
    endpoint: '/createAddressBookEntry',
    body: newAddressBookEntryPayload(address),
    successActionType: params.billing ? actionTypes.SET_ADDRESS_BOOK_ENTRY_BILLING : actionTypes.SET_ADDRESS_BOOK_ENTRY_SHIPPING
  }
  return postEndpoint(request, options)
}

export function fetchAddressBook (options) {
  const request = {
    endpoint: '/getAddressBook',
    successActionType: actionTypes.SET_ADDRESS_BOOK
  }
  return readEndpoint(request, options)
}

export function updateAddress (id, addressData, options) {
  const request = {
    endpoint: `/updateAddress/${id}`,
    body: newAddressBookEntryPayload(addressData)
  }
  return postEndpoint(request, options)
}

export function deleteAddressBookEntry (address, options) {
  const request = {
    endpoint: `/deleteAddress/${address.id}`,
    requestActionType: actionTypes.DELETE_ADDRESS,
    requestActionData: {
      addressId: address.id
    }
  }
  return deleteEndpoint(request, options)
}

export function setAddress (address, formName) {
  return {
    type: actionTypes.SET_ADDRESS,
    address: address,
    formName: formName
  }
}

function newAddressBookEntryPayload (address) {
  return {
    data: {
      type: 'addresses',
      attributes: {
        first_name: address.first_name,
        last_name: address.last_name,
        address_line_1: address.line_1,
        address_line_2: address.line_2,
        city: address.city,
        state: address.state,
        country: address.country_code,
        postcode: address.zipcode,
        preferred_billing: address.preferred_billing,
        preferred_shipping: address.preferred_shipping,
        meta_attributes: addressMetaAttributes(address)
      }
    }
  }
}

function addressMetaAttributes (address) {
  return {
    label: {
      value: address.label
    },
    company_name: {
      value: address.companyName
    },
    phone_number: {
      value: address.primary_phone
    },
    email: {
      value: address.email
    }
  }
}
