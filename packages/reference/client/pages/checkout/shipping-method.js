// Components
import { reduxWrapper, ShippingMethodPage, withCheckout } from '@shiftcommerce/shift-next'

export default reduxWrapper(withCheckout(ShippingMethodPage), ShippingMethodPage)
