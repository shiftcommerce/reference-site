// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Lib
import { decimalPrice } from '../../lib/decimal-price'

// Objects
import { Image } from 'shift-react-components'

class LineItems extends Component {
  // TODO: extract this out into it's own service class
  renderOptions (lineItem) {
    let availableQuantity = Array.from(Array(Math.min(lineItem.stock_available_level, 11)).keys())
    availableQuantity.shift()

    return <select value={lineItem.unit_quantity} onChange={this.props.updateQuantity} data-id={lineItem.id}>
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
        <div className='c-line-items__remove'>
          <div className='c-line-items__delete'>
            <a className='c-line-items__delete-button' data-id={lineItem.id} onClick={this.props.deleteItem} >
              Delete
            </a>
          </div>
        </div>
        <div className='c-line-items__amounts'>
          { lineItem.sub_total !== lineItem.total && (
            <>
              <a className='c-line-items__amount'>&pound;{ decimalPrice(lineItem.sub_total) }</a>
              <a className='c-line-items__amount c-line-items__amount--discount'>- &pound;{ decimalPrice(lineItem.total_discount) }</a>
            </>
          ) }
          <a className='c-line-items__amount c-line-items__amount--total'>&pound;{ decimalPrice(lineItem.total) }</a>
        </div>
      </>
    )
  }

  renderTitle (lineItem) {
    return (
      <div className='c-line-items__title'>
        <div className='c-line-items__details'>
          <h4 className='c-line-items__details-title  u-bold'>
            { `${lineItem.item.product.title} - ${lineItem.item.title}` }
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
      <div className='c-line-items__colour'>
        <div className='c-line-items__param  u-bold'>
          <span>Colour</span>
        </div>
      </div>
      <div className='c-line-items__quantity'>
        <div className='c-line-items__param u-bold'><span>Quantity</span></div>
      </div>
      <div className='c-line-items__param  c-line-items__colour-selected'>
        <span>Grey</span>
      </div>
      <div className='c-line-items__param  c-line-items__quantity-selected'>
        <span>{ this.renderOptions(lineItem) }</span>
      </div>
    </>
  }

  renderLineItems () {
    const cartData = this.props.cart.line_items.sort((item1, item2) => parseInt(item1.id) - parseInt(item2.id)).map((lineItem) =>
      <div className='c-line-items__sections' key={lineItem.item.product.slug}>
        <div className='c-line-items__images'>
          <Link href={`/slug?slug=${lineItem.item.product.canonical_path}`} key={lineItem.item.product.slug}>
            <Image className='c-line-items__image' src={lineItem.item.picture_url} alt={lineItem.item.title} key={lineItem.item.product.slug} aria-label={lineItem.item.title} />
          </Link>
        </div>
        <div className='c-line-items__information'>
          { this.renderTitle(lineItem) }
          { this.renderParams(lineItem) }
          { this.renderButtonsAndTotal(lineItem) }
        </div>
      </div>
    )
    return cartData
  }

  render () {
    const { cart } = this.props

    if (cart.line_items_count === 0) {
      return null
    } else {
      return <div className='c-line-items'>
        { this.renderLineItems() }
      </div>
    }
  }
}

export default LineItems
