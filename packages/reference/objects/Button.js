// Libraries
import { Component } from 'react'
import classNames from 'classnames'

class Button extends Component {
  render () {
    let {
      status,
      label,
      size,
      disabled,
      className,
      ...otherProps
    } = this.props

    disabled = disabled || false
    status = status || 'primary'
    size = size || 'lrg'

    return (
      <button
        className={classNames(className, 'o-button', `o-button--${status}`, `o-button--${size}`, {'o-button--disabled': disabled})}
        tabIndex='0'
        role='button'
        disabled={disabled}
        {...otherProps}
      >
        { label }
      </button>
    )
  }
}

export default Button
