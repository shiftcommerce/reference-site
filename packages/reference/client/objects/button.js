// Libraries
import { Component } from 'react'
import classNames from 'classnames'

class Button extends Component {
  render () {
    const {
      status, label, size, disabled = false,
      className, containerClassName, onClick, hoverStyles, ...otherProps
    } = this.props

    return (
      <div className={classNames('o-button__container', containerClassName)} style={hoverStyles}>
        <button
          className={classNames(
            className,
            'o-button',
            { [`o-button--${status}`]: status },
            { [`o-button--${size}`]: size },
            { 'o-button--disabled': disabled }
          )}
          tabIndex='0' role='button'
          disabled={disabled} onClick={onClick}
          {...otherProps}
        >
          { label }
        </button>
      </div>
    )
  }
}

export default Button
