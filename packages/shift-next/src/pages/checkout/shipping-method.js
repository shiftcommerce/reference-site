// Libraries
import React, { Component } from 'react'
import Router from 'next/router'
import Cookies from 'js-cookie'

// Libs
import ApiClient from '../../lib/api-client'

// Actions
import {
  fetchShippingMethodsRequest,
  setCartShippingMethod
} from '../../actions/cart-actions'

import {
  updatePayPalOrderTotal
} from '../../actions/checkout-actions'

// Components
import { AddressFormSummary } from '@shiftcommerce/shift-react-components/src/components/checkout/address-form-summary'
import { Loading } from '@shiftcommerce/shift-react-components/src/objects/loading'
import { PaymentMethodSummary } from '@shiftcommerce/shift-react-components/src/components/checkout/payment-method-summary'
import { ShippingMethods } from '@shiftcommerce/shift-react-components/src/components/checkout/shipping-methods'

export class ShippingMethodPage extends Component {
  static async fetchShippingMethods () {
    try {
      const request = fetchShippingMethodsRequest()
      const response = await new ApiClient().read(request.endpoint, request.query)

      return response.data
    } catch (error) {
      return { error }
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      payPalOrderID: Cookies.get('ppOrderID'),
      paymentMethod: Cookies.get('paymentMethod'),
      purchaseUnitsReferenceID: Cookies.get('purchaseUnitsReferenceID'),
      payPalOrderUpdateError: false
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleSetShippingMethod = this.handleSetShippingMethod.bind(this)
    this.nextSection = this.nextSection.bind(this)
  }

  async componentDidMount () {
    const { cart, thirdPartyPaymentMethods } = this.props
    if (!cart.shipping_address) {
      if (thirdPartyPaymentMethods.includes(this.state.paymentMethod)) {
        // If shipping address is not present and customer has used third party payment service
        // redirect to the payment method page
        return Router.push('/checkout/payment-method')
      } else {
        return Router.push('/checkout/shipping-address')
      }
    }

    if (!cart.billing_address && thirdPartyPaymentMethods.includes(this.state.paymentMethod)) {
      // If billing address is not present and customer has used third party payment service
      // redirect to the payment method page
      return Router.push('/checkout/payment-method')
    }

    const shippingMethods = (await this.constructor.fetchShippingMethods()).data.sort((method1, method2) => method1.total - method2.total)

    if (!cart.shipping_method) {
      this.props.dispatch(setCartShippingMethod(shippingMethods[0].id))
    }

    this.setState({
      shippingMethods: shippingMethods,
      loading: false
    })
  }

  /**
   * When the form is submitted, move onto the next section
   * @param  {object} event
   */
  handleFormSubmit (event) {
    event.preventDefault()
    if (this.state.paymentMethod === 'PayPal') {
      // handle form submit for order placed via PayPal
      this.handleFormSubmitForPayPalOrder()
    } else {
      // redirect to next step
      this.nextSection()
    }
  }

  /**
   * Handles form submit for order placed via PayPal
   */
  handleFormSubmitForPayPalOrder () {
    // set loading to true as we handle the order information
    this.setState({ loading: true })
    // update PayPal order total
    return this.props.dispatch(updatePayPalOrderTotal(this.state.payPalOrderID, this.state.purchaseUnitsReferenceID, this.props.cart)).then(() => {
      const paymentError = (this.props.order.paymentResponseErrors.error && this.props.order.paymentResponseErrors.error.data)
      if (!paymentError) {
        // redirect to next step
        this.nextSection()
      } else {
        // set loading to false
        this.setState({ loading: false, payPalOrderUpdateError: true })
      }
    })
  }

  /**
   * Formats form errors
   */
  formSubmissionError () {
    // check for any PayPal error messages
    if (this.state.payPalOrderUpdateError) {
      // return custom message as PayPal error is not user friendly
      return 'Sorry! There has been a problem with your selection. Please try again.'
    } else {
      return null
    }
  }

  /**
   * When a shipping method is selected, dispatch that to the api, and add the
   * current shipping method to the state
   * @param  {object} shippingMethod
   */
  handleSetShippingMethod (shippingMethod) {
    this.props.dispatch(setCartShippingMethod(shippingMethod.id))
    this.setState({ selectedShippingMethod: shippingMethod })
  }

  nextSection () {
    const { setCurrentStep, thirdPartyPaymentMethods } = this.props

    if (thirdPartyPaymentMethods.includes(this.state.paymentMethod)) {
      // If customer has used third party payment service, redirect to the order review page
      Router.push('/checkout/payment', '/checkout/review')
      setCurrentStep(5)
    } else {
      Router.push('/checkout/payment')
    }
  }

  continueButtonProps () {
    const { thirdPartyPaymentMethods } = this.props
    const label = (thirdPartyPaymentMethods.includes(this.state.paymentMethod) ? 'Review Your Order' : 'Continue to Payment')

    return {
      'aria-label': label,
      label: label,
      status: 'positive',
      onClick: () => { this.nextSection() }
    }
  }

  pageTitle = () => 'Shipping Method'

  currentStep = () => 3

  render () {
    const { cart, thirdPartyPaymentMethods } = this.props

    if (!cart.shipping_address) return null

    return (
      <div>
        <PaymentMethodSummary
          onClick={() => Router.push('/checkout/payment-method')}
          paymentMethod={this.state.paymentMethod}
          headerTitle={'Payment Method'}
          showEditButton={true}
        />
        <div className='c-checkout__addressform'>
          <div className='o-form__address'>
            <AddressFormSummary
              addressLine1={cart.shipping_address.address_line_1}
              city={cart.shipping_address.city}
              firstName={cart.shipping_address.first_name}
              lastName={cart.shipping_address.last_name}
              onClick={() => Router.push('/checkout/shipping-address')}
              postcode={cart.shipping_address.postcode}
              showEditButton={!thirdPartyPaymentMethods.includes(this.state.paymentMethod)}
              headerTitle={'Shipping Address'}
            />
          </div>
        </div>
        { this.state.loading ? <Loading /> : <ShippingMethods
          cartLineItemsCount={cart.line_items_count}
          cartShippingMethod={cart.shipping_method}
          handleFormSubmit={this.handleFormSubmit}
          handleSetShippingMethod={this.handleSetShippingMethod}
          shippingMethods={this.state.shippingMethods}
          isThirdPartyPayment={thirdPartyPaymentMethods.includes(this.state.paymentMethod)}
          errorMessage={ this.formSubmissionError() }
        /> }
      </div>
    )
  }
}

export default ShippingMethodPage
