// Components
import { reduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import { withCheckout } from '@shiftcommerce/shift-next/src/components/with-checkout'
import { ShippingMethodPage } from '@shiftcommerce/shift-next/src/pages/checkout/shipping-method'

export default reduxWrapper(withCheckout(ShippingMethodPage), ShippingMethodPage)
