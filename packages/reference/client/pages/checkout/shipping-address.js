// Components
import { reduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import withCheckout from '@shiftcommerce/shift-next/src/components/with-checkout'
import { ShippingAddressPage } from '@shiftcommerce/shift-next/src/pages/shipping-address'

export default reduxWrapper(withCheckout(ShippingAddressPage), ShippingAddressPage)
