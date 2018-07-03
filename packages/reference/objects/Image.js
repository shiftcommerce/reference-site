import { Component } from 'react'
import classNames from 'classnames'
import LazyLoad from 'react-lazyload'

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
        <div className={className} >
          <LazyLoad height={200}>
            <img src={src} className='c-image' {...otherProps} />
          </LazyLoad>
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
