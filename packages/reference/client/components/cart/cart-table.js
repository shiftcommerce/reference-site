// Libraries
import { Component } from 'react'
import Pluralize from 'react-pluralize'
import t from 'typy'

// Lib
import { fixedPrice } from '../../lib/fixed-price'
import { calculateCartSummary } from '../../lib/calculate-cart-summary'

// Components
import LineItems from './line-items'
import CartSummary from './cart-summary'
import CartNoData from './cart-no-data'
import PaymentIcons from './payment-icons'
import PromoInput from '../promo-input'

// Fixtures
import ShippingMethods from '../../static/shipping-methods.json'

// Objects
import Breadcrumb from '../../objects/breadcrumb'

class CartTable extends Component {
  renderCartData () {
    const cart = this.props.cart

    if (cart.totalQuantity === 0) {
      return <CartNoData />
    } else {
      return (
        <section className='c-cart-table__grid'>
          <div className='c-cart-table__grid-item-a'>
            <LineItems {...this.props} aria-label='Line Items' />
          </div>
          <div className='c-cart-table__grid-item-b'>
            <div className='c-cart-table__promo'>
              <PromoInput />
            </div>
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
        <h1 className='c-cart-table__title'>Your Shopping Basket <a className='c-cart-table__amount'>({ cart.totalQuantity })</a></h1>
        <div className='c-cart-table__text'>
          <p className='c-cart-table__description'>You have <a>{ cart.totalQuantity }</a> <Pluralize singular='item' count={cart.totalQuantity} showCount={false} /> in your shopping basket</p>
          <p className='c-cart-table__description'><Pluralize singular='This' plural='These' count={cart.totalQuantity} showCount={false} /> <Pluralize singular='item' count={cart.totalQuantity} showCount={false} /> will be saved for 48 hours depending on availablility</p>
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
    const totals = calculateCartSummary(cart)

    return (
      <section className='c-cart-table c-cart-table--margin'>
        <section className='c-cart-table__header'>
          <div className='c-cart-table__breadcrumb'>
            <Breadcrumb />
          </div>
          <div className='c-cart-table__header-grid'>
            { this.renderBasketDetails() }
            { this.renderDeliveryDetails() }
          </div>
          <div className='c-cart-table__header-total'>
            <h4 className='c-cart-table__total'>&pound;{ fixedPrice(totals.total) }</h4>
          </div>
        </section>
        { this.renderCartData() }
      </section>
    )
  }
}

export default CartTable
