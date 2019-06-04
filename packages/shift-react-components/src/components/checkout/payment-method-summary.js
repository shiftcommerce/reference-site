// Libraries
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Lib
import { Image } from '../../objects/image'

import { PaymentMethodHeader } from '../../components/checkout/payment-method-header'

export class PaymentMethodSummary extends PureComponent {
  renderPaymentMethodInformation (paymentMethod) {
    if (paymentMethod === 'PayPal') {
      return <Image src='/static/payments/pay-pal.svg' className='c-payment-method__summary-information-card-image' />
    } else {
      return <p>{ paymentMethod }</p>
    }
  }

  render () {
    const { headerTitle, onClick, paymentMethod, showEditButton } = this.props
    return (
      <div className={'c-payment-method__summary'}>
        <PaymentMethodHeader
          collapsed
          onClick={onClick}
          title={headerTitle}
          showEditButton={showEditButton}
        />
        <div className={'c-payment-method__summary-information'}>
          { this.renderPaymentMethodInformation(paymentMethod) }
        </div>
      </div>
    )
  }
}

PaymentMethodSummary.propTypes = {
  onClick: PropTypes.func,
  paymentMethod: PropTypes.string.isRequired,
  showEditButton: PropTypes.bool,
  headerTitle: PropTypes.string.isRequired
}
