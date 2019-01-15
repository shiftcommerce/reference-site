import { Component } from 'react'

// Libs
import { fixedPrice } from '../../lib/fixed-price'
import { calculateCartSummary } from '../../lib/calculate-cart-summary'

// Objects
import Button from '../../objects/button'

export default class MiniPlaceOrder extends Component {
  miniPlaceOrderButton (convertToOrder) {
    const isValidOrder = this.props

    return (
      <Button
        aria-label='Place Order'
        label='Place Order'
        status= {isValidOrder ? 'primary' : 'disabled'}
        disabled= {!isValidOrder}
        onClick={ convertToOrder }
        className='c-cart-summary__buttons--proceed o-button--sml'
        type='button'
      />
    )
  }

  render () {
    const { cart, checkout, convertToOrder } = this.props
    const totals = calculateCartSummary(cart, checkout)

    if (checkout.currentStep === 4) {
      return (
      <>
      <div className='c-cart-summary__mini-button-container'>
        <div className='c-cart-summary__mini-button-container-item'>
          <div className='u-bold'> Order Total: &pound;{ fixedPrice(checkout.shippingAddress.completed ? totals.total : totals.subTotal) }  </div>
        </div>
        <div className='c-cart-summary__mini-button-container-item'>
          { this.miniPlaceOrderButton(convertToOrder) }
        </div>
      </div>
      </>
      )
    }
    return (null)
  }
}
