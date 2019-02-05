// Libraries
import React from 'react'
import classNames from 'classnames'

// Components
import PaymentIcons from './payment-icons'

/**
 * Renders the payment icons
 * @param  {Object} props
 * @return {string} - HTML markup for the component
 */
const CartTablePaymentIcons = (props) => {
  return (
    <div className={classNames(props.className, 'c-cart-table__icons')}>
      <PaymentIcons />
    </div>
  )
}

export default CartTablePaymentIcons
