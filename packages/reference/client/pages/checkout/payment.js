// Libs
import { reduxWrapper } from '../../lib/algolia-redux-wrapper'

// Components
import { PaymentPage, withCheckout } from 'shift-next'

export default reduxWrapper(withCheckout(PaymentPage), PaymentPage)
