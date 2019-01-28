// Libraries
import { PureComponent } from 'react'

// Objects
import { Image } from 'shift-react-components'

class PaymentIcons extends PureComponent {
  render () {
    return (
      <div className='c-payment-icons'>
        <p>We Accept</p>
        <div className='c-payment-icons__images'>
          <Image className='c-payment-icons__image' src='/static/payments/visa.svg' aria-label='VISA' />
          <Image className='c-payment-icons__image' src='/static/payments/mastercard.svg' aria-label='Mastercard' />
          <Image className='c-payment-icons__image' src='/static/payments/american-express.svg' aria-label='American Express' />
          <Image className='c-payment-icons__image' src='/static/payments/maestro.svg' aria-label='Maestro' />
          <Image className='c-payment-icons__image' src='/static/payments/pay-pal.svg' aria-label='PayPal' />
          <Image className='c-payment-icons__image' src='/static/payments/apple-pay.svg' aria-label='Apple Pay' />
        </div>
      </div>
    )
  }
}

export default PaymentIcons
