// Libraries
import { Component } from 'react'

class ProductListing extends Component {
  renderFacets (categoryId) {
    return (
      <div className='c-product_list__sidebar--filter'>

        <p className='c-product_list__sidebar--filter-title'>Colour</p>

        <p className='c-product_list__sidebar--filter-title'>Size</p>
      </div>
    )
  }

  renderActions () {
    return (
      <div className='c-product_list__actions' />
    )
  }

  render () {
    let {
      category
    } = this.props

    const categoryId = category.data.id

    return (
      <div className='c-product_list'>
        <div className='c-product_list__container'>
          <aside className='c-product_list__sidebar'>
            { this.renderFacets(categoryId) }
          </aside>

          <main className='c-product_list__listing'>

            { this.renderActions() }

            <div role='product list' className='c-product_list__products' />

            { this.renderActions() }
          </main>
        </div>
      </div>

    )
  }
}

export { ProductListing }
