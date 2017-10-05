// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'

// Utils
import { configureStore } from '../utils/configureStore'

// Actions
import { readCheckoutFromLocalStorage, setShippingMethod } from '../actions/checkoutActions'
import { readCart } from '../actions/cartActions'

// Objects
import Image from '../objects/Image'

// Components
import AddressForm from '../components/checkout/AddressForm.js'
import ShippingMethods from '../components/checkout/ShippingMethods.js'
import CheckoutCartTotal from '../components/checkout/CheckoutCartTotal.js'

export class CheckoutPage extends Component {
  constructor (props) {
    super(props)

    this.setShippingMethod = this.setShippingMethod.bind(this)
  }
  componentDidMount () {
    this.props.dispatch(readCheckoutFromLocalStorage())
    this.props.dispatch(readCart())
  }

  setShippingMethod (shippingMethod) {
    this.props.dispatch(setShippingMethod(shippingMethod))
  }

  render () {
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
          <AddressForm { ...this.props } title='Shipping Address' formName='shippingAddress' addressType='shipping' dispatch={this.props.dispatch} />
          <ShippingMethods { ...this.props } setShippingMethod={this.setShippingMethod} />
          <CheckoutCartTotal {...this.props} />
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
