// Libraries
import { Component } from 'react'
import Link from 'next/link'
import { fixedPrice } from '../../lib/fixedPrice'

// Objects
import Image from '../../objects/Image'

class LineItems extends Component {
  // TODO: extract this out into it's own service class
  renderOptions (lineItem) {
    let availableQuantity = Array.from(Array(Math.min(lineItem.stockAvailableLevel, 11)).keys())
    availableQuantity.shift()

    return <select value={lineItem.quantity} onChange={this.props.updateQuantity} data-variant={lineItem.sku}>
      {
        availableQuantity.map(index => {
          return <option key={index} value={index} aria-setsize={index} aria-posinset={index + 1}>
            {index}
          </option>
        })
      }
    </select>
  }

  renderButtonsAndTotal (lineItem) {
    return <>
      <div className='o-grid-item5__lineitems'>
        <div className='c-line-items__buttons'>
          <div className='c-line-items__anchor'>
            <a className='c-line-items__delete' data-variant={lineItem.sku} onClick={this.props.deleteItem} >
              Delete
            </a>
          </div>
        </div>
        <div className='c-line-items__total-wrapper'>
          <a className='c-line-items__total'>&pound;{fixedPrice(lineItem.price * lineItem.quantity)}</a>
        </div>
      </div>
    </>
  }

  renderTitle (lineItem) {
    return <>
      <div className='o-grid-item2__lineitems'>
        <div className='c-line-items__details'>
          <h4 className='c-line-items__details-title  u-bold'>
            {lineItem.title}
          </h4>
          <div className='c-line-items__details-sku'>
            <span>
              {lineItem.sku}
            </span>
          </div>
        </div>
      </div>
    </>
  }

  renderParams (lineItem) {
    return <>
      <div className='o-grid-item3__lineitems'>
        <div className='c-line-items__colour  u-bold'>
          <span>Colour</span>
        </div>
        <div className='c-line-items__size  u-bold'>
          <span>Option</span>
        </div>
        <div className='c-line-items__quantity u-bold'>
          <span>Quantity</span>
        </div>
      </div>
      <div className='o-grid-item4__lineitems'>
        <span className='c-line-items__space'>Grey</span>
        <span className='c-line-items__space'>{lineItem.variant}</span>
        <span className='c-line-items__space'>{ this.renderOptions(lineItem) }</span>
      </div>
    </>
  }

  renderLineItems () {
    const cartData = this.props.cart.lineItems.map((lineItem, index) =>
      <div className='o-grid-container__lineitems' key={lineItem.slug}>
        <div className='o-grid-item1__lineitems'>
          <Link href={`/slug?slug=${lineItem.slug}`} as={`${lineItem.canonical_path}`} key={lineItem.slug}>
            <Image className='c-line-items__image' src={lineItem.imageUrl} alt={lineItem.title} key={lineItem.slug} aria-label={lineItem.title} />
          </Link>
        </div>
        { this.renderTitle(lineItem) }
        { this.renderParams(lineItem) }
        { this.renderButtonsAndTotal(lineItem) }
      </div>
    )
    return cartData
  }

  render () {
    const cart = this.props.cart

    if (cart.totalQuantity === 0) {
      return null
    } else {
      return <div className='c-line-items'>
        { this.renderLineItems() }
      </div>
    }
  }
}

export default LineItems
