// Libraries
import { Component } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

// Objects
import Image from '../../objects/Image'

class ProductHit extends Component {
  renderRatingStars (hit) {
    return (
      [1, 2, 3, 4, 5].map((key, index) =>
        <span key={key} className={classNames({'c-product__rating--fill': key <= hit.rating, 'c-product__rating--empty': key > hit.rating})}>
          &#9733;
        </span>
      )
    )
  }

  render () {
    let {
      hit
     } = this.props

    return (
      <section className='c-product'>
        <Link href='/products/708a0142-e60f-4332-9a8b-1359c5af9ec4' >
          <a>
            <div className='c-product__image-container'>
              <Image className='c-product__image' src={hit.image} />
            </div>

            <div className='c-product__title'>
              {hit.name}
            </div>

            <div className='c-product__price'>
          &pound;{hit.price}
            </div>

            <div>
              { this.renderRatingStars(hit) }
              <span className='c-product__rating-badge'>
                {hit.rating}
              </span>
            </div>
          </a>
        </Link>
      </section>
    )
  }
}

export default ProductHit
