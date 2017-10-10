// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Objects
import Input from './../../objects/Input'
import DropdownSelect from './../../objects/DropdownSelect'

// Json
import Countries from './../../static/countries.json'

export default class AddressForm extends Component {
  render () {
    const { checkout,
      addressType,
      formName,
      className,
      onChange,
      onBlur,
      onToggleCollapsed,
      onShowField } = this.props
    const address = checkout[this.props.formName]
    const collapsed = address.collapsed

    // Example data
    const countries = Countries

    return (
      <div className={classNames('o-form', className)}>
        <h3>{this.props.title}</h3>
        {collapsed &&
          <button className='c-button' onClick={() => onToggleCollapsed(formName)}>Edit</button>
        }

        {collapsed && addressType === 'shipping' &&
          <div className='o-form__wrapper'>
            <span className='u-bold'>{address.full_name} </span>
            <span>{address.line_1}, {address.city}, {address.zipcode}</span>
          </div>
        }

        {!collapsed &&
          <form className='o-form__wrapper'>

            <DropdownSelect
              options={countries}
              label='Country'
              name='country_code'
              value={address.country_code}
              formName={formName}
              required='true'
              onChange={onChange}
              onBlur={onBlur}
              prompt='Select country'
            />

            <Input
              label='Full Name'
              className='o-form__input-block'
              name='full_name'
              type='text'
              value={address.full_name}
              formName={formName}
              required='true'
              onChange={onChange}
              onBlur={onBlur}
            />

            {!(address.companyNameShown) &&
              <a href='#' onClick={() => { onShowField(formName, 'companyNameShown') }}>
                <p>
                  + Add Company Name (optional)
                </p>
              </a>
            }

            {address.companyNameShown &&
              <Input
                label='Company Name'
                className='o-form__input-block'
                name='companyName'
                type='text'
                value={address.companyName}
                formName={formName}
                onChange={onChange}
                onBlur={onBlur}
              />
            }

            <Input
              label='Address 1'
              className='o-form__input-block'
              name='line_1'
              type='text'
              value={address.line_1}
              formName={formName}
              required='true'
              onChange={onChange}
              onBlur={onBlur}
            />

            {!(address.address2Shown) &&
              <a href='#' onClick={() => { onShowField(formName, 'address2Shown') }}>
                <p>
                  + Add Address 2 (optional)
                </p>
              </a>
            }

            {address.address2Shown &&
              <Input
                label='Address 2'
                className='o-form__input-block'
                name='line_2'
                type='text'
                value={address.line_2}
                formName={formName}
                onChange={onChange}
                onBlur={onBlur}
              />
            }

            <Input
              label='Post Code'
              className='o-form__input-block'
              name='zipcode'
              type='text'
              value={address.zipcode}
              formName={formName}
              required='true'
              onChange={onChange}
              onBlur={onBlur}
            />

            <Input
              label='City'
              className='o-form__input-block'
              name='city'
              type='text'
              value={address.city}
              formName={formName}
              required='true'
              onChange={onChange}
              onBlur={onBlur}
            />

            <Input
              label='County'
              className='o-form__input-block'
              name='state'
              type='text'
              value={address.state}
              formName={formName}
              required='true'
              onChange={onChange}
              onBlur={onBlur}
            />

            <Input
              label='Phone'
              className='o-form__input-block'
              name='primary_phone'
              type='tel'
              value={address.primary_phone}
              formName={formName}
              required='true'
              placeholder='In case Questions Arise'
              onChange={onChange}
              onBlur={onBlur}
            />

            <Input
              label='Email'
              className='o-form__input-block'
              name='email'
              type='email'
              value={address.email}
              formName={formName}
              required='true'
              placeholder='To Receive Order Confirmation'
              onChange={onChange}
              onBlur={onBlur}
            />

            <p>
              * Denotes required fields
            </p>

            {addressType === 'shipping' &&
              <div>
                <Input
                  type='checkbox'
                  className='o-form__input-inline'
                  label='Sign up for Weekly Newsletters (optional)'
                  name='newsletterOptIn'
                  value={address.newsletterOptIn}
                  formName={formName}
                  onChange={onChange}
                  onBlur={onBlur}
                />

                <div className='o-form__input-group'>
                  <button className='c-button' onClick={() => onToggleCollapsed(formName)} type='submit'>
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
