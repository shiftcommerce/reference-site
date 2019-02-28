// Libraries
import classNames from 'classnames'

// Components
import { PaymentMethodHeader } from 'shift-react-components'

const PaymentMethodSummary = ({ cart, onClick, order, selectedPaymentMethod }) => (
  <>
    <PaymentMethodHeader
      collapsed
      onClick={onClick}
    />
    <div className={classNames('c-payment-method__summary', { 'o-form__error': order.paymentError !== null })}>
      <p>
        <span className='u-bold'> Payment Mode: </span>
        <span> { selectedPaymentMethod === 'card' ? 'Credit/Debit Card' : 'Paypal' } </span>
      </p>
      <p>
        <span className='u-bold'>Billing Address: </span>
        <span className='u-bold'>{ cart.billing_address && cart.billing_address.first_name } { cart.billing_address && cart.billing_address.last_name } </span>
        <span>{ cart.billing_address && cart.billing_address.address_line_1 }, { cart.billing_address && cart.billing_address.city }, { cart.billing_address && cart.billing_address.postcode }</span>
      </p>
    </div>
  </>
)

export default PaymentMethodSummary
