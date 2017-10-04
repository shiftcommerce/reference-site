// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

// Components
import InputGroup from './InputGroup'
import SelectInputGroup from './SelectInputGroup'
import CheckboxInputGroup from './CheckboxInputGroup'

// Actions
import { showField, toggleCollapsed } from '../../actions/checkoutActions'

class AddressForm extends Component {
  constructor () {
    super()
    this.onShowField        = this.onShowField.bind(this)
    this.onToggleCollapsed  = this.onToggleCollapsed.bind(this)
  }

  onShowField (fieldName) {
    return (
      this.props.dispatch(showField(this.props.formName, fieldName))
    )
  }

  onToggleCollapsed () {
    return (
      this.props.dispatch(toggleCollapsed(this.props.formName))
    )
  }

  render () {
    const { checkout } = this.props
    const addressType  = this.props.addressType
    const formName     = this.props.formName
    const className    = this.props.className
    const address      = checkout[this.props.formName]
    const collapsed    = address.collapsed

    // Example data
    const countries = [
      { id: 1, title: 'United Kingdom', value: 'GB' },
      { id: 2, title: 'United States',  value: 'US' }
    ]

    return (
      <div className={classNames('o-form', className)}>
        <h3>{this.props.title}</h3>
        {collapsed &&
          <button onClick={this.onToggleCollapsed}>Edit</button>
        }

        {collapsed && addressType === 'shipping' &&
          <div className='o-form__wrapper'>
            <span className='u-bold'>{address.fullName} </span>
            <span>{address.address1}, {address.city}, {address.postCode}</span>
          </div>
        }

        {!collapsed &&
          <form className='o-form__wrapper'>

            <SelectInputGroup
              options={countries}
              fieldLabel='Country'
              fieldName='country'
              fieldValue={address.country}
              formName={formName}
              required='true'
            />

            <InputGroup
              fieldLabel='Full Name'
              fieldName='fullName'
              fieldValue={address.fullName}
              formName={formName}
              required='true'
            />

            {!(address.companyNameShown) &&
              <a href='#' onClick={() => { this.onShowField('companyNameShown') } }>
                <p>
                  + Add Company Name (optional)
                </p>
              </a>
            }

            {address.companyNameShown &&
              <InputGroup
                fieldLabel='Company Name'
                fieldName='companyName'
                fieldValue={address.companyName}
                formName={formName}
              />
            }

            <InputGroup
              fieldLabel='Address 1'
              fieldName='address1'
              fieldValue={address.address1}
              formName={formName}
              required='true'
            />

            {!(address.address2Shown) &&
              <a href='#' onClick={() => { this.onShowField('address2Shown') } }>
                <p>
                  + Add Address 2 (optional)
                </p>
              </a>
            }

            {address.address2Shown &&
              <InputGroup
                fieldLabel='Address 2'
                fieldName='address2'
                fieldValue={address.address2}
                formName={formName}
              />
            }

            <InputGroup
              fieldLabel='Post Code'
              fieldName='postCode'
              fieldValue={address.postCode}
              formName={formName}
              required='true'
            />

            <InputGroup
              fieldLabel='City'
              fieldName='city'
              fieldValue={address.city}
              formName={formName}
              required='true'
            />

            <InputGroup
              fieldLabel='County'
              fieldName='county'
              fieldValue={address.county}
              formName={formName}
              required='true'
            />

            <InputGroup
              fieldLabel='Phone'
              fieldName='phone'
              fieldValue={address.phone}
              formName={formName}
              required='true'
            />

            <InputGroup
              fieldLabel='Email'
              fieldName='email'
              fieldValue={address.email}
              formName={formName}
              required='true'
            />

            <p>
              * Denotes required fields
            </p>

            {addressType === 'shipping' &&
              <div>
                <CheckboxInputGroup
                  fieldLabel='Sign up for Weekly Newsletters (optional)'
                  fieldName='newsletterOptIn'
                  fieldValue={address.newsletterOptIn}
                  formName={formName}
                />

                <div className='o-form__input-group'>
                  <button onClick={this.onToggleCollapsed} type='submit'>
                    View Shipping Options
                  </button>
                </div>
              </div>
            }
          </form>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    checkout: state.checkout
  }
}

export default connect(mapStateToProps)(AddressForm)
