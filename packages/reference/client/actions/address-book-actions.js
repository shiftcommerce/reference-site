// actionTypes
import * as actionTypes from './action-types'

// Actions
import { readEndpoint, postEndpoint, deleteEndpoint } from './api-actions'

export function saveToAddressBook (address) {
  const request = {
    endpoint: '/createAddress',
    body: newAddressBookEntryPayload(address),
    successActionType: actionTypes.SET_ADDRESS_BOOK_ENTRY
  }
  return postEndpoint(request)
}

export function fetchAddressBook () {
  const request = {
    endpoint: '/addressBook',
    successActionType: actionTypes.SET_ADDRESS_BOOK
  }
  return readEndpoint(request)
}

export function deleteAddressBookEntry (address) {
  const request = {
    endpoint: `/deleteAddress/${address.id}`,
    requestActionType: actionTypes.DELETE_ADDRESS,
    requestActionData: {
      addressId: address.id
    }
  }
  return deleteEndpoint(request)
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