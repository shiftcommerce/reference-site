// Libraries
import { Component } from 'react'

class CartNoData extends Component {
  render () {
    return (
      <section className='c-cart-no-data'>
        <p>
          You have no items in your cart. If you are expecting items in it, please refresh.
        </p>
        <p>
          If issue still persists, please check with our customer care.
        </p>
      </section>
    )
  }
}

export default CartNoData
