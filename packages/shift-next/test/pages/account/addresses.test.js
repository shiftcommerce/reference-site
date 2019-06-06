// Pages
import { AccountAddressesPage } from '../../../src/pages/account/addresses'

// Actions
import * as AddressBookActions from '../../../src/actions/address-book-actions'

// Helpers
import emptyLayout from '../../support/empty-layout';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

const layout = {
  component: emptyLayout,
  props: {}
}

const formData = {
  firstName: 'John',
  lastName: 'Doe',
  addressLine1: 'Address Line 1',
  addressLine2: 'Address Line 2',
  city: 'Leeds',
  county: 'West Yorkshire',
  countryCode: 'GB',
  postcode: 'LS27EY',
  preferredBilling: true,
  preferredShipping: true,
  label: 'Label',
  company: 'Shift',
  phone: '123',
  email: 'test@example.com'
}

describe('onAddressCreated()', () => {
  test('successfully saves the address to the address book', async () => {
    jest.useFakeTimers()

    const saveAddressSpy = jest.spyOn(AddressBookActions, 'saveToAddressBook')
    const fetchAddressBookSpy = jest.spyOn(AddressBookActions, 'fetchAddressBook')
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true))

    const wrapper = shallow(<AccountAddressesPage dispatch={dispatch} layout={layout}/>, { disableLifecycleMethods: true })

    const formikBag = {
      setStatus: jest.fn(),
      setSubmitting: jest.fn()
    }

    await wrapper.instance().onAddressCreated(formData, formikBag)

    expect(saveAddressSpy).toHaveBeenCalledWith({
      first_name: 'John',
      last_name: 'Doe',
      line_1: 'Address Line 1',
      line_2: 'Address Line 2',
      city: 'Leeds',
      state: 'West Yorkshire',
      country_code: 'GB',
      zipcode: 'LS27EY',
      preferred_billing: true,
      preferred_shipping: true,
      label: 'Label',
      companyName: 'Shift',
      primary_phone: '123',
      email: 'test@example.com'
    })
    expect(fetchAddressBookSpy).toHaveBeenCalled()
    expect(formikBag.setStatus).toHaveBeenCalledWith('success-created')

    jest.runAllTimers()
    expect(formikBag.setStatus).toHaveBeenCalledWith(null)
    expect(formikBag.setSubmitting).toHaveBeenCalledWith(false)

    saveAddressSpy.mockRestore()
    fetchAddressBookSpy.mockRestore()
  })
})

describe('onAddressUpdated()', () => {
  test('successfully updates the address', async () => {
    jest.useFakeTimers()

    const updateAddressSpy = jest.spyOn(AddressBookActions, 'updateAddress')
    const fetchAddressBookSpy = jest.spyOn(AddressBookActions, 'fetchAddressBook')
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true))

    const wrapper = shallow(<AccountAddressesPage dispatch={dispatch} addressBook={[]} layout={layout}/>, { disableLifecycleMethods: true })
    wrapper.setState({
      currentAddressId: 10
    })

    const formikBag = {
      setStatus: jest.fn(),
      setSubmitting: jest.fn()
    }

    await wrapper.instance().onAddressUpdated(formData, formikBag)

    expect(updateAddressSpy).toHaveBeenCalledWith(10, {
      first_name: 'John',
      last_name: 'Doe',
      line_1: 'Address Line 1',
      line_2: 'Address Line 2',
      city: 'Leeds',
      state: 'West Yorkshire',
      country_code: 'GB',
      zipcode: 'LS27EY',
      preferred_billing: true,
      preferred_shipping: true,
      label: 'Label',
      companyName: 'Shift',
      primary_phone: '123',
      email: 'test@example.com'
    })
    expect(fetchAddressBookSpy).toHaveBeenCalled()
    expect(formikBag.setStatus).toHaveBeenCalledWith('success-updated')

    jest.runAllTimers()
    expect(formikBag.setStatus).toHaveBeenCalledWith(null)
    expect(formikBag.setSubmitting).toHaveBeenCalledWith(false)
  })
})
