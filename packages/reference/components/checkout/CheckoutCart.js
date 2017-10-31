// Libraries
import { Component } from 'react'

// Objects
import Image from '../../objects/Image'
import Link from 'next/link'

export class CheckoutCart extends Component {
  renderLineItems () {
    return (
      this.props.cart.lineItems.map((lineItem, index) =>
        <div aria-label='Product' key={index} className='o-checkout-cart__product'>
          <div className='o-checkout-cart__image'>
            <Image src={lineItem.imageUrl} alt={lineItem.title} width={80} aria-label={lineItem.title} />
          </div>

          <ul className='o-checkout-cart__info'>
            <li aria-label='Product title'>{ lineItem.title }</li>
            <li aria-label='Quantity'>Qty: { lineItem.quantity }</li>
            <li aria-label='Price'>Price: &pound;{ lineItem.price }</li>
            <li aria-label='Subtotal'>Subtotal: &pound;{ lineItem.price * lineItem.quantity }</li>
          </ul>
        </div>
      )
    )
  }

  render () {
    const { title } = this.props
    return (
      <div aria-label='Cart items summary' className='o-checkout-cart'>
        <div className='o-checkout-cart__header'>
          <div>
            <h2>{ title }</h2>
          </div>

          <div>
            <Link href='/cart'>
              <a aria-label='Edit your cart' className='o-button o-button--lrg'>Edit Cart</a>
            </Link>
          </div>
        </div>

        <div className='o-checkout-cart__wrapper'>
          { this.renderLineItems() }
        </div>
      </div>
    )
  }
}

export default CheckoutCart
