// Components
import { reduxWrapper, ShippingMethodPage, withCheckout } from 'shift-next'

export default reduxWrapper(withCheckout(ShippingMethodPage), ShippingMethodPage)
