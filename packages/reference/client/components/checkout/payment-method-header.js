// Objects
import { Button } from 'shift-react-components'

const PaymentMethodHeader = ({ collapsed, showPayment }) => (
  <div className='o-form__header  c-payment-method__header'>
    <h2>Payment Method</h2>
    { collapsed && <Button
      aria-label='Edit your payment method'
      className='o-button-edit'
      label='Edit'
      status='secondary'
      onClick={showPayment}
    /> }
  </div>
)

export default PaymentMethodHeader
