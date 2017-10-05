// Libraries
import { Component } from 'react'

// Components
import AddressForm from './AddressForm'
import CheckboxInputGroup from './CheckboxInputGroup'

// Actions
import { toggleCollapsed } from '../../actions/checkoutActions'

export default class PaymentMethod extends Component {
  onToggleCollapsed () {
    return (
      this.props.dispatch(toggleCollapsed(this.props.formName))
    )
  }

  constructor () {
    super()
    this.onToggleCollapsed = this.onToggleCollapsed.bind(this)
  }

  renderSecurityFields () {
    // Example data
    const months = [
      '', '01', '02', '03', '04', '05', '06',
      '07', '08', '09', '10', '11', '12'
    ]

    const years = [ '', '17', '18', '19', '20', '21', '22' ]

    const monthDropdown = months.map((month, index) =>
      <option value={parseInt(month)} key={index}>
        {month}
      </option>
    )

    const yearDropdown = years.map((year, index) =>
      <option value={parseInt(year)} key={index}>
        {year}
      </option>
    )

    return <div className='o-payment-method__security-fields'>
      <label className='o-payment-method__label' aria-label='Card expiry date' htmlFor='expiry_month'>Expiration *</label>
      <select className='o-payment-method__input' aria-label='Expiry month' id='expiry_month' required='required'>
        {monthDropdown}
      </select>
      <span className='o-payment-method__text'>
        /
      </span>

      <select className='o-payment-method__input' aria-label='Expiry year' id='expiry_year' required='required'>
        {yearDropdown}
      </select>

      <label className='o-payment-method__label-cvv' aria-label='CVV security code' htmlFor='cvv'>
        CVV *
        <span className='o-payment-method__text'>Hint</span>
      </label>
      <input className='o-payment-method__input' type='text' id='cvv' required='required' />
    </div>
  }

  render () {
    const {checkout, formName} = this.props
    const paymentMethod = checkout.paymentMethod
    const shippingAddress = checkout.shippingAddress
    const billingAddress = paymentMethod.shippingAddressAsBillingAddress ? shippingAddress : checkout.billingAddress
    const collapsed = paymentMethod.collapsed

    return <div aria-label='Payment method' className='o-form'>
      <h3>Payment Method</h3>

      {collapsed &&
        <div>
          <button aria-label='Edit payment method' className='c-button' onClick={this.onToggleCollapsed}>Edit</button>

          <div aria-label='Payment method summary' className='o-form__wrapper'>
            <p>
              <span>VISA **** **** **** 1607 </span>
              <span>Exp: 01/24</span>
            </p>
            <p>
              <span className='u-bold'>Billing address: {billingAddress.fullName}, </span>
              <span>{billingAddress.address1}, {billingAddress.city}, {billingAddress.postCode}</span>
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

              <CheckboxInputGroup
                fieldLabel='Same as shipping address'
                fieldName='shippingAddressAsBillingAddress'
                fieldValue={paymentMethod.shippingAddressAsBillingAddress}
                formName={formName}
                dispatch={this.props.dispatch}
              />
            </form>

            {paymentMethod.shippingAddressAsBillingAddress &&
              <div aria-label='Shipping address to be used for billing' className='o-payment-method__address-summary'>
                <h4>{shippingAddress.fullName}</h4>
                <p>{shippingAddress.address1}</p>
                <p>{shippingAddress.address2}</p>
                <p>{shippingAddress.city}</p>
                <p>{shippingAddress.postCode}</p>
              </div>
            }

            {!(paymentMethod.shippingAddressAsBillingAddress) &&
              <AddressForm aria-label='Billing address form' checkout={this.props.checkout} title='Billing Address' formName='billingAddress' addressType='billing' dispatch={this.props.dispatch} />
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
