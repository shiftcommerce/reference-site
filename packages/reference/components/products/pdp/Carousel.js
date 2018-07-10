import { Component } from 'react'
import Slider from 'react-slick'

import Image from '../../../objects/Image'

class Carousel extends Component {
  render () {
    const {
      product
    } = this.props

    const settings = {
      fade: true,
      arrows: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    const imageUrls = product.asset_files.map(a => a.s3_url)

    return (
      <div>
        <Slider {...settings}>
          {imageUrls.map(imageUrl => (
            <div key={imageUrl}>
              <Image className='c-slider-image' src={imageUrl} />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}

export default Carousel
