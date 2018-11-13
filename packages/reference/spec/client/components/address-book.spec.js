// Libraries
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import AddressBook from '../../../client/components/address-book'
import ApiClient from '../../../client/lib/api-client'

// Reducers
import rootReducer from '../../../client/reducers/root-reducer'
import { checkoutInitialState } from '../../../client/reducers/set-checkout'

// Fixtures
import addressBookData from '../../fixtures/address-book'

// Mock out ApiClient
jest.mock('../../../client/lib/api-client')

test('it renders given addresses correctly', () => {
  // Initialize Redux store with address book data
  const store = createStore(rootReducer, {
    checkout: Object.assign(checkoutInitialState, {
      addressBook: addressBookData
    })
  })

  // Mount the address book component wrapped in the store provider
  const component = mount(
    <Provider store={store}>
      <AddressBook addressBook={addressBookData} />
    </Provider>
  )

  // Check address 1 is correctly rendered
  expect(component).toIncludeText('Bernard Houseman')
  expect(component).toIncludeText('84 West Quay Street')
  expect(component).toIncludeText('Top floor')
  expect(component).toIncludeText('Blackpool')
  expect(component).toIncludeText('LS27EY')
  expect(component).toIncludeText('GB')

  // Check address 2 is correctly rendered
  expect(component).toIncludeText('Bob Doe')
  expect(component).toIncludeText('20 Cardigan Lane')
  expect(component).toIncludeText('Morley')
  expect(component).toIncludeText('Leeds')
  expect(component).toIncludeText('West Yorkshire')
  expect(component).toIncludeText('LS27EY')
  expect(component).toIncludeText('GB')
  expect(component).toIncludeText('Grandmas house')
  expect(component).toIncludeText('bob@example.com')
  expect(component).toIncludeText('07510756423')
  expect(component).toIncludeText('Team 18')
})

test('selecting an address populates address in redux state', () => {
  // Initialize Redux store with address book data
  const store = createStore(rootReducer, {
    checkout: Object.assign(checkoutInitialState, {
      addressBook: addressBookData
    })
  })

  // Mount the address book component wrapped in the store provider
  // Pretend the address book is displayed for the shipping address
  const component = mount(
    <Provider store={store}>
      <AddressBook formName='shippingAddress' onClose={() => {}}/>
    </Provider>
  )

  // Select the last address in the book
  component.find({ status: 'primary' }).last().prop('onClick')()

  // Check the Redux store has been correctly populated
  const updatedShippingAddress = store.getState().checkout.shippingAddress
  expect(updatedShippingAddress.first_name).toEqual('Bob')
  expect(updatedShippingAddress.last_name).toEqual('Doe')
  expect(updatedShippingAddress.companyName).toEqual('Team 18')
  expect(updatedShippingAddress.companyNameShown).toEqual(true)
  expect(updatedShippingAddress.line_1).toEqual('20 Cardigan Lane')
  expect(updatedShippingAddress.line_2).toEqual('Morley')
  expect(updatedShippingAddress.address2Shown).toEqual(true)
  expect(updatedShippingAddress.zipcode).toEqual('LS27EY')
  expect(updatedShippingAddress.city).toEqual('Leeds')
  expect(updatedShippingAddress.state).toEqual('West Yorkshire')
  expect(updatedShippingAddress.primary_phone).toEqual('07510756423')
  expect(updatedShippingAddress.email).toEqual('bob@example.com')
})

test('deleteing an address removes it from the address book', async () => {
  // Mocked delete method - always returns a 204 response
  const mockedDelete = jest.fn(() => Promise.resolve({ status: 204 }))

  // Mock out the API client to simulate successful delete
  ApiClient.mockImplementation(() => {
    return {
      delete: mockedDelete
    }
  })

  // Initialize Redux store, this spec require thunk to handle API calls
  const store = createStore(rootReducer, {
    checkout: Object.assign(checkoutInitialState, {
      addressBook: addressBookData
    })
  }, applyMiddleware(thunk))

  // Mount the component wrapped up in the store provider
  const component = mount(
    <Provider store={store}>
      <AddressBook formName='shippingAddress' onClose={() => {}}/>
    </Provider>
  )

  // Click on the first address's delete button
  await component.find({ label: 'Delete' }).first().prop('onClick')()

  // Check that the address has been removed from the store
  const updatedAddressBook = store.getState().checkout.addressBook
  expect(updatedAddressBook.length).toEqual(1)

  // Check that the API call to delete the address has been triggered
  expect(mockedDelete).toHaveBeenCalledTimes(1)
})
