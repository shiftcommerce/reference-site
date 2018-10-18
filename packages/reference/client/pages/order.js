//  Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

// Objects
import Image from '../objects/image'
import Button from '../objects/button'

class OrderPage extends Component {
  renderCardImage () {
    const cardBrand = this.props.cardToken.card.brand

    if (cardBrand === 'Visa') {
      return (
        <Image src='/static/payments/VISA.svg' className='c-order__payment-method-card-image' />
      )
    }
  }

  render () {
    const order = this.props
    const shippingAddress = order.shipping_address.attributes
    const shippingMethod = order.shipping_method.attributes
    const billingAddress = order.billing_address.attributes
    const cardDetails = order.cardToken.card

    if (order.loading) {
      return (
        <p>Loading...</p>
      )
    } else if (order.error) {
      return (
        <p>{ order.error }</p>
      )
    } else {
      return (
        <>
          <div className='c-order'>
            <div className='c-order__header'>
              <div className='c-order__header-tick'>✔</div>
              <div className='c-order__header-text'>
                <p className='u-text-color--orange  c-order__header-text-id  u-bold'>Order #{ order.id }</p>
                <h3 className='u-bold'>Thank you { shippingAddress.first_name }!</h3>
              </div>
            </div>
            <div className='c-order__map'><Image src='/static/googlemap.png' className='c-order__map-image' /></div>
            <div className='c-order__confirm'>
              <h2>Your order is confirmed</h2>
              <p>We've accepted your order and we're getting it ready. A confirmation email has been sent to <a className='u-text-color--orange'>{ order.email }</a>.</p>
            </div>
            <div className='c-order__customer-info'>
              <h3>Customer Information</h3>
              <div className='c-order__shipping-address'>
                <h4>Shipping Address</h4>
                <p className='u-bold'>{ shippingAddress.first_name } { shippingAddress.last_name }</p>
                <p>{ shippingAddress.address_line_1 }, { shippingAddress.address_line_2 }, { shippingAddress.postcode }</p>
              </div>
              <div className='c-order__shipping-method'>
                <h4>Your Shipping Method</h4>
                <p className='u-bold'>{ shippingMethod.label }</p>
                <p className='u-bold  c-order__shipping-method-delivery'>Estimated Delivery:</p><a>{ shippingMethod.description }</a>
              </div>
              <div className='c-order__payment-method'>
                <h4>Payment Method</h4>
                <div className='c-order__payment-method-card'>{ this.renderCardImage() } <span className='u-bold'>**** **** **** { cardDetails.last4 }</span><span className='u-bold'>Exp: { cardDetails.exp_month }/{ cardDetails.exp_year }</span></div>
                <p className='u-bold'>Billing Address:</p>
                <p className='u-bold'>{ billingAddress.first_name } { billingAddress.last_name }</p>
                <p>{ billingAddress.address_line_1 }, { billingAddress.address_line_2 }, { billingAddress.postcode }</p>
              </div>
            </div>
            <div className='c-order__button'>
              <Link href='/'>
                <Button
                  aria-label='Continue Shopping'
                  label='Continue shopping'
                  status='positive'
                  className='c-order__button--continue o-button--sml'
                  type='button'
                />
              </Link>
            </div>
          </div>
        </>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { order } = state
  return order
}

export default connect(mapStateToProps)(OrderPage)
