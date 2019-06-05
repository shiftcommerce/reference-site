// Libraries
import React from 'react'
import classNames from 'classnames'

// Lib
import { PaymentIcons } from '../../components/cart/payment-icons'
/**
 * Renders the payment icons
 * @param  {Object} props
 * @return {string} - HTML markup for the component
 */
export const CartTablePaymentIcons = (props) => {
  return (
    <div className={classNames(props.className, 'c-cart-table__icons')}>
      <PaymentIcons />
    </div>
  )
}
