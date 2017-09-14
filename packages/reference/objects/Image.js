import { Component } from 'react'
import classNames from 'classnames'

class Image extends Component {
  styles () {
    return {
      height: this.props.height,
      width: this.props.width
    }
  }

  render () {
    let {
      src,
      className,
      ...otherProps
    } = this.props

    if (src) {
      return (
        <div className={className} style={this.styles()} >
          <img src={src} className='c-image' {...otherProps} />
        </div>
      )
    } else {
      return (
        <div className={classNames('c-dummy_image', className)} style={this.styles()} />
      )
    }
  }
}

export default Image
