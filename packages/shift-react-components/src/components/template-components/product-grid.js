// Libraries
import React, { PureComponent } from 'react'
import classNames from 'classnames'
import t from 'typy'

// Components
import ProductListingCard from '../products/listing/product-listing-card'

import Config from '../../lib/config'
import link from '../../objects/link'

class ProductGrid extends PureComponent {
  /**
   * Render up to 4 products, using  the <ProductListingCard /> component
   * @param  {Object} componentData
   * @return {string} - HTML markup for the component
   */
  products (componentData) {
    const products = []

    for (let i of [...Array(4).keys()]) {
      let product = componentData.products[i]

      products.push(
        <ProductListingCard
          className='o-card-grid__card'
          title={product.title}
          assetFileUrl={product.picture_url}
          assetFileAltText={product.title}
          minPrice={product.min_current_price}
          maxPrice={product.max_current_price}
          productPath={product.canonical_path}
          productRating={product.product_rating}
          key={product.id}
          imageHeight={componentData.image_height}
          imageWidth={componentData.image_width}
        />
      )
    }

    return products
  }

  /**
   * Render a link to a category
   * @param  {Object} componentData
   * @return {string} - HTML markup for the component
   */
  catButton (componentData) {
    const Link = Config.get().Link || link
    return (
      <Link href={t(componentData, 'cat_url[0].canonical_path').safeObject} className='o-template-component__cat-button o-button o-button--primary'>
        { componentData.cat_text }
      </Link>
    )
  }

  render () {
    const { componentData, className } = this.props

    return (
      <section className={classNames(className, 'o-template-component u-center-align')}>
        <h1 className='c-component-header'>{ componentData.header }</h1>
        <div className='o-card-grid o-card-grid--4d-2m'>
          { this.products(componentData) }
        </div>
        { componentData.cat_url && componentData.cat_url[0] && componentData.cat_text && this.catButton(componentData) }
      </section>
    )
  }
}

export default ProductGrid
