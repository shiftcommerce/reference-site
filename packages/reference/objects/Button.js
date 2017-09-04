// Libraries
import { Component } from 'react'
import classNames from 'classnames'

class Button extends Component {
  render () {
    let {
      status,
      label,
      ...otherProps
    } = this.props

    return (
      <button className={classNames('c-button', `c-button--${status}`)} tabIndex='0' role='button' {...otherProps} >
        { label }
      </button>
    )
  }
}

export default Button
