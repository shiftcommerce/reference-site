// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'

// Lib
import { algoliaReduxWrapper } from '../lib/algolia-redux-wrapper'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'

// Actions
import { updateLineItemQuantity, deleteLineItem } from '../actions/cart-actions'

// Components
import CartTable from '../components/cart/cart-table'
import Loading from '../components/loading'

export class CartPage extends Component {
  constructor (props) {
    super(props)

    this.updateQuantity = this.updateQuantity.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  updateQuantity (e) {
    this.props.dispatch(updateLineItemQuantity(e.target.dataset.id, parseInt(e.target.value, 10)))
  }

  deleteItem (e) {
    e.preventDefault()
    this.props.dispatch(deleteLineItem(e.target.dataset.id))
  }

  render () {
    const { cart, cart: { loading, error } } = this.props

    if (loading) {
      return (
        <Loading />
      )
    } else if (error) {
      return (
        <p>{ error }</p>
      )
    } else {
      return (
        <>
          <Head>
            <title>{ suffixWithStoreName('Your Shopping Cart') }</title>
          </Head>
          <CartTable cart={cart} updateQuantity={this.updateQuantity} deleteItem={this.deleteItem} />
        </>
      )
    }
  }
}

function mapStateToProps (state) {
  const { cart } = state
  return { cart }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(CartPage), CartPage)
