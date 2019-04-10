// Components
import { reduxWrapper, PaymentMethodPage, withCheckout } from '@shiftcommerce/shift-next'

export default reduxWrapper(withCheckout(PaymentMethodPage), PaymentMethodPage)
