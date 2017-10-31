// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'

// Utils
import { configureStore } from '../utils/configureStore'

// Actions
import { readCheckoutFromLocalStorage,
  toggleCollapsed,
  setShippingMethod,
  setShippingBillingAddress,
  changePaymentMethod,
  inputChange,
  inputComplete,
  showField } from '../actions/checkoutActions'
import { readCart, initializeCart } from '../actions/cartActions'
import {
  createOrder,
  requestCardToken,
  setCardToken,
  setPaymentError
} from '../actions/orderActions'

// Objects
import Logo from '../objects/Logo'

// Components
import CustomHead from '../components/CustomHead'
import CheckoutSteps from '../components/checkout/CheckoutSteps.js'
import AddressForm from '../components/checkout/AddressForm.js'
import CheckoutCart from '../components/checkout/CheckoutCart.js'
import CheckoutCartTotal from '../components/checkout/CheckoutCartTotal.js'
import ShippingMethods from '../components/checkout/ShippingMethods.js'
import PaymentMethod from '../components/checkout/PaymentMethod.js'

export class CheckoutPage extends Component {
  constructor () {
    super()

    this.onToggleCollapsed = this.onToggleCollapsed.bind(this)
    this.setShippingMethod = this.setShippingMethod.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onInputBlur = this.onInputBlur.bind(this)
    this.onShowField = this.onShowField.bind(this)
    this.setBillingShippingAddress = this.setBillingShippingAddress.bind(this)
    this.convertToOrder = this.convertToOrder.bind(this)
    this.onPaymentMethodChanged = this.onPaymentMethodChanged.bind(this)
    this.onCardTokenReceived = this.onCardTokenReceived.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(readCheckoutFromLocalStorage())
    this.props.dispatch(readCart()).then((cart) => {
      if (cart.lineItems.length === 0) Router.push('/cart')
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

  onToggleCollapsed (componentName) {
    this.props.dispatch(toggleCollapsed(componentName))
  }

  setShippingMethod (shippingMethod) {
    this.props.dispatch(setShippingMethod(shippingMethod))
  }

  onInputChange (event, formName, fieldName) {
    this.props.dispatch(inputChange(formName, fieldName, event.target.value))
  }

  onInputBlur () {
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

  setBillingShippingAddress (event, formName, fieldName) {
    this.props.dispatch(setShippingBillingAddress(formName, fieldName, event.target.checked))
  }

  onCardTokenReceived ({error, token}) {
    if (error) {
      this.props.dispatch(setPaymentError(error.message))
    } else {
      this.props.dispatch(setCardToken(token))
    }
    this.props.dispatch(requestCardToken(false))
  }

  render () {
    const { checkout, cart } = this.props
    const hasLineItems = cart.lineItems.length > 0
    const paymentMethodCollapsed = checkout.paymentMethod.collapsed

    if (checkout.loading) {
      return (
        <p>loading...</p>
      )
    } else if (checkout.error) {
      return (
        <p>{checkout.error}</p>
      )
    } else {
      return (
        <div>
          <CustomHead />
          {hasLineItems &&
            <div>
              <div className='o-header'>
                <Logo className='c-step-indicators__logo u-text-color--primary' />
                <CheckoutSteps {...this.props} />
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
                  <ShippingMethods {...this.props} formName='shippingMethod' setShippingMethod={this.setShippingMethod} />
                  <PaymentMethod
                    formName='paymentMethod'
                    {...this.props}
                    setBillingShippingAddress={this.setBillingShippingAddress}
                    onChange={this.onInputChange}
                    onBlur={this.onInputBlur}
                    onPaymentMethodChanged={this.onPaymentMethodChanged}
                    onCardTokenReceived={this.onCardTokenReceived}
                  />
                  {!paymentMethodCollapsed &&
                    <div className='o-form'>
                      <button className='c-button' onClick={() => { this.onToggleCollapsed('paymentMethod') }}>Review Your Order</button>
                    </div>
                  }
                </div>
                <div className='o-col-1-13 o-col-9-13-l'>
                  <CheckoutCart title='Your Cart' {...this.props} />
                  <CheckoutCartTotal {...this.props} convertToOrder={this.convertToOrder} />
                </div>
              </div>
            </div>
          }
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    checkout: state.checkout || {},
    cart: state.cart || {},
    order: state.order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(CheckoutPage)
