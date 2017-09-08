// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Objects
import Image from '../../objects/Image'

class RelatedProducts extends Component {
  constructor (props) {
    super(props)
    this.renderRelatedProducts = this.renderRelatedProducts.bind(this)
  }

  renderRelatedProducts (bundles) {
    return (
      bundles.map((bundle) =>
        bundle.products.map((product, idx) =>
          <li key={idx}>

            <Image src={product.asset_files[0] && product.asset_files[0].url} height={73} width={73} />

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

    if (bundles) {
      return (
        <div>
          <h3>Related Products</h3>

          <ul>
            { this.renderRelatedProducts(bundles) }
          </ul>
        </div>
      )
    } else {
      return null
    }
  }
}

export default RelatedProducts
