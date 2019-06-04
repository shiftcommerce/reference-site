// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import Sticky from 'react-stickyfill'

// Lib
import link from '../../objects/link'
import Config from '../../lib/config'
import { Button } from '../../objects/button'

export function CheckoutCartButtons ({ continueButtonProps }) {
  const Link = Config.get().Link || link
  const renderContinueButton = () => (
    <Button
      className='c-checkout-cart-buttons__cta c-checkout-cart-buttons__cta--proceed o-button--sml'
      type='button'
      {...continueButtonProps}
    />
  )

  const renderContinueShoppingButton = () => (
    <Link
      href='/'
      className='c-checkout-cart-buttons__cta c-checkout-cart-buttons__cta--continue o-button--sml'>
      Continue Shopping
    </Link>
  )

  return (
    <Sticky>
      <div className='c-checkout-cart-buttons'>
        { renderContinueShoppingButton() }
        { continueButtonProps && renderContinueButton() }
      </div>
    </Sticky>
  )
}

CheckoutCartButtons.propTypes = {
  continueButtonProps: PropTypes.object
}
