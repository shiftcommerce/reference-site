// Libraries
import { PureComponent } from 'react'
import Link from 'next/link'
import t from 'typy'

// Objects
import { Button } from 'shift-react-components'

// Components
import ProductListingCard from '../products/listing/product-listing-card'

class ProductGrid extends PureComponent {
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

  catButton (componentData) {
    return (
      <Link href={t(componentData, 'cat_url[0].canonical_path').safeObject}>
        <a>
          <Button
            className='c-template-component__cat-button'
            label={componentData.cat_text}
            status='primary'
          />
        </a>
      </Link>
    )
  }

  render () {
    const { componentData } = this.props

    return (
      <section className='o-template-component u-center-align'>
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
