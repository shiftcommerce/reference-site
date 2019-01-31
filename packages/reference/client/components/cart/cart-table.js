// Libraries
import { Component } from 'react'
import Pluralize from 'react-pluralize'
import t from 'typy'

// Lib
import { decimalPrice } from '../../lib/decimal-price'

// Components
import LineItems from './line-items'
import CartSummary from './cart-summary'
import CartNoData from './cart-no-data'
import PaymentIcons from './payment-icons'
import CouponForm from '../coupon-form'

// Fixtures
import ShippingMethods from '../../static/shipping-methods.json'

// Objects
import { Breadcrumb } from 'shift-react-components'

class CartTable extends Component {
  renderCartData () {
    const { cart } = this.props

    if (!cart.line_items_count) {
      return <CartNoData />
    } else {
      return (
        <section className='c-cart-table__grid'>
          <div className='c-cart-table__grid-item-a'>
            <LineItems {...this.props} aria-label='Line Items' />
          </div>
          <div className='c-cart-table__grid-item-b'>
            <CouponForm />
            <CartSummary {...this.props} aria-label='Cart Summary' />
            <div className='c-cart-table__icons'>
              <PaymentIcons />
            </div>
          </div>
        </section>
      )
    }
  }

  renderBasketDetails () {
    const { cart } = this.props

    return (
      <div className='c-cart-table__header-grid-item-a'>
        <h1 className='c-cart-table__title'>Your Shopping Basket <a className='c-cart-table__amount'>({ cart.line_items_count || 0 })</a></h1>
        <div className='c-cart-table__text'>
          <p className='c-cart-table__description'>You have <a>{ cart.line_items_count || 0 }</a> <Pluralize singular='item' count={cart.line_items_count || 0} showCount={false} /> in your shopping basket</p>
          <p className='c-cart-table__description'><Pluralize singular='This' plural='These' count={cart.line_items_count || 0} showCount={false} /> <Pluralize singular='item' count={cart.line_items_count || 0} showCount={false} /> will be saved for 48 hours depending on availablility</p>
        </div>
      </div>
    )
  }

  renderDeliveryDetails () {
    // TODO: update to use actual delivery date, currently using data from fixture
    const deliveryDate = t(ShippingMethods, 'shippingMethods[0].delivery_date').safeObject

    return (
      <div className='c-cart-table__header-grid-item-b'>
        <h1 className='c-cart-table__title'>Estimated Delivery</h1>
        <p>We will deliver your item: <a>{ deliveryDate }</a></p>
      </div>
    )
  }

  render () {
    const { cart } = this.props

    return (
      <section className='c-cart-table'>
        <section className='c-cart-table__header'>
          <div className='c-cart-table__breadcrumb'>
            <Breadcrumb />
          </div>
          <div className='c-cart-table__header-grid'>
            { this.renderBasketDetails() }
            { this.renderDeliveryDetails() }
          </div>
          <div className='c-cart-table__header-total'>
            <h4 className='c-cart-table__total'>&pound;{ decimalPrice(cart.total || 0) }</h4>
          </div>
        </section>
        { this.renderCartData() }
      </section>
    )
  }
}

export default CartTable
