import { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'

import Image from '../../../objects/Image'

class CarouselComponent extends Component {
  render () {
    const {
      product
    } = this.props

    const imageUrls = product.asset_files.map(a => a.s3_url)

    return (
      <Carousel showThumbs={false} showStatus={false} useKeyboardArrows>
        {imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <Image className='c-slider-image' src={imageUrl} />
          </div>
        ))}
      </Carousel>
    )
  }
}

export default CarouselComponent
