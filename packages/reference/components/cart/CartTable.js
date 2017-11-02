// Libraries
import { Component } from 'react'

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
    const {
      cart
    } = this.props
    const itemsKey = cart.totalQuantity === 1 ? 'item' : 'items'

    return (
      <section>
        <section className='c-cart-table__header'>
          <div className='u-float--left'>
            <h1> My Bag </h1>
          </div>
          <div className='u-float--right'>
            <h4> <b>{ cart.totalQuantity } { itemsKey }</b> in your bag </h4>
          </div>
        </section>
        { this.renderCartData() }
      </section>
    )
  }
}

export default CartTable
