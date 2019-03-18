// Components
import { reduxWrapper, ShippingAddressPage, withCheckout } from '@shiftcommerce/shift-next'

export default reduxWrapper(withCheckout(ShippingAddressPage), ShippingAddressPage)
