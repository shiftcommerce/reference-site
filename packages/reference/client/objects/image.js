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

  responsiveImage (src, mobileSrc, otherProps) {
    const mobileBreakPoint = '(max-width: 768px)'

    return (
      <picture>
        { mobileSrc && <source media={mobileBreakPoint} srcSet={mobileSrc} /> }
        <img src={src} srcSet={`${src} 769w`} className='c-image' {...otherProps} />
      </picture>
    )
  }

  render () {
    let {
      src,
      mobileSrc,
      className,
      ...otherProps
    } = this.props

    if (src) {
      return (
        <div className={className} >
          <LazyLoad height={200}>
            { this.responsiveImage(src, mobileSrc, otherProps) }
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
