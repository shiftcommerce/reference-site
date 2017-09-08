import { Component } from 'react'

export default class cartTable extends Component {
  renderLineItems () {
    const cartData = this.props.cart.lineItems.map((lineItem, index) =>
      <tr key={index}>
        <td>
          <img src={lineItem.image_url} height='250' width='150' />
        </td>
        <td>
          { lineItem.size }
        </td>
        <td>
          <select value={lineItem.quantity} data-variant={lineItem.sku}>
            <option value={lineItem.quantity} key={lineItem.quantity}>
              { lineItem.quantity }
            </option>
          </select>
        </td>
        <td>
          &pound;{ lineItem.price * lineItem.quantity }
        </td>
      </tr>
    )
    return cartData
  }
  render () {
    let cart = this.props.cart

    if (cart.lineItems.length === 0) {
      return null
    } else {
      return <table>
        <thead>
          <tr>
            <th>
              Your Items
            </th>
            <th>
              Size
            </th>
            <th>
              Quantity
            </th>
            <th>
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          { this.renderLineItems() }
        </tbody>
      </table>
    }
  }
}
