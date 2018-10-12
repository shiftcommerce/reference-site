// Libraries
import { Component } from 'react'
import classNames from 'classnames'

class Button extends Component {
  render () {
    let {
      status, label, size, disabled,
      className, onClick, ...otherProps
    } = this.props

    disabled = disabled || false

    return (
      <button
        className={classNames(
          className,
          'o-button',
          status ? `o-button--${status}` : null,
          size ? `o-button--${size}` : null,
          { 'o-button--disabled': disabled }
        )}
        tabIndex='0' role='button'
        disabled={disabled} onClick={onClick}
        {...otherProps}
      >
        { label }
      </button>
    )
  }
}

export default Button
