// Libraries
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// Components
import AddressBookWithRedux, { AddressBook } from '../../../client/components/address-book'
import ApiClient from '../../../client/lib/api-client'

// Reducers
import rootReducer from '../../../client/reducers/root-reducer'
import { checkoutInitialState } from '../../../client/reducers/set-checkout'

// Fixtures
import addressBookData from '../../fixtures/address-book'

// Mock out ApiClient
jest.mock('../../../client/lib/api-client')

test('it renders given addresses correctly', () => {
  const component = mount(<AddressBook addressBook={addressBookData} />)

  // Check address 1 is correctly rendered
  expect(component).toIncludeText('Bernard Houseman')
  expect(component).toIncludeText('84 West Quay Street')
  expect(component).toIncludeText('Blackpool')
  expect(component).toIncludeText('LS27EY')
  expect(component).toIncludeText('GB')

  // Check address 2 is correctly rendered
  expect(component).toIncludeText('Bob Doe')
  expect(component).toIncludeText('20 Cardigan Lane')
  expect(component).toIncludeText('Leeds')
  expect(component).toIncludeText('LS27EY')
  expect(component).toIncludeText('GB')
})

test('selecting an address passess its id to onBookAddressSelected', () => {
  const onBookAddressSelected = jest.fn()

  const component = mount(<AddressBook
    addressBook={addressBookData}
    onBookAddressSelected={onBookAddressSelected}
  />)

  // Select the last address in the book
  component.find({ type: 'radio' }).last().prop('onChange')()

  // Check the Redux store has been correctly populated
  expect(onBookAddressSelected).toHaveBeenCalledWith('23')
})

// This spec can be simplified by removing the mock store and the api client
// once the address book gets decoupled from Redux
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
      <AddressBookWithRedux formName='shippingAddress' onClose={() => {}} />
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
