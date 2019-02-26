// Libraries
import { Component } from 'react'
import Router from 'next/router'

// Libs
import { reduxWrapper } from '../../lib/algolia-redux-wrapper'

// Components
import AddressFormSummary from '../../components/checkout/address-form-summary'
import ShippingMethods from '../../components/checkout/shipping-methods'
import withCheckout from '../../components/with-checkout'

export class CheckoutShippingMethodPage extends Component {
  constructor (props) {
    super(props)

    this.nextSection = this.nextSection.bind(this)
  }

  componentDidMount () {
    if (!this.props.cart.shipping_address) {
      Router.push('/checkout/shipping-address')
    }
  }

  nextSection (eventType) {
    Router.push('/checkout/payment')
  }

  continueButtonProps () {
    return {
      'aria-label': 'Continue to Payment',
      label: 'Continue to Payment',
      status: 'positive',
      onClick: () => { this.nextSection('complete') }
    }
  }

  pageTitle = () => 'Shipping Method'

  currentStep = () => 2

  render () {
    const { cart, cart: { shipping_address } } = this.props

    if (!cart.shipping_address) return null

    return (
      <>
        <div className='c-checkout__addressform'>
          <div className='o-form__address'>
            <AddressFormSummary
              firstName={shipping_address.first_name}
              lastName={shipping_address.last_name}
              addressLine1={shipping_address.address_line_1}
              city={shipping_address.city}
              postcode={shipping_address.postcode}
            />
          </div>
        </div>
        <ShippingMethods
          {...this.props}
          nextSection={this.nextSection}
          cart={cart}
        />
      </>
    )
  }
}

export default reduxWrapper(withCheckout(CheckoutShippingMethodPage), CheckoutShippingMethodPage)
