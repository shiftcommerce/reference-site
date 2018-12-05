// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import t from 'typy'

// Objects
import Input from './../../objects/input'
import Checkbox from './../../objects/checkbox'
import DropdownSelect from './../../objects/dropdown-select'
import Button from '../../objects/button'

// Lib
import addressFormValidator from '../../lib/address-form-validator'

// Json
import Countries from './../../static/countries.json'

// Components
import AddressBook from '../address-book'

// Actions
import { autoFillAddress, renderSummary, editForm } from '../../actions/checkout-actions'

export class AddressForm extends Component {
  constructor (props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.editForm = this.editForm.bind(this)
  }

  componentDidMount () {
    const { loggedIn, addressBook } = this.props

    if (loggedIn && addressBook.length > 0) {
      const preferredAddress = addressBook.find((obj) => { return obj.preferred_shipping === true })

      this.props.dispatch(autoFillAddress(preferredAddress))
    }
  }

  formValid (address) {
    const requiredFields = ['line_1', 'zipcode', 'city', 'primary_phone', 'email']
    const requiredFieldsPresent = (requiredFields().every((key) => address[key] !== '' && address[key] !== null) === true)
    const noFormErrorsPresent = (Object.values(address.errors).filter(String).length === 0)
    return (requiredFieldsPresent && noFormErrorsPresent)
  }

  renderFormHeader () {
    const { checkout, title, formName } = this.props
    const collapsed = checkout[formName].collapsed
    return (
      <div className='o-form__header c-address-form__header'>
        <div className='o-form__header-title c-address-form__header-title'>
          <h2>{ title }</h2>
        </div>
        { collapsed && <Button label='Edit' status='secondary' className='o-button-edit' onClick={this.editForm} /> }
      </div>
    )
  }

  renderFormSummary () {
    const { checkout, addressType, formName, onToggleCollapsed } = this.props
    const collapsed = checkout[formName].collapsed
    const completed = checkout[formName].completed
    const address = checkout[formName]

    return (
      <div>
        { collapsed && (addressType === 'shipping') &&
          <div className='o-form__wrapper--collapsed c-address-form__summary'>
            <span className={classNames('u-bold', { 'u-text-color--primary': (address.line_1 && address.zipcode) })} />
            <p className='u-bold'>{ address.first_name } { address.last_name } </p>
            <span>{ address.line_1 }, { address.city }, { address.zipcode }</span>
            { collapsed && !completed && <AddressBook
              formName={formName}
              onToggleCollapsed={onToggleCollapsed}
            /> }
            { !completed && this.renderFormSubmitButton() }
          </div>
        }
      </div>
    )
  }

  submitForm (e) {
    const { formName, onToggleCollapsed } = this.props
    e.preventDefault()
    onToggleCollapsed('complete', formName)
  }

  editForm () {
    const { formName, onToggleCollapsed, loggedIn } = this.props
    onToggleCollapsed('edit', formName)

    !loggedIn ? this.props.dispatch(editForm(formName)) : this.props.dispatch(renderSummary(formName))
  }

  renderCountriesDropdown () {
    const { checkout, formName, onChange, onBlur } = this.props
    const address = checkout[formName]
    const name = 'country_code'
    const rules = { required: true }

    return (
      <div>
        <DropdownSelect
          options={Countries}
          label='Country'
          name={name}
          value={address.country_code}
          formName={formName}
          required={rules.required}
          rules={rules}
          validationMessage={address.errors[name]}
          onChange={onChange}
          onBlur={onBlur}
          prompt='Select a Country'
        />
      </div>
    )
  }

  renderInputField (address, fieldOption) {
    return (
      <div>
        <Input
          label={fieldOption.label}
          className={fieldOption.className}
          placeholder={fieldOption.placeholder}
          name={fieldOption.name}
          type={fieldOption.type}
          value={fieldOption.value}
          required={t(fieldOption, 'rules.required').safeObject}
          validationMessage={address.errors[fieldOption.name]}
          rules={fieldOption.rules}
          formName={this.props.formName}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        />
      </div>
    )
  }

  renderCheckbox (address, fieldOption) {
    return (
      <div>
        <Checkbox
          label={fieldOption.label}
          className={fieldOption.className}
          name={fieldOption.name}
          checked={!!fieldOption.value}
          required={t(fieldOption, 'rules.required').safeObject}
          validationMessage={address.errors[fieldOption.name]}
          rules={fieldOption.rules}
          formName={this.props.formName}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        />
      </div>
    )
  }

  renderCustomerNameFields () {
    const { checkout, formName } = this.props
    const address = checkout[formName]

    const fieldOptions = [
      { className: 'o-form__input-block', placeholder: 'Enter First Name', label: 'First Name', name: 'first_name', value: address.first_name, rules: { required: true, maxLength: 50 } },
      { className: 'o-form__input-block', placeholder: 'Enter Last Name', label: 'Last Name', name: 'last_name', value: address.last_name, rules: { required: true, maxLength: 50 } }
    ]

    return (
      <div className='o-flex o-flex__space-between'>
        { fieldOptions.map((fieldOption, index) => {
          return (
            <div className='o-flex-full-width-s' key={index}>
              { this.renderInputField(address, fieldOption) }
            </div>
          )
        }) }
      </div>
    )
  }

  renderCompanyNameOption () {
    const { checkout, formName, onShowField } = this.props
    const address = checkout[formName]
    const fieldOption = { className: 'o-form__input-block', label: 'Company Name', name: 'companyName', value: address.companyName }

    return (
      <div>
        { !(address.companyNameShown) &&
          <a href='#' onClick={() => onShowField(formName, 'companyNameShown')}>
            <p>+ Add Company Name (optional)</p>
          </a>
        }
        { address.companyNameShown && this.renderInputField(address, fieldOption) }
      </div>
    )
  }

