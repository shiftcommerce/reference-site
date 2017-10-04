import AddressForm from '../../../components/checkout/AddressForm'
import { createMockStore } from 'redux-test-utils'

test('renders the correct base form elements', () => {
  // Arrange
  const state = {
    checkout:
    {
      testAddress: {}
    }
  }

  // act
  const wrapper = mount(
    <AddressForm formName='testAddress' />, { context: { store: createMockStore(state) } }
  )

  // assert
  expect(wrapper).toIncludeText('Country')
  expect(wrapper).toIncludeText('Full Name')
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
    country: 'GB',
    fullName: 'Test Name',
    address1: 'Test House',
    postCode: 'TEST POSTCODE',
    city: 'Leeds',
    county: 'Yorkshire',
    phone: '01234567890',
    email: 'test@example.com'
  }
  const state = {
    checkout: {
      testAddress: address
    }
  }

  // act
  const wrapper = mount(
    <AddressForm formName='testAddress' />,
    { context: { store: createMockStore(state) } }
  )

  // assert
  expect(wrapper.find('#country')).toHaveValue(address.country)
  expect(wrapper.find('#fullName')).toHaveValue(address.fullName)
  expect(wrapper.find('#address1')).toHaveValue(address.address1)
  expect(wrapper.find('#postCode')).toHaveValue(address.postCode)
  expect(wrapper.find('#city')).toHaveValue(address.city)
  expect(wrapper.find('#county')).toHaveValue(address.county)
  expect(wrapper.find('#phone')).toHaveValue(address.phone)
  expect(wrapper.find('#email')).toHaveValue(address.email)
})

test('renders additional elements for shipping form', () => {
  // Arrange
  const state = {
    checkout:
    {
      shippingAddress: {}
    }
  }

  // Act
  const wrapper = mount(
    <AddressForm formName='shippingAddress' addressType='shipping'/>,
    { context: { store: createMockStore(state) } }
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
    address2: 'Test Address Line 2',
    address2Shown: true
  }
  const state = {
    checkout: {
      testAddress: address
    }
  }

  // act
  const wrapper = mount(
    <AddressForm formName='testAddress' />,
    { context: { store: createMockStore(state) } }
  )

  // Assert - additional enabled fields:
  expect(wrapper.find('#companyName')).toHaveValue(address.companyName)
  expect(wrapper.find('#address2')).toHaveValue(address.address2)
})

test('does not render the additional company / address2 fields when not enabled', () => {
  // Arrange
  const address = {
    companyNameShown: false,
    address2Shown: false
  }
  const state = {
    checkout: {
      testAddress: address
    }
  }

  // Act
  const wrapper = mount(
    <AddressForm formName='testAddress' />,
    { context: { store: createMockStore(state) } }
  )

  // Assert - Input fields are not rendered:
  expect(wrapper.find('#companyName').length).toEqual(0)
  expect(wrapper.find('#address2').length).toEqual(0)
})

test('renders the collapsed version of the form when collapsed = true', () => {
  // Arrange
  const address = {
    collapsed: true
  }
  const state = {
    checkout: {
      testAddress: address
    }
  }

  // act
  const wrapper = mount(
    <AddressForm formName='testAddress' />,
    { context: { store: createMockStore(state) } }
  )

  // Assert - Edit button present:
  expect(wrapper).toHaveText("Edit")
  // An input field is not rendered:
  expect(wrapper.find('#fullName').length).toEqual(0)
})
