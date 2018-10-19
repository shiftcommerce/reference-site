// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Lib
import { fixedPrice } from '../../lib/fixed-price'

// Objects
import Image from '../../objects/image'

class LineItems extends Component {
  // TODO: extract this out into it's own service class
  renderOptions (lineItem) {
    let availableQuantity = Array.from(Array(Math.min(lineItem.stockAvailableLevel, 11)).keys())
    availableQuantity.shift()

    return <select value={lineItem.quantity} onChange={this.props.updateQuantity} data-variant={lineItem.sku}>
      {
        availableQuantity.map(index => {
          return <option key={index} value={index} aria-setsize={index} aria-posinset={index + 1}>
            { index }
          </option>
        })
      }
    </select>
  }

  renderButtonsAndTotal (lineItem) {
    return (
      <>
        <div className='c-line-items__grid-item3'>
          <div className='c-line-items__delete'>
            <a className='c-line-items__delete-button' data-variant={lineItem.sku} onClick={this.props.deleteItem} >
              Delete
            </a>
          </div>
        </div>
        <div className='c-line-items__grid-item10'>
          <a className='c-line-items__total'>&pound;{ fixedPrice(lineItem.price * lineItem.quantity) }</a>
        </div>
      </>
    )
  }

  renderTitle (lineItem) {
    return (
      <div className='c-line-items__grid-item2'>
        <div className='c-line-items__details'>
          <h4 className='c-line-items__details-title  u-bold'>
            { lineItem.title }
          </h4>
          <div className='c-line-items__details-sku'>
            <span>
              { lineItem.sku }
            </span>
          </div>
        </div>
      </div>
    )
  }

  renderParams (lineItem) {
    return <>
      <div className='c-line-items__grid-item4'>
        <div className='c-line-items__param  u-bold'>
          <span>Colour</span>
        </div>
      </div>
      <div className='c-line-items__grid-item6'>
        <div className='c-line-items__param  u-bold'>
          <span>Option</span>
        </div>
      </div>
      <div className='c-line-items__grid-item8'>
        <div className='c-line-items__param u-bold'><span>Quantity</span></div>
      </div>
      <div className='c-line-items__param  c-line-items__grid-item5'>
        <span>Grey</span>
      </div>
      <div className='c-line-items__param  c-line-items__grid-item7'>
        <span>{ lineItem.variant }</span>
      </div>
      <div className='c-line-items__param  c-line-items__grid-item9'>
        <span>{ this.renderOptions(lineItem) }</span>
      </div>
    </>
  }

  renderLineItems () {
    const cartData = this.props.cart.lineItems.map((lineItem, index) =>
      <div className='c-line-items__grid' key={lineItem.slug}>
        <div className='c-line-items__grid-item1'>
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
