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
        <a aria-label='View your cart'>
          View Your Bag
          <span style={{marginLeft: '5px', marginRight: '5px'}}>
            ({ lineItemCount })
          </span>
        </a>
      </Link>
    )
  }

  renderCheckoutButton (lineItemCount) {
    return (
      <Link href={(lineItemCount > 0) ? '/checkout' : ''}>
        <a className={classNames('o-button o-button--primary o-button--lrg', {'o-button--disabled': (lineItemCount === 0)})} aria-label='Go to checkout'>
          CHECKOUT
        </a>
      </Link>
    )
  }

  render () {
    let { cart } = this.props
    let lineItemCount = cart.totalQuantity

    return (
      <div>
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
