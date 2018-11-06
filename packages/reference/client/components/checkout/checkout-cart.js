// Libraries
import { Component } from 'react'
import Pluralize from 'react-pluralize'

// Lib
import { fixedPrice } from '../../lib/fixed-price'
import { calculateCartSummary } from '../../lib/calculate-cart-summary'

// Components
import LineItems from '../../components/cart/line-items'

export class CheckoutCart extends Component {
  render () {
    const { cart, checkout } = this.props
    const totals = calculateCartSummary(cart, checkout)
    return <>
      <section className='c-checkout-cart__header'>
        <div className='u-float--left c-checkout-cart__table'>
          <h1 className='c-checkout-cart__title'> Your Shopping Basket <a className='c-checkout-cart__amount'>({ cart.totalQuantity })</a></h1>
          <h4 className='c-checkout-cart__total'>&pound;{ fixedPrice(totals.total) }</h4>
          <div className='c-checkout-cart__text'>
            <p className='c-checkout-cart__description'>You have <a>{ cart.totalQuantity }</a> <Pluralize singular='item' count={cart.totalQuantity} showCount={false} /> in your shopping basket</p>
            <p className='c-checkout-cart__description'><Pluralize singular='This' plural='These' count={cart.totalQuantity} showCount={false} /> <Pluralize singular='item' count={cart.totalQuantity} showCount={false} /> will be saved for 48 hours depending on availablility</p>
          </div>
        </div>
      </section>
      <LineItems cart={cart} updateQuantity={this.props.updateQuantity} />
    </>
  }
}

export default CheckoutCart
