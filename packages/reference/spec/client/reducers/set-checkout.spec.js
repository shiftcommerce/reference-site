import setCheckout, { checkoutInitialState } from '../../../client/reducers/set-checkout'
import * as actionTypes from '../../../client/actions/action-types'

test('returns empty on dispatching INITIALIZE_CHECKOUT action', () => {
  // Arrange
  const payload = {
    type: actionTypes.INITIATE_CHECKOUT
  }

  const expectedResult = Object.assign({}, checkoutInitialState)

  // Act
  const result = setCheckout({}, payload)

  // Assert
  expect(result).toEqual(expectedResult)
  expect(result.billingAddress.email).toBe('')
})

test('correctly updates the address form when an address is selected', () => {
  const action = {
    type: actionTypes.SET_ADDRESS,
    address: {
      // Only testing some attributes for brevity
      first_name: 'John',
      last_name: 'Doe',
      meta_attributes: {
        phone_number: {
          value: '123'
        },
        email: {
          value: 'john@example.com'
        }
      }
    },
    formName: 'billingAddress'
  }

  const currentState = {
    shippingAddress: {
      first_name: '',
      last_name: '',
      primary_phone: '',
      email: ''
    },
    billingAddress: {
      first_name: '',
      last_name: '',
      primary_phone: '',
      email: ''
    }
  }

  const updatedState = setCheckout(currentState, action)

  // Assert billing address gets correctly updated
  expect(updatedState.billingAddress.first_name).toEqual('John')
  expect(updatedState.billingAddress.last_name).toEqual('Doe')
  expect(updatedState.billingAddress.primary_phone).toEqual('123')
  expect(updatedState.billingAddress.email).toEqual('john@example.com')
  // Assert shipping address isn't touched
  expect(updatedState.shippingAddress.first_name).toEqual('')
  expect(updatedState.shippingAddress.last_name).toEqual('')
  expect(updatedState.shippingAddress.primary_phone).toEqual('')
  expect(updatedState.shippingAddress.email).toEqual('')
})

test('correctly populates the address book', () => {
  const action = {
    type: actionTypes.SET_ADDRESS_BOOK,
    payload: {
      data: 'address book data'
    }
  }

  const updatedState = setCheckout({}, action)

  expect(updatedState.addressBook).toBe('address book data')
})

test('correctly marks shipping addresses as not requiring saving after persisting', () => {
  const action = {
    type: actionTypes.SET_ADDRESS_BOOK_ENTRY_SHIPPING,
    payload: {
      id: 10
    }
  }

  const currentState = {
    shippingAddress: {
      saveToAddressBook: true
    },
    billingAddress: {
      saveToAddressBook: true
    }
  }

  const updatedState = setCheckout(currentState, action)

  expect(updatedState.shippingAddress.saveToAddressBook).toBe(false)
  expect(updatedState.shippingAddress.id).toEqual(10)
  expect(updatedState.billingAddress.saveToAddressBook).toBe(true)
})

test('correctly marks billing addresses as not requiring saving after persisting', () => {
  const action = {
    type: actionTypes.SET_ADDRESS_BOOK_ENTRY_BILLING,
    payload: {
      id: 10
    }
  }

  const currentState = {
    shippingAddress: {
      saveToAddressBook: true
    },
    billingAddress: {
      saveToAddressBook: true
    }
  }

  const updatedState = setCheckout(currentState, action)

  expect(updatedState.billingAddress.saveToAddressBook).toBe(false)
  expect(updatedState.billingAddress.id).toEqual(10)
  expect(updatedState.shippingAddress.saveToAddressBook).toBe(true)
})

test('correctly deletes addresses from the store', () => {
  const action = {
    type: actionTypes.DELETE_ADDRESS,
    data: {
      addressId: 10
    }
  }

  const currentState = {
    addressBook: [{ id: 9 }, { id: 10 }, { id: 11 }]
  }

  const updatedState = setCheckout(currentState, action)

  expect(updatedState.addressBook).toEqual([{ id: 9 }, { id: 11 }])
})

test('sets shipping address id when a shipping address is created', () => {
  const action = {
    type: actionTypes.SHIPPING_ADDRESS_CREATED,
    payload: {
      id: 10
    }
  }

  const currentState = {
    shippingAddress: {}
  }

  const updatedState = setCheckout(currentState, action)

  expect(updatedState.shippingAddress.id).toEqual(10)
})

test('sets billing address id when a billing address is created', () => {
  const action = {
    type: actionTypes.BILLING_ADDRESS_CREATED,
    payload: {
      id: 10
    }
  }

  const currentState = {
    billingAddress: {}
  }

  const updatedState = setCheckout(currentState, action)

  expect(updatedState.billingAddress.id).toEqual(10)
})
