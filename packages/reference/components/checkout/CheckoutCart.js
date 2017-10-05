// Libraries
import { Component } from 'react'

// Objects
import Image from '../../objects/Image'
import Link from 'next/link'

export class CheckoutCart extends Component {
  renderLineItems () {
    return this.props.cart.lineItems.map((lineItem, index) =>
      <div aria-label='Product' key={index}>
        <Image aria-label='Product image' width={80} height={80} className='o-checkout-cart__image' />
        <ul className='o-checkout-cart__info'>
          <li aria-label='Product title'>{lineItem.title}</li>
          <li aria-label='Quantity'>Qty: {lineItem.quantity}</li>
          <li aria-label='Price'>Price: &pound;{lineItem.price}</li>
          <li aria-label='Subtotal'>Subtotal: &pound;{lineItem.price * lineItem.quantity}</li>
        </ul>
      </div>
    )
  }

  render () {
    return <div aria-label='Cart items summary' className='o-checkout-cart'>
      <h3>{this.props.title}</h3>
      <Link href='/cart'>
        <a aria-label='Edit your cart' className='c-button'>Edit</a>
      </Link>
      <div className='o-checkout-cart__wrapper'>
        {this.renderLineItems()}
      </div>
    </div>
  }
}

export default CheckoutCart
