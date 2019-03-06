// Libraries
import { Component } from 'react'

// Libs
import { decimalPrice } from '../../lib/decimal-price'
import ApiClient from '../../lib/api-client'
import { businessDaysFromNow } from '../../lib/business-days-from-now'

import { fetchShippingMethodsRequest } from '../../requests/cart-requests'

// Actions
import { setCartShippingMethod } from '../../actions/cart-actions'

// Components
import { Button, ShippingMethodsHeader } from 'shift-react-components'

export default class ShippingMethods extends Component {
  static async fetchShippingMethods () {
    try {
      const request = fetchShippingMethodsRequest()
      const response = await new ApiClient().read(request.endpoint, request.query)

      return response.data
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

  renderForm () {
    const { collapsed, cart, nextSection } = this.props
    const itemCount = cart.line_items_count
    const itemCountText = itemCount === 1 ? '1 item' : `${itemCount} items`

    return (
      <>
        { !collapsed &&
          <form className='o-form__wrapper o-form__background c-shipping-method__list'>
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
                onClick={(e) => {
                  e.preventDefault()
                  nextSection('complete')
                }}
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
            <span className='c-shipping-method__list-cost'>&pound;{ decimalPrice(method.total) }</span>
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
    return (
      <div aria-label='Shipping Methods' className='o-form c-shipping-method'>
        { this.state.loading ? <p>Loading...</p> : <>
          <ShippingMethodsHeader />
          { this.renderForm() }
        </>
        }
      </div>
    )
  }
}
