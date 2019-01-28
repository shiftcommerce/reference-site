// Libraries
import { Component } from 'react'
import Pluralize from 'react-pluralize'

// Lib
import { decimalPrice } from '../../lib/decimal-price'

// Components
import LineItems from '../../components/cart/line-items'

export class CheckoutCart extends Component {
  render () {
    const { cart } = this.props
    return <>
      <section className='c-checkout-cart__header'>
        <div className='u-float--left c-checkout-cart__table'>
          <h1 className='c-checkout-cart__title'> Your Shopping Basket <a className='c-checkout-cart__amount'>({ cart.line_items_count })</a></h1>
          <h4 className='c-checkout-cart__total'>&pound;{ decimalPrice(cart.total) }</h4>
          <div className='c-checkout-cart__text'>
            <p className='c-checkout-cart__description'>You have <a>{ cart.line_items_count }</a> <Pluralize singular='item' count={cart.line_items_count} showCount={false} /> in your shopping basket</p>
            <p className='c-checkout-cart__description'><Pluralize singular='This' plural='These' count={cart.line_items_count} showCount={false} /> <Pluralize singular='item' count={cart.line_items_count} showCount={false} /> will be saved for 48 hours depending on availablility</p>
          </div>
        </div>
      </section>
      <LineItems cart={cart} updateQuantity={this.props.updateQuantity} deleteItem={this.props.deleteItem} />
    </>
  }
}

export default CheckoutCart
