// Components
import { reduxWrapper, PaymentPage, withCheckout } from 'shift-next'

export default reduxWrapper(withCheckout(PaymentPage), PaymentPage)
