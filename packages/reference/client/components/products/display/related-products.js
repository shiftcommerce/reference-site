// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Objects
import Image from '../../../objects/image'

class RelatedProducts extends Component {
  constructor (props) {
    super(props)
    this.renderRelatedProducts = this.renderRelatedProducts.bind(this)
  }

  renderRelatedProducts (bundles) {
    return (
      bundles.map((bundle) =>
        <li key={bundle.id}>
          <Image className='c-related-products__image' src={bundle.asset_files[0] && bundle.asset_files[0].s3_url} />

          <Link href={bundle.canonical_path} >
            <div className='c-related-products__name'>
              <a>{ bundle.name }</a>
            </div>
          </Link>
        </li>
      )
    )
  }

  render () {
    const { bundles } = this.props

    if (bundles.length >= 1) {
      return (
        <div className='c-related-products'>
          <h1 className='c-related-products__title'><span>you may also like</span></h1>

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
