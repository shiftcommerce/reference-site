import AddressFormHeader from './address-form-header'

export default function AddressFormSummary ({ addressLine1, postcode, firstName, lastName, city }) {
  return (
    <>
      <AddressFormHeader
        title='Shipping Address'
        collapsed
      />
      <div className='o-form__wrapper--collapsed c-address-form__summary'>
        <p className='u-bold'>{ firstName } { lastName } </p>
        <span>{ addressLine1 }, { city }, { postcode }</span>
      </div>
    </>
  )
}
