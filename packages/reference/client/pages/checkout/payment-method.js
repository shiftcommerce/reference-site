// Components
import withCheckout from '@shiftcommerce/shift-next/src/components/with-checkout'
import { reduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import { PaymentMethodPage } from '@shiftcommerce/shift-next/src/pages/checkout/payment-method'

export default reduxWrapper(withCheckout(PaymentMethodPage), PaymentMethodPage)