  renderAddressLine1 () {
    const { checkout, formName } = this.props
    const address = checkout[formName]
    const fieldOption = { className: 'o-form__input-block', placeholder: 'Enter Address', label: 'Address 1', name: 'line_1', value: address.line_1, rules: { required: true } }

    return (
      <div>
        { this.renderInputField(address, fieldOption) }
      </div>
    )
  }

  renderAddressLine2 () {
    const { checkout, formName, onShowField } = this.props
    const address = checkout[formName]
    const fieldOption = { className: 'o-form__input-block', label: 'Address 2', name: 'line_2', value: address.line_2 }

    return (
      <div>
        { !(address.address2Shown) &&
          <a href='#' onClick={() => onShowField(formName, 'address2Shown')}>
            <p>+ Add Address 2 (optional)</p>
          </a>
        }
        { address.address2Shown && this.renderInputField(address, fieldOption) }
      </div>
    )
  }

  renderAddressFields () {
    const { checkout, formName } = this.props
    const address = checkout[formName]
    const fieldOptions = [
      { className: 'o-form__input-block', placeholder: 'Enter Post Code', label: 'Post Code', name: 'zipcode', value: address.zipcode, rules: { required: true, postcode: true } },
      { className: 'o-form__input-block', placeholder: 'Enter City', label: 'City', name: 'city', value: address.city, rules: { required: true } },
      { className: 'o-form__input-block', placeholder: 'Enter County', label: 'County', name: 'state', value: address.state },
      { className: 'o-form__input-block', placeholder: 'Enter Phone', label: 'Phone', name: 'primary_phone', value: address.primary_phone, rules: { required: true, phone: true } },
      { className: 'o-form__input-block', placeholder: 'Enter Email', label: 'Email', name: 'email', type: 'email', value: address.email, rules: { required: true, email: true } }
    ]

    return (
      <div>
        { fieldOptions.map((fieldOption, index) => {
          return (
            <div key={index}>
              { this.renderInputField(address, fieldOption) }
            </div>
          )
        }) }
      </div>
    )
  }

  renderSaveAddressCheckbox () {
    const { loggedIn, checkout, formName } = this.props
    const address = checkout[formName]
    const checkboxOptions = { label: 'Save address for later', name: 'saveToAddressBook', value: address.saveToAddressBook, className: 'o-form__checkbox-label' }
    const inputOptions = { className: 'o-form__input-block', placeholder: 'A recognisable name, only for your own use, e.g. "Home"', label: 'Address name', name: 'label', type: 'text', value: address.label }
    const preferredShippingCheckboxOptions = { className: 'o-form__checkbox-label', label: 'Set as preferred shipping address', name: 'preferred_shipping', value: address.setAsPreferredShipping }
    const preferredBillingCheckboxOptions = { className: 'o-form__checkbox-label', label: 'Set as preferred billing address', name: 'preferred_billing', value: address.setAsPreferredBilling }

    return (
      <>
        { loggedIn && !address.formPreFilled && this.renderCheckbox(address, checkboxOptions) }
        { address.saveToAddressBook && this.renderCheckbox(address, preferredShippingCheckboxOptions) }
        { address.saveToAddressBook && this.renderCheckbox(address, preferredBillingCheckboxOptions) }
        { address.saveToAddressBook && this.renderInputField(address, inputOptions) }
      </>
    )
  }

  renderNewsletterCheckbox () {
    const { checkout, formName, addressType } = this.props
    const address = checkout[formName]
    const fieldOption = {
      label: 'Sign up for Weekly Newsletters (Optional)',
      name: 'newsletterOptIn',
      value: address.newsletterOptIn,
      className: 'o-form__checkbox-label'
    }
    return (
      <div>
        { addressType === 'shipping' && this.renderCheckbox(address, fieldOption) }
      </div>
    )
  }

  renderFormSubmitButton () {
    const { checkout, addressType, formName } = this.props
    const address = checkout[formName]
    const isValidForm = addressFormValidator(address)
    return (
      <div>
        { addressType === 'shipping' &&
          <div className='o-form__input-group'>
            <Button
              aria-label='View Shipping Options'
              className='c-address-form__button o-button--sml'
              label='View Shipping Options'
              status={(isValidForm ? 'positive' : 'disabled')}
              type='primary'
              disabled={!isValidForm}
              onClick={this.submitForm}
            />
          </div>
        }
      </div>
    )
  }

  render () {
    const {
      formName,
      checkout,
      className
    } = this.props

    const address = checkout[formName]

    return (
      <div className={classNames('o-form__address', className)}>
        { this.renderFormHeader() }
        { this.renderFormSummary() }
        { !address.collapsed && !address.selected &&
          <form className='o-form__wrapper o-form__background'>
            { this.renderCountriesDropdown() }
            { this.renderCustomerNameFields() }
            { this.renderCompanyNameOption() }
            { this.renderAddressLine1() }
            { this.renderAddressLine2() }
            { this.renderAddressFields() }
            <p>* Denotes required fields</p>
            { this.renderSaveAddressCheckbox() }
            { this.renderNewsletterCheckbox() }
            { this.renderFormSubmitButton() }
          </form>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ login: { loggedIn }, checkout: { addressBook } }) => {
  return {
    addressBook,
    loggedIn
  }
}

export default connect(mapStateToProps)(AddressForm)
