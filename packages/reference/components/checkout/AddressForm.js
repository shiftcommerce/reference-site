// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Objects
import Input from './../../objects/Input'
import Checkbox from './../../objects/Checkbox'
import DropdownSelect from './../../objects/DropdownSelect'
import Button from '../../objects/Button'

// Json
import Countries from './../../static/countries.json'

class AddressForm extends Component {
  requiredFields () {
    return [ 'line_1', 'zipcode', 'city', 'primary_phone', 'email' ]
  }

  formValid (address) {
    let requiredFieldsPresent = (this.requiredFields().every((key) => address[key] !== '' && address[key] !== null) === true)
    let noFormErrorsPresent = (Object.values(address.errors).filter(String).length === 0)
    return (requiredFieldsPresent && noFormErrorsPresent)
  }

  renderFormHeader () {
    const { checkout, title, formName, onToggleCollapsed } = this.props
    const collapsed = checkout[formName].collapsed
    return (
      <div className='o-form__header'>
        <div>
          <h2>{ title }</h2>
        </div>
        <div>
          { collapsed && <Button label='Edit' size='lrg' onClick={() => onToggleCollapsed('edit', formName)} /> }
        </div>
      </div>
    )
  }

  renderFormSummary () {
    const { checkout, addressType, formName } = this.props
    const collapsed = checkout[formName].collapsed
    const address = checkout[formName]
    return (
      <div>
        { collapsed && (addressType === 'shipping') &&
          <div className='o-form__wrapper'>
            <span className={classNames('u-bold', {'u-text-color--primary': (address.line_1 && address.zipcode)})}>✓ </span>
            <span className='u-bold'>{ address.first_name } { address.last_name } </span>
            <span>{ address.line_1 }, { address.city }, { address.zipcode }</span>
          </div>
        }
      </div>
    )
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
          name={fieldOption.name}
          type={fieldOption.type}
          value={fieldOption.value}
          required={(fieldOption.rules && fieldOption.rules.required)}
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
          required={(fieldOption.rules && fieldOption.rules.required)}
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
    let fieldOptions = [
      { className: 'o-form__input-block', label: 'First Name', name: 'first_name', value: address.first_name, rules: { required: true, maxLength: 50 } },
      { className: 'o-form__input-block', label: 'Last Name', name: 'last_name', value: address.last_name, rules: { required: true, maxLength: 50 } }
    ]
    return (
      <div className='o-flex o-flex__space-between'>
        { fieldOptions.map((fieldOption, index) => {
          return (
            <div className='o-flex-full-width-s' key={index}>
              { this.renderInputField(address, fieldOption) }
            </div>
          )
        })}
      </div>
    )
  }

  renderCompanyNameOption () {
    const { checkout, formName, onShowField } = this.props
    const address = checkout[formName]
    let fieldOption = { className: 'o-form__input-block', label: 'Company Name', name: 'companyName', value: address.companyName }
    return (
      <div>
        {!(address.companyNameShown) &&
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
    let fieldOption = { className: 'o-form__input-block', label: 'Address 1', name: 'line_1', value: address.line_1, rules: { required: true } }
    return (
      <div>
        { this.renderInputField(address, fieldOption) }
      </div>
    )
  }

  renderAddressLine2 () {
    const { checkout, formName, onShowField } = this.props
    const address = checkout[formName]
    let fieldOption = { className: 'o-form__input-block', label: 'Address 2', name: 'line_2', value: address.line_2 }
    return (
      <div>
        {!(address.address2Shown) &&
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
    let fieldOptions = [
      { className: 'o-form__input-block', label: 'Post Code', name: 'zipcode', value: address.zipcode, rules: { required: true, postcode: true } },
      { className: 'o-form__input-block', label: 'City', name: 'city', value: address.city, rules: { required: true } },
      { className: 'o-form__input-block', label: 'County', name: 'state', value: address.state },
      { className: 'o-form__input-block', label: 'Phone', name: 'primary_phone', value: address.primary_phone, rules: { required: true, phone: true } },
      { className: 'o-form__input-block', label: 'Email', name: 'email', type: 'email', value: address.email, rules: { required: true, email: true } }
    ]
    return (
      <div>
        { fieldOptions.map((fieldOption, index) => {
          return (
            <div key={index}>
              { this.renderInputField(address, fieldOption) }
            </div>
          )
        })}
      </div>
    )
  }

  renderNewsletterCheckbox () {
    const { checkout, formName, addressType } = this.props
    const address = checkout[formName]
    let fieldOption = { label: 'Sign up for Weekly Newsletters (optional)', name: 'newsletterOptIn', value: address.newsletterOptIn }
    return (
      <div>
        { addressType === 'shipping' && this.renderCheckbox(address, fieldOption) }
      </div>
    )
  }

  renderFormSubmitButton () {
    const { checkout, addressType, formName, onToggleCollapsed } = this.props
    const address = checkout[formName]
    const isValidForm = this.formValid(address)
    return (
      <div>
        { addressType === 'shipping' &&
          <div className='o-form__input-group'>
            <Button
              aria-label='View Shipping Options'
              label='View Shipping Options'
              size='lrg'
              status={(isValidForm ? 'primary' : 'disabled')}
              type='submit'
              disabled={!isValidForm}
              onClick={() => onToggleCollapsed('complete', formName)}
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
    const collapsed = address.collapsed

    return (
      <div className={classNames('o-form', className)}>
        { this.renderFormHeader() }
        { this.renderFormSummary() }
        { !collapsed &&
          <form className='o-form__wrapper'>
            { this.renderCountriesDropdown() }
            { this.renderCustomerNameFields() }
            { this.renderCompanyNameOption() }
            { this.renderAddressLine1() }
            { this.renderAddressLine2() }
            { this.renderAddressFields() }
            <p>* Denotes required fields</p>
            { this.renderNewsletterCheckbox() }
            { this.renderFormSubmitButton() }
          </form>
        }
      </div>
    )
  }
}

export default AddressForm
