// Libraries
import React, { PureComponent } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

// Libs
import businessDaysFromNow from '../../lib/business-days-from-now'
import { decimalPrice } from '../../lib/decimal-price'
import { Button } from '../../objects/button'
import { Flash } from '../../objects/flash'
import ShippingMethodsHeader from '../checkout/shipping-methods-header'

export class ShippingMethods extends PureComponent {
  /**
   * Renders the continue button
   */
  renderContinueButton () {
    const { handleFormSubmit, isThirdPartyPayment } = this.props
    const label = isThirdPartyPayment ? 'Review Your Order' : 'Continue To Payment'
    return (
      <Button
        className='o-button--sml'
        aria-label={label}
        label={label}
        status='positive'
        type='submit' onClick={handleFormSubmit}
      />
    )
  }

  /**
   * Renders the shipping method form, which is a wrapper containing the
   * shipping methods
   * @return {string} - HTML markup for the component
   */
  renderForm () {
    const { cartLineItemsCount } = this.props

    return (
      <form className='o-form__wrapper o-form__background c-shipping-method__list'>
        <div className='c-shipping-method__list-header'>
          Shipping from ... <span className='c-shipping-method__list-item-count'>{ cartLineItemsCount === 1 ? '1 item' : `${cartLineItemsCount} items` }</span>
        </div>
        <div>{ this.renderShippingMethods() }</div>
        <div className='o-form__input-group'>
          { this.renderContinueButton() }
        </div>
      </form>
    )
  }

  /**
   * Renders the available shipping methods, which is a set of radio buttons
   * @return {string} - HTML markup for the component
   */
  renderShippingMethods () {
    const { cartShippingMethod, handleSetShippingMethod, shippingMethods } = this.props

    if (cartShippingMethod) {
      return shippingMethods.map((method) => {
        return (
          <div
            className='o-form__input-group c-shipping-method__list-input-group'
            key={method.id}
            onClick={() => handleSetShippingMethod(method)}
            aria-label={method.sku}
          >
            <label htmlFor={method.sku} className={classNames('c-shipping-method__radio', { 'c-shipping-method__radio--selected': (method.id === cartShippingMethod.id) })}>
              <input className='c-shipping-method__radio-input' id={`${method.sku}_${method.id}`} value={method.sku} type='radio'
                name='shipping_method'
                checked={method.id === cartShippingMethod.id} onChange={() => handleSetShippingMethod(method)} />
              <span className='c-shipping-method__radio-caption' />
              <span className='c-shipping-method__list-cost'>&pound;{ decimalPrice(method.total) }</span>
              <span className='c-shipping-method__list-title'>{ method.label }</span>
              <span className='c-shipping-method__list-delivery-date-label'>Estimated Delivery: </span>
              <span className='c-shipping-method__list-delivery-date'>{ format(businessDaysFromNow(method.meta_attributes.working_days.value), 'dddd Do MMMM') }</span>
            </label>
          </div>
        )
      })
    }
  }

  render () {
    const { errorMessage, shippingMethods } = this.props

    if (!shippingMethods) {
      return null
    }

    return (
      <div aria-label='Shipping Methods' className={classNames(this.props.className, 'o-form c-shipping-method')}>
        <ShippingMethodsHeader title={'Shipping Method'}/>
        { errorMessage && <Flash text={errorMessage} modifier={'error'}/> }
        { this.renderForm() }
      </div>
    )
  }
}

ShippingMethods.propTypes = {
  cartLineItemsCount: PropTypes.number,
  cartShippingMethod: PropTypes.object,
  errorMessage: PropTypes.string,
  handleFormSubmit: PropTypes.func,
  handleSetShippingMethod: PropTypes.func,
  shippingMethods: PropTypes.array,
  isThirdPartyPayment: PropTypes.bool
}
