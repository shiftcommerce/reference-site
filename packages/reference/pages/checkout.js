// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'

// Utils
import { configureStore } from '../utils/configureStore'

// Actions
import { readCheckoutFromLocalStorage, toggleCollapsed, setShippingMethod } from '../actions/checkoutActions'
import { readCart } from '../actions/cartActions'

// Objects
import Image from '../objects/Image'

// Components
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
        </div>
        <div>
          <AddressForm {...this.props} title='Shipping Address' formName='shippingAddress' addressType='shipping' dispatch={this.props.dispatch} />
          <CheckoutCart title='Your Cart' {...this.props} />
          <CheckoutCartTotal {...this.props} />
          <ShippingMethods {...this.props} setShippingMethod={this.setShippingMethod} />
          <PaymentMethod formName='paymentMethod' {...this.props} />

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
