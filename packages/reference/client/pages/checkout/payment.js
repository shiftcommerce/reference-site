// Components
import { reduxWrapper, PaymentPage, withCheckout } from '@shiftcommerce/shift-next'

export default reduxWrapper(withCheckout(PaymentPage), PaymentPage)
