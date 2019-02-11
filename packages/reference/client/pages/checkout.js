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
  changeBillingAddress,
  setValidationMessage,
  changePaymentMethod,
  inputChange,
  inputComplete,
  showField } from '../actions/checkout-actions'
import { readCart, updateLineItemQuantity, deleteLineItem, setCartShippingAddress, setCartBillingAddress, createShippingAddress, createBillingAddress } from '../actions/cart-actions'
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

import CouponForm from '../components/coupon-form'
import MiniPlaceOrder from '../components/checkout/mini-place-order'
import { Loading, PaymentIcons } from 'shift-react-components'

export class CheckoutPage extends Component {
  static async getInitialProps ({ reduxStore }) {
    await reduxStore.dispatch(fetchAddressBook())
    return {}
  }

  constructor () {
    super()

    this.onToggleCollapsed = this.onToggleCollapsed.bind(this)
    this.nextSection = this.nextSection.bind(this)
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

  componentDidUpdate (prevProps) {
    const prevOrder = prevProps.order
    const newOrder = this.props.order
    // Only when new order got created,
    // Redirect to order confirmation page
    if (newOrder && newOrder.id && newOrder.id !== prevOrder.id) {
      Router.push('/order')
    }
  }

  // This causes an infinite loop in development when placing an order as HMR runs and rebundles the
  // client and so tries to redirect to both /cart and /order.  This is fine in production and should
  // hopefully be fixed in Nextjs 8
  componentDidMount () {
    this.props.dispatch(readCheckoutFromLocalStorage())
    this.props.dispatch(readCart()).then(() => {
      if (!this.props.cart.line_items_count) Router.push('/cart')
    })
  }

  updateQuantity (e) {
    this.props.dispatch(updateLineItemQuantity(e.target.dataset.id, parseInt(e.target.value, 10)))
  }

  deleteItem (e) {
    e.preventDefault()
    this.props.dispatch(deleteLineItem(e.target.dataset.id)).then(() => {
      if (this.props.cart.line_items.length === 0) {
        Router.push('/cart')
      }
    })
  }

  nextSection (eventType) {
    const { dispatch, checkout } = this.props

    let componentName

    if (checkout.currentStep === 1) {
      componentName = 'shippingAddress'

      if (checkout.shippingAddress.saveToAddressBook) {
        dispatch(saveToAddressBook(checkout.shippingAddress)).then(() => {
          dispatch(setCartShippingAddress(checkout.shippingAddress.id))
        })
      } else if (checkout.shippingAddress.id) {
        dispatch(setCartShippingAddress(checkout.shippingAddress.id))
      } else {
        dispatch(createShippingAddress(checkout.shippingAddress)).then(() => {
          dispatch(setCartShippingAddress(checkout.shippingAddress.id))
        })
      }
    } else if (checkout.currentStep === 2) {
      componentName = 'shippingMethod'
    } else if (checkout.currentStep === 3) {
      componentName = 'paymentMethod'

      if (checkout.billingAddress.saveToAddressBook) {
        dispatch(saveToAddressBook(checkout.billingAddress, { billing: true })).then(() => {
          dispatch(setCartBillingAddress(checkout.billingAddress.id))
        })
      } else if (checkout.shippingAddressAsBillingAddress) {
        dispatch(setCartBillingAddress(checkout.shippingAddress.id))
      } else {
        dispatch(createBillingAddress(checkout.billingAddress)).then(() => {
          dispatch(setCartBillingAddress(checkout.billingAddress.id))
        })
      }
    }

    this.onToggleCollapsed(eventType, componentName)
  }

  onToggleCollapsed (eventType, componentName) {
    const { dispatch } = this.props

    window.scrollTo(0, 0)
    dispatch(toggleCollapsed(eventType, componentName))
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
      this.props.dispatch(createOrder(this.props.cart, this.props.checkout, this.props.order)).then(() => {
        Router.push('/order')
      })
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
    const hasLineItems = cart.line_items_count > 0

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
              <MiniPlaceOrder {...this.props} convertToOrder={this.convertToOrder} onClick={() => { this.nextSection('complete') }} />
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
                        nextSection={this.nextSection}
                        addressInAddressBook={this.addressInAddressBook}
                      />
                    </div>
                    <ShippingMethods
                      {...this.props}
                      formName='shippingMethod'
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
                      <CouponForm dispatch={this.props.dispatch} />
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
