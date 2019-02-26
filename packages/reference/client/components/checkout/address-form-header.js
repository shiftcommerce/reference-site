import Router from 'next/router'
import { Button } from 'shift-react-components'

export default function AddressFormHeader ({ collapsed, title }) {
  return (
    <div className='o-form__header c-address-form__header'>
      <div className='o-form__header-title c-address-form__header-title'>
        <h2>{ title }</h2>
      </div>
      { collapsed &&
          <Button
            label='Edit'
            status='secondary'
            className='o-button-edit'
            onClick={() => Router.push('/checkout/shipping-address')}
          />
      }
    </div>
  )
}
