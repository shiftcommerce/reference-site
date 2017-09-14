// Libraries
import { Component } from 'react'
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'

// Actions
import { readCart } from '../actions/cartActions'

// Utils
import { configureStore } from '../utils/configureStore'

export class MiniBag extends Component {
  componentDidMount () {
    this.props.dispatch(readCart())
  }

  render () {
    return <div>
      <Link href='/cart'>
        <a aria-label='View your cart'>
          View Your Bag
          <span style={{marginLeft: '5px', marginRight: '5px'}}>
            ({ this.props.cart.lineItems.length })
          </span>
        </a>
      </Link>
      <Link href='/checkout'>
        <a className='c-button c-button--negative c-button--lrg' aria-label='Go to checkout'>
          CHECKOUT
        </a>
      </Link>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart || {}
  }
}

export default withRedux(configureStore, mapStateToProps)(MiniBag)
