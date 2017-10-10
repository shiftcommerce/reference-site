// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'
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
    const checkout = this.props.checkout
    const paymentMethodCollapsed = checkout.paymentMethod.collapsed

    return (
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
        <div>
          <AddressForm {...this.props}
            title='Shipping Address'
            formName='shippingAddress'
            addressType='shipping'
            onChange={this.onInputChange}
            onBlur={this.onInputBlur}
            onShowField={this.onShowField}
            onToggleCollapsed={this.onToggleCollapsed}
          />
          <CheckoutCart title='Your Cart' {...this.props} />
          <CheckoutCartTotal {...this.props} />
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
