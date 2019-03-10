// Components
import { reduxWrapper, ShippingAddressPage, withCheckout } from 'shift-next'

export default reduxWrapper(withCheckout(ShippingAddressPage), ShippingAddressPage)
