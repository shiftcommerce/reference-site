// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import Link from 'next/link'

// Utils
import { configureStore } from '../utils/configureStore'

// Actions
import { readCheckoutFromLocalStorage,
  toggleCollapsed,
  setShippingMethod,
  setShippingBillingAddress,
  inputChange,
  inputComplete,
  showField } from '../actions/checkoutActions'
import { readCart } from '../actions/cartActions'

// Objects
import Image from '../objects/Image'

// Components
import CustomHead from '../components/CustomHead'
import CheckoutSteps from '../components/checkout/CheckoutSteps.js'
import AddressForm from '../components/checkout/AddressForm.js'
import CheckoutCart from '../components/checkout/CheckoutCart.js'
import CheckoutCartTotal from '../components/checkout/CheckoutCartTotal.js'
import ShippingMethods from '../components/checkout/ShippingMethods.js'
import PaymentMethod from '../components/checkout/PaymentMethod.js'

export class CheckoutPage extends Component {
  constructor (props) {
    super(props)

    this.onToggleCollapsed = this.onToggleCollapsed.bind(this)
    this.setShippingMethod = this.setShippingMethod.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onInputBlur = this.onInputBlur.bind(this)
    this.onShowField = this.onShowField.bind(this)
    this.setBillingShippingAddress = this.setBillingShippingAddress.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(readCheckoutFromLocalStorage())
    this.props.dispatch(readCart())

    if (this.props.cart.lineItems.length === 0) Router.push('/cart')
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

  onShowField (formName, fieldName) {
    this.props.dispatch(showField(formName, fieldName))
  }

  setBillingShippingAddress (event, formName, fieldName) {
    this.props.dispatch(setShippingBillingAddress(formName, fieldName, event.target.checked))
  }

  render () {
    const { checkout, cart } = this.props
    const hasLineItems = cart.lineItems.length > 0
    const paymentMethodCollapsed = checkout.paymentMethod.collapsed

    return (
      <div>
        <CustomHead />
        {hasLineItems &&
          <div>
            <div className='o-header'>
              <span className='o-header__logo'>
                <Link href='/home/index' as='/'>
                  <a>
                    <Image width={200} height={80} />
                  </a>
                </Link>
              </span>
              <CheckoutSteps {...this.props} />
            </div>
            <div className="o-grid-container">
              <div className="o-col-1-13 o-col-1-9-l">
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
                />
                {!paymentMethodCollapsed &&
                  <div className='o-form'>
                    <button className='c-button' onClick={() => { this.onToggleCollapsed('paymentMethod') }}>Review Your Order</button>
                  </div>
                }
              </div>
              <div className="o-col-1-13 o-col-9-13-l">
                <CheckoutCart title='Your Cart' {...this.props} />
                <CheckoutCartTotal {...this.props} />
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    checkout: state.checkout || {},
    cart: state.cart || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(CheckoutPage)
