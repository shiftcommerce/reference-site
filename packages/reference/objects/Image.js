import { Component } from 'react'
import classNames from 'classnames'

class Image extends Component {
  styles () {
    let basicStyles = {
      height: this.props.height,
      width: this.props.width
    }

    if (basicStyles.height < 200) {
      return { ...basicStyles, backgroundSize: ((basicStyles.height * 19) / 20) }
    } else if (basicStyles.width < 200) {
      return { ...basicStyles, backgroundSize: ((basicStyles.width * 19) / 20) }
    } else {
      return { ...basicStyles, backgroundSize: 150 }
    }
  }

  render () {
    let {
      src,
      className
    } = this.props

    if (src) {
      return <img {...this.props} />
    } else {
      return <div className={classNames('c-dummy_image', className)} style={this.styles()} />
    }
  }
}

export default Image
