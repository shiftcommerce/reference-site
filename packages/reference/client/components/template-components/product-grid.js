// Libraries
import { PureComponent } from 'react'
import Link from 'next/link'

// Objects
import Button from '../../objects/button'

// Components
import ProductListingCard from '../products/listing/product-listing-card'

class ProductGrid extends PureComponent {
  products (componentData) {
    const products = []

    for (let i of [...Array(4).keys()]) {
      products.push(
        <ProductListingCard
          className="o-card-grid__card"
          product={componentData.products[i]}
          key={componentData.products[i].id}
        />
      )
    }

    return products
  }

  catButton (componentData) {
    return (
      <Link href={componentData.cat_url[0].canonical_path}>
        <a>
          <Button
            className="c-template-component__cat-button"
            label={componentData.cat_text}
            status="primary"
          />
        </a>
      </Link>
    )
  }

  render () {
    const { componentData } = this.props

    return (
      <section className="o-template-component u-center-align">
        <h1 className="c-component-header">{ componentData.header }</h1>
        <div className="o-card-grid o-card-grid--4d-2m">
          { this.products(componentData) }
        </div>
        { componentData.cat_url && componentData.cat_url[0] && componentData.cat_text && this.catButton(componentData) }
      </section>
    )
  }
}

export default ProductGrid
