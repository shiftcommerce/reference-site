// Libraries
import { Component } from 'react'

class ContentImage extends Component {
  render () {
    let {
      src,
      ...otherProps
    } = this.props

    const placeholderImagePath = '/static/placeholder.png'

    return (
      <img src={src || placeholderImagePath} {...otherProps} />
    )
  }
}

export default ContentImage
