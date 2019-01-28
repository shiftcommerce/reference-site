import { Component } from 'react'

// Libs
import { decimalPrice } from '../../lib/decimal-price'

// Objects
import { Button } from 'shift-react-components'

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

    if (checkout.currentStep === 4) {
      return (
        <div className='c-cart-summary__mini-button-container'>
          <div className='c-cart-summary__mini-button-container-item'>
            <div className='u-bold'>Order Total: &pound;{ decimalPrice(cart.total) }</div>
          </div>
          <div className='c-cart-summary__mini-button-container-item'>
            { this.miniPlaceOrderButton(convertToOrder) }
          </div>
        </div>
      )
    }
    return (null)
  }
}
