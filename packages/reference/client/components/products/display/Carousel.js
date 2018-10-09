import { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'

class CarouselComponent extends Component {
  render () {
    const {
      product
    } = this.props

    const imageUrls = product.asset_files.map(a => a.s3_url)

    return (
      <Carousel showStatus={false} useKeyboardArrows>
        {imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <img className='c-slider-image' src={imageUrl} />
          </div>
        ))}
      </Carousel>
    )
  }
}

export default CarouselComponent
