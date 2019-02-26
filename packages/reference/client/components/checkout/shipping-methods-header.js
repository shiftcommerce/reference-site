import Router from 'next/router'
import { Button } from 'shift-react-components'

export default function ShippingMethodsHeader ({ collapsed }) {
  return (
    <div className='o-form__header c-shipping-method__header'>
      <h2>Your Shipping Method</h2>

      { collapsed &&
          <Button
            aria-label='Edit your shipping method'
            label='Edit'
            status='secondary'
            className='o-button-edit'
            onClick={() => Router.push('/checkout/shipping-method')}
          />
      }
    </div>
  )
}
