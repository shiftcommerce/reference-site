// Libraries
import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '../../objects/button'

export function PaymentMethodHeader ({ collapsed, onClick, showEditButton, title }) {
  return (
    <div className='o-form__header c-payment-method__header'>
      <h2>{ title }</h2>
      { collapsed && showEditButton && <Button
        aria-label='Edit your payment method'
        className='o-button-edit'
        label='Edit'
        status='secondary'
        onClick={onClick}
      /> }
    </div>
  )
}

PaymentMethodHeader.propTypes = {
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
  showEditButton: PropTypes.bool,
  title: PropTypes.string.isRequired
}
