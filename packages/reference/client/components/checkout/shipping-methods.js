// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Objects
import Button from '../../objects/button'

// Libs
import { fixedPrice } from '../../lib/fixed-price'

// Fixtures
import ShippingMethodsJson from '../../static/shipping-methods.json'

export default class ShippingMethods extends Component {
  constructor (props) {
    super(props)

    this.state = {
      shippingMethods: this.availableShippingMethods(),
      selectedShippingMethod: this.shippingMethod()
    }
  }

  availableShippingMethods () {
    return ShippingMethodsJson.shippingMethods
  }

  shippingMethod () {
    const { checkout, setShippingMethod } = this.props
    const preSelectedShippingMethod = checkout.shippingMethod
    const defaultShippingMethod = this.availableShippingMethods() || [0]

    if (preSelectedShippingMethod && (preSelectedShippingMethod.id !== undefined)) {
      return preSelectedShippingMethod
    } else {
      setShippingMethod(defaultShippingMethod)
      return defaultShippingMethod
    }
  }

  setShippingMethod (shippingMethod) {
    this.props.setShippingMethod(shippingMethod)
    this.setState({ selectedShippingMethod: shippingMethod })
  }

  renderFormHeader () {
    const { checkout, onToggleCollapsed, formName } = this.props
    const { collapsed } = checkout.shippingMethod
    return (
      <div className='o-form__header c-shipping-method__header'>
        <h2>Your Shipping Method</h2>

        <div>
          { collapsed &&
            <Button
              aria-label='Edit your shipping method'
              label='Edit'
              status='secondary'
              className='o-button-edit'
              onClick={() => onToggleCollapsed('edit', formName)}
            />
          }
        </div>
      </div>
    )
  }

  renderFormSummary () {
    const { checkout } = this.props
    const collapsed = checkout.shippingMethod.collapsed
    const selectedShippingMethod = this.state.selectedShippingMethod
    return (
      <div>
        { collapsed &&
          <div className='c-shipping-method__summary'>
            <p className='u-bold'>{ selectedShippingMethod.name }</p>
            <p><span className='u-bold'>Estimated Delivery</span>: { selectedShippingMethod.delivery_date }</p>
          </div>
        }
      </div>
    )
  }

  renderForm () {
    const { checkout, cart, formName, onToggleCollapsed } = this.props
    const { collapsed } = checkout.shippingMethod
    const itemCount = cart.totalQuantity
    const itemCountText = itemCount === 1 ? '1 item' : `${itemCount} items`

    return (
      <div>
        { !collapsed &&
          <form className='o-form__wrapper c-shipping-method-list'>
            <div className='c-shipping-method__list-header'>
              Shipping from ...
              <span className='c-shipping-method__list-item-count'>
                { itemCountText }
              </span>
            </div>
            <div>
              { this.renderShippingMethods() }
            </div>
            <div className='o-form__input-group'>
              <Button
                className='o-button--sml'
                aria-label='Continue to payment'
                label='Continue to Payment'
                status='primary'
                type='submit'
                onClick={() => onToggleCollapsed('complete', formName)}
              />
            </div>
          </form>
        }
      </div>
    )
  }

  renderShippingMethods () {
    const shippingMethods = this.state.shippingMethods
    const selectedShippingMethod = this.state.selectedShippingMethod

    const shippingMethodsOutput = shippingMethods.map((method) =>
      <div className='o-form__input-group c-shipping-method__list-input-group'
        key={method.id} onClick={() => this.setShippingMethod(method)}
        aria-label={method.sku}>
        <label htmlFor={method.sku} className='c-shipping-method__radio'>
          <input className='c-shipping-method__radio-input' id={`${method.sku}_${method.id}`} value={method.sku} type='radio'
            name='shipping_method'
            checked={method.id === selectedShippingMethod.id} onChange={() => this.setShippingMethod(method)} />
          <span className='c-shipping-method__radio-caption' />
          <span className='c-shipping-method__list-cost'>&pound;{ fixedPrice(method.retail_price_inc_tax) }</span>
          <span className='c-shipping-method__list-title'>{ method.name }</span>
          <span className='c-shipping-method__list-delivery-date-label'>Estimated Delivery: </span>
          <span className='c-shipping-method__list-delivery-date'>{ method.delivery_date }</span>
        </label>
      </div>
    )

    return shippingMethodsOutput
  }

  render () {
    const { checkout } = this.props

    return (
      <div aria-label='Shipping Methods' className={classNames('c-shipping-method', { 'o-form__hidden': !checkout.shippingAddress.completed })}>
        { this.renderFormHeader() }
        { this.renderFormSummary() }
        { this.renderForm() }
      </div>
    )
  }
}
