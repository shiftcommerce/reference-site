// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import Sticky from 'react-stickyfill'

// Lib
import { decimalPrice } from '../../lib/decimal-price'

function CheckoutCartTotal ({ discountSummaries, paymentError, shippingDiscount, shippingDiscountName, shippingTotal, subTotal, total, cheapestShipping }) {
  const renderPromotions = () => discountSummaries.map(discountSummary => (
    <dl className='c-cart-summary__promotion' key={ discountSummary.id }>
      <dt>{ discountSummary.name }:</dt>
      <dd>- &pound;{ decimalPrice(discountSummary.total) }</dd>
    </dl>
  ))

  const renderShippingPromotion = () => (
    <dl className='c-cart-summary__promotion'>
      <dt>{ shippingDiscountName }:</dt>
      <dd>- &pound;{ decimalPrice(shippingDiscount * -1) }</dd>
    </dl>
  )

  const shippingText = shippingTotal ? `£${decimalPrice(shippingTotal)}` : `£${decimalPrice(cheapestShipping.total)}`

  return (
    <Sticky>
      <div>
        <div aria-label='Cart total summary' className='u-sticky c-cart-summary'>
          <dl aria-label='Subtotal'>
            <dt> Total Price: </dt>
            <dd> &pound;{ decimalPrice(subTotal) } </dd>
          </dl>
          { renderPromotions() }
          <dl aria-label='Shipping cost'>
            { shippingTotal ? <dt> Shipping costs: </dt> : <dt> Estimated Shipping: </dt> }
            <dd> { shippingText } </dd>
          </dl>
          { shippingDiscountName && renderShippingPromotion() }
          <dl aria-label='Total' className='u-bold'>
            <>
              <dt> TOTAL: </dt>
              { shippingTotal ? <dd> &pound;{ decimalPrice(total) } </dd> : <dd> &pound;{ decimalPrice(total + cheapestShipping.total) } </dd> }
            </>
          </dl>
          <dl>
            <dt className='c-cart-summary__VAT'>* Including VAT</dt>
          </dl>
          { paymentError && <div className='c-checkout-cart-total__payment-error'>{ paymentError }</div> }
        </div>
      </div>
    </Sticky>
  )
}

CheckoutCartTotal.propTypes = {
  discountSummaries: PropTypes.arrayOf(PropTypes.object).isRequired,
  paymentError: PropTypes.string,
  shippingDiscount: PropTypes.number,
  shippingDiscountName: PropTypes.string,
  shippingTotal: PropTypes.number.isRequired,
  subTotal: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default CheckoutCartTotal
