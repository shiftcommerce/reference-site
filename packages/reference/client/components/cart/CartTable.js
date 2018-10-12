// Libraries
import { Component } from 'react'
import Pluralize from 'react-pluralize'

// Lib
import { fixedPrice } from '../../lib/fixedPrice'
import { calculateCartSummary } from '../../lib/calculateCartSummary'

// Components
import LineItems from './LineItems'
import CartSummary from './CartSummary'
import CartNoData from './CartNoData'

class CartTable extends Component {
  renderCartData () {
    const cart = this.props.cart

    if (cart.totalQuantity === 0) {
      return <CartNoData />
    } else {
      return <section className='u-float-clear'>
        <LineItems {...this.props} aria-label='Line Items' />
        <CartSummary {...this.props} aria-label='Cart Summary' />
      </section>
    }
  }

  render () {
    const { cart } = this.props

    const totals = calculateCartSummary(cart)

    return (
      <section className='c-cart-table c-cart-table--margin'>
        <section className='c-cart-table__header'>
          <div className='u-float--left'>
            <h1 className='c-cart-table__title'> Your Shopping Basket <a className='c-cart-table__amount'>({ cart.totalQuantity })</a> </h1>
            <p className='c-cart-table__description'>You have <a>{ cart.totalQuantity }</a> <Pluralize singular='item' count={cart.totalQuantity} showCount={false} /> in your shopping basket</p>
            <p className='c-cart-table__description'><Pluralize singular='This' plural='These' count={cart.totalQuantity} showCount={false} /> <Pluralize singular='item' count={cart.totalQuantity} showCount={false} /> will be saved for 48 hours depending on availablility</p>
          </div>
          <div>
            <h4 className='c-cart-table__total'>&pound;{ fixedPrice(totals.total) }</h4>
          </div>
        </section>
        { this.renderCartData() }
      </section>
    )
  }
}

export default CartTable
