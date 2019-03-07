// Libs
import { reduxWrapper } from '../../lib/algolia-redux-wrapper'

// Components
import { ShippingAddressPage } from 'shift-next'
import withCheckout from '../../components/with-checkout'

export default reduxWrapper(withCheckout(ShippingAddressPage), ShippingAddressPage)
