import { Component } from 'react'
import PropTypes from 'prop-types'

// Libs
import { decimalPrice } from '../../lib/decimal-price'

// Objects
import { Button } from 'shift-react-components'

class MiniPlaceOrder extends Component {
  miniPlaceOrderButton () {
    const { convertToOrder, isValidOrder } = this.props

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
    const { total } = this.props

    return (
      <div className='c-cart-summary__mini-button-container'>
        <div className='c-cart-summary__mini-button-container-item'>
          <div className='u-bold'>Order Total: &pound;{ decimalPrice(total) }</div>
        </div>
        <div className='c-cart-summary__mini-button-container-item'>
          { this.miniPlaceOrderButton() }
        </div>
      </div>
    )
  }
}

MiniPlaceOrder.propTypes = {
  total: PropTypes.number,
  isValidOrder: PropTypes.bool,
  convertToOrder: PropTypes.func
}

export default MiniPlaceOrder
