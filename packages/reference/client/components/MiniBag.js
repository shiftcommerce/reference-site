// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import classNames from 'classnames'
import Cookies from 'js-cookie'

// Actions
import { readCart } from '../actions/cartActions'

// Objects
import Button from '../objects/Button'

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
              { lineItemCount }
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
    const signedIn = Cookies.get('signedIn')

    return (
      <div className='c-minibag__checkout'>
        <Link href={(lineItemCount > 0) ? '/checkout' : ''}>
          <Button className={classNames({ 'o-button--disabled': (lineItemCount === 0) })} label="Checkout" status="primary" aria-label='Go to checkout'>
          </Button>
        </Link>
        { this.renderMyAccount(signedIn) }
        { this.renderLogout(signedIn) }
      </div>
    )
  }

  renderMyAccount (signedIn) {
    return (
      <Link href={(signedIn) ? '/account/myaccount' : '/account/login'} as='/account/myaccount' >
        <a className='o-header__myaccount'>My Account</a>
      </Link>
    )
  }

  renderLogout (signedIn) {
    if (signedIn) {
      return (
        <a href='/account/logout' className='o-header__myaccount'>
          Logout
        </a>
      )
    }
  }

  render () {
    const { cart } = this.props
    const lineItemCount = cart.totalQuantity

    return (
      <div className='c-header__minibag'>
        { this.renderViewYourBagLink(lineItemCount) }
        { this.renderCheckoutButton(lineItemCount) }
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { cart } = state
  return { cart }
}

export default connect(mapStateToProps)(MiniBag)
