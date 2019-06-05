// Components
import { reduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import withCheckout from '@shiftcommerce/shift-next/src/components/with-checkout'
import PaymentPage from '@shiftcommerce/shift-next/src/pages/payment'

export default reduxWrapper(withCheckout(PaymentPage), PaymentPage)
