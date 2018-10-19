// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { updateQuantity } from '../actions/cart-actions'

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
    const lineItem = {
      sku: e.target.dataset.variant,
      quantity: parseInt(e.target.value, 10)
    }
    this.props.dispatch(updateQuantity(lineItem))
  }

  deleteItem (e) {
    e.preventDefault()
    const lineItem = {
      sku: e.target.dataset.variant,
      quantity: 0
    }
    this.props.dispatch(updateQuantity(lineItem))
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
        <CartTable cart={cart} updateQuantity={this.updateQuantity} deleteItem={this.deleteItem} />
      )
    }
  }
}

function mapStateToProps (state) {
  const { cart } = state
  return { cart }
}

export default connect(mapStateToProps)(CartPage)