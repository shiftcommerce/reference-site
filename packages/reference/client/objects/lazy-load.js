// Libraries
import { Component } from 'react'
import FadeIn from 'react-lazyload-fadein'

// Objects
import Image from '../objects/image'

class LazyLoad extends Component {
  render () {
    const {
      src,
      className,
      imageHeight,
      imageWidth
    } = this.props

    // Calculate the aspect ratio by dividing the width + height
    // then * 100 to calculate the percentage.
    const paddingBottom = (imageHeight / imageWidth * 100).toFixed(2)

    // This sets the outer div to be the same height as the image that is
    // being lazyloaded in so we dont see content getting pushed down.
    const divStyle = {
      paddingBottom: `${paddingBottom}%`,
      height: 0,
      width: '100%',
      background: '#EEEFF3'
    }

    return (
      <div style={divStyle}>
        <FadeIn
          once
          offset={150}
          render={onload => (
            <Image src={src} className={className} onLoad={onload} />
          )}
        />
      </div>
    )
  }
}

export default LazyLoad
