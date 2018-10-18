// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'

// Libs
import InputFieldValidator from '../lib/input-field-validator'

// Actions
import { readCheckoutFromLocalStorage,
  toggleCollapsed,
  setShippingMethod,
  changeBillingAddress,
  setValidationMessage,
  changePaymentMethod,
  inputChange,
  inputComplete,
  showField } from '../actions/checkout-actions'
import { readCart, initializeCart, updateQuantity } from '../actions/cart-actions'
import {
  createOrder,
  requestCardToken,
  setCardToken,
  setPaymentError,
  setCardErrors
} from '../actions/order-actions'

// Objects
import Logo from '../objects/logo'

// Components
import CustomHead from '../components/custom-head'
import CheckoutSteps from '../components/checkout/checkout-steps'
import AddressForm from '../components/checkout/address-form'
import CheckoutCart from '../components/checkout/checkout-cart'
import CheckoutCartTotal from '../components/checkout/checkout-cart-total'
import ShippingMethods from '../components/checkout/shipping-methods'
import PaymentMethod from '../components/checkout/payment-method'
import PromoInput from '../components/promo-input'

export class CheckoutPage extends Component {
  static async getInitialProps ({ reduxStore }) {
    return {}
  }
  constructor () {
    super()

    this.onToggleCollapsed = this.onToggleCollapsed.bind(this)
    this.nextSection = this.nextSection.bind(this)
    this.setShippingMethod = this.setShippingMethod.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onInputBlur = this.onInputBlur.bind(this)
    this.onShowField = this.onShowField.bind(this)
    this.changeBillingAddress = this.changeBillingAddress.bind(this)
    this.convertToOrder = this.convertToOrder.bind(this)
    this.onPaymentMethodChanged = this.onPaymentMethodChanged.bind(this)
    this.onCardTokenReceived = this.onCardTokenReceived.bind(this)
    this.setCardErrors = this.setCardErrors.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(readCheckoutFromLocalStorage())
    this.props.dispatch(readCart()).then((cart) => {
      if (cart.totalQuantity === 0) Router.push('/cart')
    })
  }

  componentWillReceiveProps (props) {
    const prevOrder = this.props.order
    const newOrder = props.order
    // Only when new order got created,
    // Redirect to order confirmation page
    if (newOrder && newOrder.id && newOrder.id !== prevOrder.id) {
      Router.push('/order')
      props.dispatch(initializeCart())
    }
  }

  updateQuantity (e) {
    const lineItem = {
      sku: e.target.dataset.variant,
      quantity: parseInt(e.target.value, 10)
    }
    this.props.dispatch(updateQuantity(lineItem))
  }

  deleteItem (e) {
    e.preventDefault()
    const lineItem = {
      sku: e.target.dataset.variant,
      quantity: 0
    }
    this.props.dispatch(updateQuantity(lineItem))
    if (this.props.cart.lineItems.length === 0) {
      Router.push('/cart')
    }
  }

  nextSection (eventType) {
    const { checkout } = this.props

    let componentName

    if (checkout.currentStep === 1) {
      componentName = 'shippingAddress'
    } else if (checkout.currentStep === 2) {
      componentName = 'shippingMethod'
    } else if (checkout.currentStep === 3) {
      componentName = 'paymentMethod'
    }

    window.scrollTo(0, 0)
    this.props.dispatch(toggleCollapsed(eventType, componentName))
  }

  onToggleCollapsed (eventType, componentName) {
    window.scrollTo(0, 0)
    this.props.dispatch(toggleCollapsed(eventType, componentName))
  }

  setShippingMethod (shippingMethod) {
    this.props.dispatch(setShippingMethod(shippingMethod))
  }

  onInputChange (event, formName, fieldName, fieldValue) {
    this.props.dispatch(inputChange(formName, fieldName, fieldValue))
  }

