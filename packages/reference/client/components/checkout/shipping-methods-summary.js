import { businessDaysFromNow } from '../../lib/business-days-from-now'

import ShippingMethodsHeader from './shipping-methods-header'

export default function ShippingMethodsSummary ({ shippingMethod }) {
  return (
    <div className='o-form c-shipping-method'>
      <ShippingMethodsHeader collapsed />
      <div className='o-form__wrapper--collapsed c-shipping-method__summary'>
        <p className='u-bold'>{ shippingMethod.label }</p>
        <p>
          <span className='u-bold'>Estimated Delivery</span>: {
            businessDaysFromNow(parseInt(shippingMethod.meta_attributes.working_days.value)).format('dddd Do MMMM')
          }
        </p>
      </div>
    </div>
  )
}
