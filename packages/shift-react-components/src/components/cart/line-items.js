// Libraries
import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

// Lib
import { decimalPrice } from '../../lib/decimal-price'
import DropdownSelect from '../../objects/dropdown-select'
import { Image } from '../../objects/image'
import Config from '../../lib/config'
import Link from '../../objects/link'

export class LineItems extends Component {
  constructor (props) {
    super(props)

    this.Link = Config.get().Link || Link
  }

  /**
   * Render the line item quantity
   * @param  {Object} lineItem
   * @return {string} - HTML markup for the component
   * @todo extract this out into it's own service class
   */
  renderLineItemQuantity (lineItem) {
    const { updateQuantity } = this.props

    if (updateQuantity) {
      return (
        <DropdownSelect
          className='c-line-items__quantity-select'
          data-id={lineItem.id}
          label='Quantity'
          onChange={this.props.updateQuantity}
          options={this.renderQuantityOptions(lineItem)}
          skipLabel
          skipPrompt
          value={lineItem.unit_quantity}
        />
      )
    } else {
      return <span className='c-line-items__quantity-amount'>{ lineItem.unit_quantity }</span>
    }
  }

  /**
  * Builds options prop for the DropdownSelect component.
  * @param {Object} lineItem - A line item from cart.
  */
  renderQuantityOptions (lineItem) {
    // Render options from 1 to 10 or maximum available stock, whichever is lower.
    const maxStock = Math.min(10, lineItem.stock_available_level)
    const baseOptions = Array.from({ length: maxStock }, (_, i) => ({
      title: i + 1,
      value: i + 1
    }))

    // Render an additional option with the current quantity if it is higher than the maximum above.
    if (lineItem.unit_quantity > maxStock) {
      baseOptions.push({
        title: lineItem.unit_quantity,
        value: lineItem.unit_quantity
      })
    }

    return baseOptions
  }

  /**
   * Render the prices and actions block of the line item
   * @param  {Object} lineItem
   * @return {string} - HTML markup for the component
   */
  renderButtonsAndTotal (lineItem) {
    return (
      <div className='c-line-items__amounts'>
        { lineItem.sub_total !== lineItem.total && (
          <Fragment>
            <a className='c-line-items__amount'>&pound;{ decimalPrice(lineItem.sub_total) }</a>
            <a className='c-line-items__amount c-line-items__amount--discount'>- &pound;{ decimalPrice(lineItem.total_discount) }</a>
          </Fragment>
        ) }
        <a className='c-line-items__amount c-line-items__amount--total'>&pound;{ decimalPrice(lineItem.total) }</a>
      </div>
    )
  }

  /**
   * Render the title block of the line item
   * @param  {Object} lineItem
   * @return {string} - HTML markup for the component
   */
  renderTitle (lineItem) {
    return (
      <div className='c-line-items__title'>
        <div className='c-line-items__details'>
          <h4 className='c-line-items__details-title u-bold'>
            { lineItem.item.product.title }{ (lineItem.item.product.title && lineItem.item.title) && ' - '}{ lineItem.item.title }
          </h4>
          <div className='c-line-items__details-sku'>
            <span>
              { lineItem.sku }
            </span>
          </div>
        </div>
        { this.props.deleteItem && <div className='c-line-items__remove'>
          <div className='c-line-items__delete'>
            <a className='c-line-items__delete-button' data-id={lineItem.id} onClick={this.props.deleteItem} >
              Delete
            </a>
          </div>
        </div> }
      </div>
    )
  }

  /**
   * Render the parameters block of the line item, which contains the variants
   * and the quantities
   * @param  {Object} lineItem
   * @return {string} - HTML markup for the component
   */
  renderParams (lineItem) {
    return (
      <div className='c-line-items__quantity'>
        <div className='c-line-items__quantity-header'><span>Quantity</span></div>
        { this.renderLineItemQuantity(lineItem) }
      </div>
    )
  }

  /**
   * Render the line item rows
   * Loop through the items in the cart, sorted by the ID of line item
   * @param  {Object} cart
   * @return {string} - HTML markup for the component
   */
  renderLineItems (lineItems) {
    const cartData = lineItems.sort((item1, item2) => parseInt(item1.id) - parseInt(item2.id)).map((lineItem) => {
      const picture_url = lineItem.item.picture_url ? lineItem.item.picture_url : '/static/placeholder.png'

      return (
        <div className={classNames('c-line-items__sections', { 'c-line-items__sections--error': (lineItem.unit_quantity > lineItem.stock_available_level) })} key={lineItem.item.sku}>
          <div className='c-line-items__images'>
            <this.Link href={`/slug?slug=${lineItem.item.product.canonical_path}`}>
              <Image className='c-line-items__image' src={picture_url} alt={lineItem.item.title} key={lineItem.item.product.slug} aria-label={lineItem.item.title} />
            </this.Link>
          </div>
          <div className='c-line-items__information'>
            { this.renderTitle(lineItem) }
            { this.renderParams(lineItem) }
            { this.renderButtonsAndTotal(lineItem) }
          </div>
        </div>
      )
    })

    return cartData
  }

  render () {
    const { lineItems, lineItemsCount } = this.props

    if (!lineItemsCount) {
      return null
    } else {
      return (
        <div className='c-line-items'>
          { this.renderLineItems(lineItems) }
        </div>
      )
    }
  }
}

LineItems.propTypes = {
  deleteItem: PropTypes.func,
  lineItems: PropTypes.arrayOf(PropTypes.object),
  lineItemsCount: PropTypes.number,
  updateQuantity: PropTypes.func
}
