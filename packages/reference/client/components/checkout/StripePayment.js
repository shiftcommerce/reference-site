// Libraries
import { Component } from 'react'

// Components
import StripeWrapper from './StripeWrapper'
import AddressForm from './AddressForm'

// Objects
import Checkbox from './../../objects/Checkbox'

class StripePayment extends Component {
  render () {
    const { checkout,
      formName,
      onBlur,
      onChange,
      onShowField,
      onToggleCollapsed,
      onCardTokenReceived,
      changeBillingAddress,
      setCardErrors,
      order } = this.props
    const shippingAddress = checkout.shippingAddress

    return (
      <div>
        <div className='o-form__background'>
          <div className='o-form__wrapper'>
            <StripeWrapper
              cardTokenRequested={order.cardTokenRequested}
              onCardTokenReceived={onCardTokenReceived}
              setCardErrors={setCardErrors}
              checkout={checkout}
            />

            <div className='o-form__input-group'>
              <label>Billing address *</label>
            </div>

            <Checkbox
              type='checkbox'
              label='Same as shipping address'
              name='shippingAddressAsBillingAddress'
              checked={!!checkout.shippingAddressAsBillingAddress}
              formName={formName}
              onChange={changeBillingAddress}
              onBlur={onBlur}
            />

            {checkout.shippingAddressAsBillingAddress &&
              <div aria-label='Shipping address to be used for billing' className='o-payment-method__address-summary  c-payment-method__address-summary'>
                <p className='u-bold'>{`${shippingAddress.first_name} ${shippingAddress.last_name}`}</p>
                <p>{shippingAddress.line_1}</p>
                <p>{shippingAddress.line_2}</p>
                <p>{shippingAddress.city}</p>
                <p>{shippingAddress.zipcode}</p>
              </div>
            }
          </div>
        </div>

        {!(checkout.shippingAddressAsBillingAddress) &&
          <AddressForm
            aria-label='Billing address form'
            checkout={checkout}
            title='Billing Address'
            formName='billingAddress'
            addressType='billing'
            onChange={onChange}
            onBlur={onBlur}
            className='o-form__billing'
            onShowField={onShowField}
            onToggleCollapsed={onToggleCollapsed}
          />
        }
      </div>
    )
  }
}

export default StripePayment
