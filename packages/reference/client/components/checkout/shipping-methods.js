// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Objects
import Button from '../../objects/button'

// Libs
import { fixedPrice } from '../../lib/fixed-price'
import ApiClient from '../../lib/api-client'
import JsonApiParser from '../../lib/json-api-parser'
import { businessDaysFromNow } from '../../lib/business-days-from-now'

import { fetchShippingMethodsRequest } from '../../requests/cart-requests'

// Actions
import { setCartShippingMethod } from '../../actions/cart-actions'

export default class ShippingMethods extends Component {
  static async fetchShippingMethods () {
    try {
      const request = fetchShippingMethodsRequest()
      const response = await new ApiClient().read(request.endpoint, request.query)
      return new JsonApiParser().parse(response.data)
    } catch (error) {
      return { error }
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      loading: true
    }

    this.setShippingMethod = this.setShippingMethod.bind(this)
  }

  async componentDidMount () {
    const shippingMethods = (await this.constructor.fetchShippingMethods()).data.sort((method1, method2) => method1.total - method2.total)

    if (!this.props.cart.shipping_method) {
      this.props.dispatch(setCartShippingMethod(shippingMethods[0].id))
    }

    this.setState({
      shippingMethods: shippingMethods,
      loading: false
    })
  }

  setShippingMethod (shippingMethod) {
    this.props.dispatch(setCartShippingMethod(shippingMethod.id))
    this.setState({ selectedShippingMethod: shippingMethod })
  }

  renderFormHeader () {
    const { checkout, onToggleCollapsed, formName } = this.props
    const { shippingMethod: { collapsed } } = checkout
    return (
      <div className='o-form__header c-shipping-method__header'>
        <h2>Your Shipping Method</h2>

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
    )
  }

  renderFormSummary () {
    const { checkout, cart } = this.props
    const { shippingMethod: { collapsed } } = checkout

    return (
      <>
        { collapsed && cart.shipping_method &&
          <div className='o-form__wrapper--collapsed c-shipping-method__summary'>
            <p className='u-bold'>
              { cart.shipping_method && cart.shipping_method.label }
            </p>
            <p>
              <span className='u-bold'>Estimated Delivery</span>: { businessDaysFromNow(parseInt(cart.shipping_method.meta_attributes.working_days.value)).format('dddd Do MMMM') }
            </p>
          </div>
        }
      </>
    )
  }

  renderForm () {
    const { checkout, cart, formName, onToggleCollapsed } = this.props
    const { shippingMethod: { collapsed } } = checkout
    const itemCount = cart.line_items_count
    const itemCountText = itemCount === 1 ? '1 item' : `${itemCount} items`

    return (
      <>
        { !collapsed &&
          <form className='o-form__wrapper o-form__background c-shipping-method-list'>
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
                status='positive'
                type='submit'
                onClick={() => onToggleCollapsed('complete', formName)}
              />
            </div>
          </form>
        }
      </>
    )
  }

  renderShippingMethods () {
    const { shippingMethods } = this.state
    const { cart } = this.props

    if (cart.shipping_method) {
      const shippingMethodsOutput = shippingMethods.map((method) =>
        <div className='o-form__input-group c-shipping-method__list-input-group'
          key={method.id} onClick={() => this.setShippingMethod(method)}
          aria-label={method.sku}>
          <label htmlFor={method.sku} className='c-shipping-method__radio'>
            <input className='c-shipping-method__radio-input' id={`${method.sku}_${method.id}`} value={method.sku} type='radio'
              name='shipping_method'
              checked={method.id === cart.shipping_method.id} onChange={() => this.setShippingMethod(method)} />
            <span className='c-shipping-method__radio-caption' />
            <span className='c-shipping-method__list-cost'>&pound;{ fixedPrice(method.total) }</span>
            <span className='c-shipping-method__list-title'>{ method.label }</span>
            <span className='c-shipping-method__list-delivery-date-label'>Estimated Delivery: </span>
            <span className='c-shipping-method__list-delivery-date'>{ businessDaysFromNow(parseInt(method.meta_attributes.working_days.value)).format('dddd Do MMMM') }</span>
          </label>
        </div>
      )

      return shippingMethodsOutput
    }
  }

  render () {
    const { checkout } = this.props

    return (
      <div aria-label='Shipping Methods' className={classNames('o-form c-shipping-method', { 'o-form__hidden': !checkout.shippingAddress.completed })}>
        { this.state.loading ? <p>Loading...</p> : <>
          { this.renderFormHeader() }
          { this.renderFormSummary() }
          { this.renderForm() }
          </>
        }
      </div>
    )
  }
}
