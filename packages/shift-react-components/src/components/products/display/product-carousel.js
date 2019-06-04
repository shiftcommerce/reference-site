import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'

export class ProductCarousel extends Component {
  render () {
    const { assetFiles } = this.props

    const productImages = assetFiles.map(asset => {
      return { id: asset.id, url: asset.s3_url }
    })

    return (
      <Carousel showStatus={false} useKeyboardArrows>
        { productImages.map((image) => (
          <img key={image.id} src={image.url} />
        )) }
      </Carousel>
    )
  }
}
