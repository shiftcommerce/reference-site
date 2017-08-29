// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Objects
import ContentImage from '../../objects/ContentImage'

class RelatedProducts extends Component {
  constructor (props) {
    super(props)
    this.renderRelatedProducts = this.renderRelatedProducts.bind(this)
  }

  renderRelatedProducts (bundles) {
    return (
      bundles && bundles.map((bundle) =>
        bundle.products.map((product, idx) =>
          <li key={idx}>

            <ContentImage src={product.asset_files[0] && product.asset_files[0].url} height='73' width='73' />

            <Link href={product.canonical_path} >
              <a>{ product.title }</a>
            </Link>
          </li>
        )
      )
    )
  }

  render () {
    let {
      bundles
    } = this.props

    return (
      <div>
        <h3>Related Products</h3>

        <ul>
          { this.renderRelatedProducts(bundles) }
        </ul>
      </div>
    )
  }
}

export default RelatedProducts
