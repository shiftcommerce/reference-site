// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import classNames from 'classnames'

// Actions
import { readCart } from '../actions/cart-actions'

// Objects
import { Button, Image } from 'shift-react-components'

export class MiniBag extends Component {
  componentDidMount () {
    this.props.dispatch(readCart())
  }

  renderIconAndCount (lineItemCount) {
    return (
      <div className='c-minibag__cart-image'>
        <div className='c-minibag__cart-image-count' >
          { lineItemCount }
        </div>
        <Image className='c-minibag__cart-image-icon' src='/static/bag-icon.svg' />
      </div>
    )
  }

  renderViewYourBagLink (lineItemCount) {
    return (
      <Link href='/cart'>
        <div className='c-minibag__cart'>
          { this.renderIconAndCount(lineItemCount) }
          <a href='/cart'>
            Basket
          </a>
        </div>
      </Link>
    )
  }

  renderCheckoutButton (lineItemCount) {
    return (
      <div className='c-minibag__checkout'>
        <Link href={(lineItemCount > 0) ? '/checkout' : ''}>
          <Button className={classNames({ 'o-button--disabled': (lineItemCount === 0) })} label='Checkout' status='primary' aria-label='Go to checkout' />
        </Link>
      </div>
    )
  }

  render () {
    const { cart } = this.props
    const lineItemCount = cart.line_items_count || 0

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