  validateInput (formName, fieldName, fieldValue, rules) {
    let validationMessage = new InputFieldValidator(fieldName, fieldValue, rules).validate()
    this.props.dispatch(setValidationMessage(formName, fieldName, validationMessage))
  }

  onInputBlur (event, formName, fieldName, fieldValue, rules) {
    this.validateInput(formName, fieldName, fieldValue, rules)
    this.props.dispatch(inputComplete())
  }

  convertToOrder (event) {
    if (this.props.checkout.paymentMethod.selectedMethod === 'card') {
      this.props.dispatch(requestCardToken(true))
    } else {
      this.props.dispatch(createOrder(this.props.cart, this.props.checkout, this.props.order))
    }
  }

  onShowField (formName, fieldName) {
    this.props.dispatch(showField(formName, fieldName))
  }

  onPaymentMethodChanged (paymentMethod) {
    this.props.dispatch(changePaymentMethod(paymentMethod))
  }

  onCardTokenReceived ({ error, token }) {
    if (error) {
      this.props.dispatch(setPaymentError(error.message))
    } else {
      this.props.dispatch(setCardToken(token))
    }
    this.props.dispatch(requestCardToken(false))
  }

  setCardErrors (error) {
    this.props.dispatch(setCardErrors(error))
  }

  changeBillingAddress (event, formName, fieldName) {
    this.props.dispatch(changeBillingAddress(formName, fieldName, event.target.checked))
  }

  isPaymentValid () {
    let billingAddressErrors = this.props.checkout.billingAddress.errors
    const isCardValid = !this.props.order.cardErrors
    const isBillingAddressValid = Object.keys(billingAddressErrors).every((key) => billingAddressErrors[key] === '') === true
    return isBillingAddressValid && isCardValid
  }

  render () {
    const { checkout, cart } = this.props
    const hasLineItems = cart.totalQuantity > 0
    if (checkout.loading) {
      return (
        <div>
          <CustomHead />
          loading...
        </div>
      )
    } else if (checkout.error) {
      return (
        <p>{ checkout.error }</p>
      )
    } else {
      return (
        <>
          <CustomHead />
          {hasLineItems &&
            <>
              <div className='o-header'>
                <div className='c-step-indicators__logo'>
                  <Logo className='u-text-color--primary' />
                </div>
                <div>
                  <CheckoutSteps {...this.props} />
                </div>
              </div>
              <div className='o-grid-container'>
                <div className='o-col-1-13 o-col-1-9-l'>
                  <AddressForm {...this.props}
                    title='Shipping Address'
                    formName='shippingAddress'
                    addressType='shipping'
                    onChange={this.onInputChange}
                    onBlur={this.onInputBlur}
                    onShowField={this.onShowField}
                    onToggleCollapsed={this.onToggleCollapsed}
                  />
                  <ShippingMethods
                    {...this.props}
                    formName='shippingMethod'
                    setShippingMethod={this.setShippingMethod}
                    onToggleCollapsed={this.onToggleCollapsed}
                  />
                  <PaymentMethod
                    formName='paymentMethod'
                    {...this.props}
                    changeBillingAddress={this.changeBillingAddress}
                    onChange={this.onInputChange}
                    onBlur={this.onInputBlur}
                    onPaymentMethodChanged={this.onPaymentMethodChanged}
                    onToggleCollapsed={this.onToggleCollapsed}
                    onCardTokenReceived={this.onCardTokenReceived}
                    setCardErrors={this.setCardErrors}
                  />
                </div>
                <PromoInput />
                <div className='o-col-1-13 o-col-9-13-l c-cart-table'>
                  <CheckoutCart title='Your Cart' {...this.props} updateQuantity={this.updateQuantity} deleteItem={this.deleteItem} />
                  <CheckoutCartTotal {...this.props} convertToOrder={this.convertToOrder} onClick={() => { this.nextSection('complete') }} />
                </div>
              </div>
            </>
          }
        </>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    checkout: state.checkout || {},
    cart: state.cart || {},
    order: state.order || {},
    ip: state.ip
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
