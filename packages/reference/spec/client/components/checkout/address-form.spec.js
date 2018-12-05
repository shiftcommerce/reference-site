// Libraries
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// Components
import { AddressForm } from '../../../../client/components/checkout/address-form'

// Reducers
import rootReducer from '../../../../client/reducers/root-reducer'
import { checkoutInitialState } from '../../../../client/reducers/set-checkout'

// Fixtures
import addressBookData from '../../../fixtures/address-book'

test('renders the correct base form elements', () => {
  // Arrange
  const checkout = {
    testAddress: {
      collapsed: false,
      completed: false,
      errors: {}
    }
  }
  const addressBook = []

  // act
  const wrapper = mount(
    <AddressForm formName='testAddress' checkout={checkout} addressBook={addressBook} />
  )

  // assert
  expect(wrapper).toIncludeText('Country')
  expect(wrapper).toIncludeText('First Name')
  expect(wrapper).toIncludeText('Last Name')
  expect(wrapper).toIncludeText('Add Company Name')
  expect(wrapper).toIncludeText('Address 1')
  expect(wrapper).toIncludeText('Add Address 2')
  expect(wrapper).toIncludeText('Post Code')
  expect(wrapper).toIncludeText('City')
  expect(wrapper).toIncludeText('County')
  expect(wrapper).toIncludeText('Phone')
  expect(wrapper).toIncludeText('Email')
  expect(wrapper).toIncludeText('Country')
})

test('renders the values from the state', () => {
  // Arrange
  const address = {
    country_code: 'GB',
    first_name: 'First Name',
    last_name: 'Last Name',
    line_1: 'Test House',
    zipcode: 'TEST POSTCODE',
    city: 'Leeds',
    state: 'Yorkshire',
    primary_phone: '01234567890',
    email: 'test@example.com',
    collapsed: false,
    completed: false,
    errors: {}
  }
  const checkout = {
    testAddress: address
  }
  const addressBook = []

  // act
  const wrapper = mount(
    <AddressForm formName='testAddress' checkout={checkout} addressBook={addressBook} />
  )

  // assert
  expect(wrapper.find('#country_code')).toHaveValue(address.country_code)
  expect(wrapper.find('#first_name')).toHaveValue(address.first_name)
  expect(wrapper.find('#last_name')).toHaveValue(address.last_name)
  expect(wrapper.find('#line_1')).toHaveValue(address.line_1)
  expect(wrapper.find('#zipcode')).toHaveValue(address.zipcode)
  expect(wrapper.find('#city')).toHaveValue(address.city)
  expect(wrapper.find('#state')).toHaveValue(address.state)
  expect(wrapper.find('#primary_phone')).toHaveValue(address.primary_phone)
  expect(wrapper.find('#email')).toHaveValue(address.email)
})

test('renders additional elements for shipping form', () => {
  // Arrange
  const checkout = {
    shippingAddress: {
      collapsed: false,
      completed: false,
      errors: {}
    }
  }
  const addressBook = []

  // Act
  const wrapper = mount(
    <AddressForm formName='shippingAddress' addressType='shipping' checkout={checkout} addressBook={addressBook} />
  )

  // Assert - Additional fields for shipping form:
  expect(wrapper).toIncludeText('Sign up for Weekly Newsletters')
  expect(wrapper).toIncludeText('View Shipping Options')
})

test('renders the additional company / address2 fields when enabled', () => {
  // Arrange
  const address = {
    companyName: 'Test Company',
    companyNameShown: true,
    line_2: 'Test Address Line 2',
    address2Shown: true,
    collapsed: false,
    completed: false,
    errors: {}
  }
  const checkout = {
    testAddress: address
  }
  const addressBook = []

  // act
  const wrapper = mount(
    <AddressForm formName='testAddress' checkout={checkout} addressBook={addressBook} />
  )

  // Assert - additional enabled fields:
  expect(wrapper.find('#companyName')).toHaveValue(address.companyName)
  expect(wrapper.find('#line_2')).toHaveValue(address.line_2)
})

test('does not render the additional company / address2 fields when not enabled', () => {
  // Arrange
  const address = {
    companyNameShown: false,
    address2Shown: false,
    collapsed: false,
    completed: false,
    errors: {}
  }
  const checkout = {
    testAddress: address
  }
  const addressBook = []

  // Act
  const wrapper = mount(
    <AddressForm formName='testAddress' checkout={checkout} addressBook={addressBook} />
  )

  // Assert - Input fields are not rendered:
  expect(wrapper.find('#companyName').length).toEqual(0)
  expect(wrapper.find('#line_2').length).toEqual(0)
})

test('renders the collapsed version of the form when collapsed = true', () => {
  // Arrange
  const address = {
    collapsed: true,
    completed: false,
    errors: {}
  }
  const checkout = {
    testAddress: address
  }

  // act
  const wrapper = mount(
    <AddressForm formName='testAddress' checkout={checkout} />
  )

  // Assert - Edit button present:
  expect(wrapper).toHaveText('Edit')
  // An input field is not rendered:
  expect(wrapper.find('#full_name').length).toEqual(0)
})

test('renders the address book when user is logged in and has addresses', () => {
  // Initialize Redux store with address book data
  const store = createStore(rootReducer, {
    checkout: Object.assign(checkoutInitialState, {
      addressBook: addressBookData
    })
  })

  const addressBook = addressBookData

  const checkout = {
    shippingAddress: {
      collapsed: true,
      completed: false,
      errors: {}
    },
    addressBook: addressBook
  }

  const dispatch = jest.fn()

  // Render the component
  const wrapper = mount(
    <Provider store={store}>
      <AddressForm formName='shippingAddress' addressType='shipping' checkout={checkout} addressBook={addressBook} dispatch={dispatch} loggedIn />
    </Provider>
  )

  // Ensure the Address-book is displayed
  expect(wrapper).toIncludeText('Your addresses')

  // Check address 1 is correctly rendered
  expect(wrapper).toIncludeText('Bernard Houseman')
  expect(wrapper).toIncludeText('84 West Quay Street')
  expect(wrapper).toIncludeText('Blackpool')
  expect(wrapper).toIncludeText('LS27EY')
  expect(wrapper).toIncludeText('GB')

  // Check address 2 is correctly rendered
  expect(wrapper).toIncludeText('Bob Doe')
  expect(wrapper).toIncludeText('20 Cardigan Lane')
  expect(wrapper).toIncludeText('Leeds')
  expect(wrapper).toIncludeText('LS27EY')
  expect(wrapper).toIncludeText('GB')
})
