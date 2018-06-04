// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Objects
import Button from '../../objects/Button'

// Libs
import { fixedPrice } from '../../lib/fixedPrice'

// Fixtures
import ShippingMethodsJson from '../../static/shippingMethods.json'

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
    const { checkout, formName, onToggleCollapsed } = this.props
    const collapsed = checkout.shippingMethod.collapsed
    return (
      <div className='o-form__header'>
        <div>
          <h2>Your Shipping Method</h2>
        </div>

        <div>
          { collapsed &&
            <Button
              aria-label='Edit your shipping method'
              label='Edit'
              size='lrg'
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
          <div className='o-form__wrapper'>
            <p className='u-bold'>{ selectedShippingMethod.name }</p>
            <p><span className='u-bold'>Estimated Delivery</span>: { selectedShippingMethod.delivery_date }</p>
          </div>
        }
      </div>
    )
  }

  renderForm () {
    const { checkout, cart, formName, onToggleCollapsed } = this.props
    const collapsed = checkout.shippingMethod.collapsed
    const itemCount = cart.totalQuantity
    const itemCountText = itemCount === 1 ? '1 item' : `${itemCount} items`

    return (
      <div>
        { !collapsed &&
          <form className='o-form__wrapper c-shipping-method-list'>
            <div className='c-shipping-method-list__header u-bold'>
              📍 Shipping from ...
              <span className='c-shipping-method-list__item-count'>
                { itemCountText }
              </span>
            </div>
            <div>
              { this.renderShippingMethods() }
            </div>

            <div className='o-form__input-group'>
              <Button
                aria-label='Continue to payment'
                label='Continue to Payment'
                size='lrg'
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
      <div className='o-form__input-group c-shipping-method-list__input-group'
        key={method.id} onClick={() => this.setShippingMethod(method)}
        aria-label={method.sku}>
        <input id={`${method.sku}_${method.id}`} value={method.sku} type='radio'
          name='shipping_method'
          checked={method.id === selectedShippingMethod.id} onChange={() => this.setShippingMethod(method)} />
        <label htmlFor={method.sku}>
          <span className='c-shipping-method-list__cost'>&pound;{ fixedPrice(method.retail_price_inc_tax) }</span>
          <span className='c-shipping-method-list__title'>{ method.name }</span>
          <span className='c-shipping-method-list__delivery-date-label'>Estimated Delivery: </span>
          <span className='c-shipping-method-list__delivery-date'>{ method.delivery_date }</span>
        </label>
      </div>
    )

    return shippingMethodsOutput
  }

  render () {
    const {
      checkout
    } = this.props

    return (
      <div aria-label='Shipping Methods' className={classNames('o-form', { 'o-form__hidden': !checkout.shippingAddress.completed })}>
        { this.renderFormHeader() }
        { this.renderFormSummary() }
        { this.renderForm() }
      </div>
    )
  }
}
