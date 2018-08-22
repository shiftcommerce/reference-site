// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import classNames from 'classnames'

// Actions
import { readCart } from '../actions/cartActions'

export class MiniBag extends Component {
  componentDidMount () {
    this.props.dispatch(readCart())
  }

  renderViewYourBagLink (lineItemCount) {
    return (
      <Link href='/cart'>
        <div className='c-minibag__cart'>
          <a aria-label='View your cart'>
            <span className='c-minibag__cart-count' >
              ({ lineItemCount })
            </span>
          </a>
          <div className='c-minibag__cart-label--small'>
            <a>
              Basket
            </a>
          </div>
          <div className='c-minibag__cart-label--large'>
            <a>
              View Your Bag
            </a>
          </div>
        </div>
      </Link>
    )
  }

  renderCheckoutButton (lineItemCount) {
    return (
      <div className='c-minibag__checkout'>
        <Link href={(lineItemCount > 0) ? '/checkout' : ''}>
          <a className={classNames('o-button o-button--primary o-button--lrg', {'o-button--disabled': (lineItemCount === 0)})} aria-label='Go to checkout'>
            CHECKOUT
          </a>
        </Link>
      </div>
    )
  }

  render () {
    let { cart } = this.props
    let lineItemCount = cart.totalQuantity

    return (
      <div className='c-header__minibag'>
        { this.renderViewYourBagLink(lineItemCount) }
        { this.renderCheckoutButton(lineItemCount) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart || {}
  }
}

export default connect(mapStateToProps)(MiniBag)
