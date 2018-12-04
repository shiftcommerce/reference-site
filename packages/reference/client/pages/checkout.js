// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import Head from 'next/head'

// Libs
import InputFieldValidator from '../lib/input-field-validator'
import { reduxWrapper } from '../lib/algolia-redux-wrapper'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'

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
import {
  fetchAddressBook,
  saveToAddressBook
} from '../actions/address-book-actions'

// Components
import CheckoutSteps from '../components/checkout/checkout-steps'
import AddressForm from '../components/checkout/address-form'
import CheckoutCart from '../components/checkout/checkout-cart'
import CheckoutCartTotal from '../components/checkout/checkout-cart-total'
import ShippingMethods from '../components/checkout/shipping-methods'
import PaymentMethod from '../components/checkout/payment-method'
import PaymentIcons from '../components/cart/payment-icons'
import PromoInput from '../components/promo-input'
import Loading from '../components/loading'

export class CheckoutPage extends Component {
  static async getInitialProps ({ reduxStore }) {
    await reduxStore.dispatch(fetchAddressBook())
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

  componentDidUpdate (prevProps) {
    const prevOrder = prevProps.order
    const newOrder = this.props.order
    // Only when new order got created,
    // Redirect to order confirmation page
    if (newOrder && newOrder.id && newOrder.id !== prevOrder.id) {
      Router.push('/order')
      this.props.dispatch(initializeCart())
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

    this.onToggleCollapsed(eventType, componentName)
  }

  onToggleCollapsed (eventType, componentName) {
    const { dispatch, checkout } = this.props

    if (componentName === 'shippingAddress' && checkout.shippingAddress.saveToAddressBook) {
      dispatch(saveToAddressBook(checkout.shippingAddress))
    }

    if (componentName === 'paymentMethod' && checkout.billingAddress.saveToAddressBook) {
      dispatch(saveToAddressBook(checkout.billingAddress))
    }

    window.scrollTo(0, 0)
    dispatch(toggleCollapsed(eventType, componentName))
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

  renderPageTitle () {
    return (
      <Head>
        <title>{ suffixWithStoreName('Checkout') }</title>
      </Head>
    )
  }

  render () {
    const { checkout: { loading, error, flashError }, cart } = this.props
    const hasLineItems = cart.totalQuantity > 0

    if (loading) {
      return (
        <>
          { this.renderPageTitle() }
          <Loading />
        </>
      )
    } else if (error) {
      return (
        <p>{ error }</p>
      )
    } else {
      return (
        <>
          { this.renderPageTitle() }
          <p>{ flashError }</p>
          {hasLineItems &&
            <>
              <div className='o-header--checkout'>
                <div className='c-checkout__steps'>
                  <CheckoutSteps {...this.props} />
                </div>
              </div>
              <div className='c-checkout'>
                <div className='o-grid-container'>
                  <div className='o-col-1-13 o-col-1-8-l'>
                    <div className='c-checkout__addressform'>
                      <AddressForm {...this.props}
                        title='Shipping Address'
                        formName='shippingAddress'
                        addressType='shipping'
                        onChange={this.onInputChange}
                        onBlur={this.onInputBlur}
                        onShowField={this.onShowField}
                        onToggleCollapsed={this.onToggleCollapsed}
                      />
                    </div>
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
                  <div className='o-col-1-13 o-col-8-13-l'>
                    <div className='c-checkout__cart'>
                      <CheckoutCart title='Your Cart' {...this.props} updateQuantity={this.updateQuantity} deleteItem={this.deleteItem} />
                      <PromoInput />
                      <CheckoutCartTotal {...this.props} convertToOrder={this.convertToOrder} onClick={() => { this.nextSection('complete') }} />
                      <div className='c-checkout__payment'>
                        <PaymentIcons />
                      </div>
                    </div>
                  </div>
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
    login: state.login,
    ip: state.ip
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default reduxWrapper(connect(mapStateToProps, mapDispatchToProps)(CheckoutPage), CheckoutPage)
