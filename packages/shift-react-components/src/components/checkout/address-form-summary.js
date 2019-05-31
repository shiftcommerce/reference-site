// Libraries
import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

// Lib
import { AddressFormHeader } from '../checkout/address-form-header'

export class AddressFormSummary extends PureComponent {
  renderAddress () {
    const {
      addressLine1,
      city,
      firstName,
      lastName,
      postcode
    } = this.props

    return (
      <div className='o-form__wrapper--collapsed c-address-form__summary'>
        <p className='u-bold'>{ firstName } { lastName } </p>
        <span>{ addressLine1 }, { city }, { postcode }</span>
      </div>
    )
  }

  render () {
    const {
      headerTitle,
      onClick,
      showEditButton
    } = this.props

    return (
      <Fragment>
        <AddressFormHeader
          collapsed
          onClick={onClick}
          showEditButton={showEditButton}
          title={headerTitle}
        />
        { this.renderAddress() }
      </Fragment>
    )
  }
}

AddressFormSummary.propTypes = {
  addressLine1: PropTypes.string,
  city: PropTypes.string,
  firstName: PropTypes.string,
  headerTitle: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  onClick: PropTypes.func,
  postcode: PropTypes.string,
  showEditButton: PropTypes.bool
}
