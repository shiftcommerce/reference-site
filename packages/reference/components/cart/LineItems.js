import { Component } from 'react'
import Link from 'next/link'

// Objects
import Image from '../../objects/Image'

export default class LineItems extends Component {
  renderOptions (lineItem) {
    return <select value={lineItem.quantity} onChange={this.props.updateQuantity} data-variant={lineItem.sku}>
      {
        [ ...Array(Math.max(lineItem.quantity, 11)) ].map((key, index) =>
          <option value={index} key={index} aria-setsize={index} aria-posinset={index + 1}>
            { index }
          </option>
        )
      }
    </select>
  }

  renderLineItems () {
    const cartData = this.props.cart.lineItems.map((lineItem, index) =>
      <tr key={index} className='c-line-items__column'>
        <td aria-label={lineItem.title}>
          <Link href={`/products/${lineItem.productSku}`}>
            <a>
              <Image src={lineItem.imageUrl} alt={lineItem.title} className='c-line-items__image' aria-label={lineItem.title} />
              { lineItem.title }
            </a>
          </Link>
        </td>
        <td>
          { lineItem.size }
        </td>
        <td>
          { this.renderOptions(lineItem) }
        </td>
        <td>
          -&pound;{ (lineItem.discount || 0) * lineItem.quantity }
        </td>
        <td>
          &pound;{ lineItem.price * lineItem.quantity }
        </td>
      </tr>
    )
    return cartData
  }

  render () {
    const cart = this.props.cart

    if (cart.lineItems.length === 0) {
      return null
    } else {
      return <table className='c-line-items'>
        <thead>
          <tr className='c-line-items__header'>
            <th scope='col'>
              Your Items
            </th>
            <th scope='col'>
              Size
            </th>
            <th scope='col'>
              Quantity
            </th>
            <th scope='col'>
              You save
            </th>
            <th scope='col'>
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
