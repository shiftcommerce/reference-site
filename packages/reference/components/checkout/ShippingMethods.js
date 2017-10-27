// Libraries
import { Component } from 'react'
import { penceToPounds } from '../../lib/penceToPounds'

// Fixtures
import ShippingMethodsJson from '../../static/shippingMethods.json'

export default class ShippingMethods extends Component {
  constructor (props) {
    super(props)

    const preSelectedShippingMethod = props.checkout.shippingMethod
    const firstShippingMethod = ShippingMethodsJson.shippingMethods[0]

    this.state = {
      shippingMethods: ShippingMethodsJson.shippingMethods,
      selectedShippingMethod: preSelectedShippingMethod || firstShippingMethod
    }
  }

  componentWillReceiveProps (props) {
    const shippingMethod = props.checkout.shippingMethod
    if (shippingMethod !== this.state.selectedShippingMethod) {
      this.setState({ selectedShippingMethod: shippingMethod })
    }
  }

  setShippingMethod (shippingMethod) {
    this.props.setShippingMethod(shippingMethod)
    this.setState({ selectedShippingMethod: shippingMethod })
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
          <span className='c-shipping-method-list__cost'>&pound;{penceToPounds(method.retail_price_inc_tax)}</span>
          <span className='c-shipping-method-list__title'>{method.name}</span>
          <span className='c-shipping-method-list__delivery-date-label'>Estimated Delivery: </span>
          <span className='c-shipping-method-list__delivery-date'>{method.delivery_date}</span>
        </label>
      </div>
    )

    return shippingMethodsOutput
  }

  render () {
    const itemCount = this.props.cart.lineItems.length
    const itemCountText = itemCount === 1 ? '1 item' : `${itemCount} items`
    const selectedShippingMethod = this.state.selectedShippingMethod
    const collapsed = this.props.checkout.shippingMethod.collapsed
    const formName = this.props.formName

    return (
      <div className='o-form' aria-label='Shipping Methods'>
        <h3>Your Shipping Method</h3>

        {collapsed &&
          <div>
            <button aria-label='Edit your shipping method' className='c-button' onClick={() => this.props.onToggleCollapsed(formName)} type='button'>
              Edit
            </button>

            <div className='o-form__wrapper'>
              <p className='u-bold'>{selectedShippingMethod.name}</p>
              <p><span className='u-bold'>Estimated Delivery</span>: {selectedShippingMethod.delivery_date}</p>
            </div>
          </div>
        }

        {!collapsed &&
          <form className='o-form__wrapper c-shipping-method-list'>
            <p>📍 Shipping from ...
              <span className='c-shipping-method-list__item-count'>
                {itemCountText}
              </span>
            </p>
            <div>
              {this.renderShippingMethods()}
            </div>

            <button aria-label='Continue to payment' className='c-button' onClick={() => this.props.onToggleCollapsed(formName)} type='button'>
              Continue to Payment
            </button>
          </form>
        }
      </div>
    )
  }
}
