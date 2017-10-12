// Libraries
import { Component } from 'react'

// Components
import AddressForm from './AddressForm'

// Objects
import Input from './../../objects/Input'
import DropdownSelect from './../../objects/DropdownSelect'

export default class PaymentMethod extends Component {
  renderSecurityFields () {
    // Example data
    const months = [
      '01', '02', '03', '04', '05', '06',
      '07', '08', '09', '10', '11', '12'
    ]

    const years = [ '17', '18', '19', '20', '21', '22' ]

    return (
      <div className='o-payment-method__security-fields'>
        <label className='o-payment-method__label' aria-label='Card expiry date' htmlFor='expiry_month'>Expiration *</label>
        <DropdownSelect
          className='o-payment-method__input'
          name='expiry_month'
          prompt='Select a Month'
          options={months}
          id='expiry_month'
          required='required'
          aria-label='Expiry month'
        />

        <span className='o-payment-method__text'>
          /
        </span>
        <DropdownSelect
          className='o-payment-method__input'
          name='expiry_year'
          prompt='Select a Year'
          options={years}
          id='expiry_year'
          required='required'
          aria-label='Expiry year'
        />

        <label className='o-payment-method__label-cvv' aria-label='CVV security code' htmlFor='cvv'>
          CVV *
          <span className='o-payment-method__text'>Hint</span>
        </label>
        <input className='o-payment-method__input' type='text' id='cvv' required='required' />
      </div>
    )
  }

  render () {
    const { checkout,
      formName,
      onBlur,
      onChange,
      onShowField,
      onToggleCollapsed,
      setBillingShippingAddress } = this.props
    const paymentMethod = checkout.paymentMethod
    const shippingAddress = checkout.shippingAddress
    const billingAddress = checkout.shippingAddressAsBillingAddress ? shippingAddress : checkout.billingAddress
    const collapsed = paymentMethod.collapsed

    return <div aria-label='Payment method' className='o-form'>
      <h3>Payment Method</h3>

      {collapsed &&
        <div>
          <button aria-label='Edit payment method' className='c-button' onClick={() => onToggleCollapsed(formName)}>Edit</button>

          <div aria-label='Payment method summary' className='o-form__wrapper'>
            <p>
              <span>VISA **** **** **** 1607 </span>
              <span>Exp: 01/24</span>
            </p>
            <p>
              <span className='u-bold'>Billing address: {billingAddress.full_name}, </span>
              <span>{billingAddress.line_1}, {billingAddress.city}, {billingAddress.zipcode}</span>
            </p>
          </div>
        </div>
      }

      {!collapsed &&
        <div>
          <button aria-label='Use credit or debit card' className='c-button'>Credit / Debit card</button>
          <button aria-label='Use paypal' className='c-button c-button--disabled' disabled='disabled'>Paypal</button>

          <div className='o-form__wrapper'>
            <form>
              <div className='o-form__input-group'>
                <label aria-label='Credit or debit card number' htmlFor='card_number'>Credit / Debit Card Number *</label>
                <input type='text' id='card_number' required='required' />
              </div>

              {this.renderSecurityFields()}

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
            </form>

            {checkout.shippingAddressAsBillingAddress &&
              <div aria-label='Shipping address to be used for billing' className='o-payment-method__address-summary'>
                <h4>{shippingAddress.full_name}</h4>
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
        </div>
      }

      <div aria-label='Use gift card or rewards code' className='o-form__wrapper'>
        <p>
          + Use a Gift Card / Rewards Code
        </p>
      </div>
    </div>
  }
}
