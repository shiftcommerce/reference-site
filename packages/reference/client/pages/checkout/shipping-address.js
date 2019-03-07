// Libs
import { reduxWrapper } from '../../lib/algolia-redux-wrapper'

// Components
import { ShippingAddressPage, withCheckout } from 'shift-next'

export default reduxWrapper(withCheckout(ShippingAddressPage), ShippingAddressPage)
