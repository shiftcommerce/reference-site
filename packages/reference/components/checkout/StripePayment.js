// Libraries
import { Component } from 'react'

// Components
import StripeWrapper from './StripeWrapper'
import AddressForm from './AddressForm'

// Objects
import Input from './../../objects/Input'

class StripePayment extends Component {
  render () {
    const { checkout,
      formName,
      onBlur,
      onChange,
      onShowField,
      onToggleCollapsed,
      setBillingShippingAddress } = this.props
    const shippingAddress = checkout.shippingAddress

    return (
      <div className='o-form__wrapper'>
        <StripeWrapper />

        <div className='o-form__input-group'>
          <label>Billing address *</label>
        </div>

        <Input
          type='checkbox'
          label='Same as shipping address'
          name='shippingAddressAsBillingAddress'
          value={checkout.shippingAddressAsBillingAddress}
          formName={formName}
          onChange={setBillingShippingAddress}
          onBlur={onBlur}
        />

        {checkout.shippingAddressAsBillingAddress &&
          <div aria-label='Shipping address to be used for billing' className='o-payment-method__address-summary'>
            <h4>{shippingAddress.first_name}</h4>
            <h4>{shippingAddress.last_name}</h4>
            <p>{shippingAddress.line_1}</p>
            <p>{shippingAddress.line_2}</p>
            <p>{shippingAddress.city}</p>
            <p>{shippingAddress.zipcode}</p>
          </div>
        }

        {!(checkout.shippingAddressAsBillingAddress) &&
          <AddressForm
            aria-label='Billing address form'
            checkout={checkout}
            title='Billing Address'
            formName='billingAddress'
            addressType='billing'
            onChange={onChange}
            onBlur={onBlur}
            onShowField={onShowField}
            onToggleCollapsed={onToggleCollapsed}
          />
        }
      </div>
    )
  }
}

export default StripePayment
