import { AddressFormHeader } from 'shift-react-components'

export default function AddressFormSummary ({ addressLine1, postcode, firstName, lastName, city, onClick }) {
  return (
    <>
      <AddressFormHeader
        collapsed
        onClick={onClick}
        title='Shipping Address'
      />
      <div className='o-form__wrapper--collapsed c-address-form__summary'>
        <p className='u-bold'>{ firstName } { lastName } </p>
        <span>{ addressLine1 }, { city }, { postcode }</span>
      </div>
    </>
  )
}
