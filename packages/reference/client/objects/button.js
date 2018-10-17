// Libraries
import { Component } from 'react'
import classNames from 'classnames'

class Button extends Component {
  render () {
    let {
      status, label, size, disabled = false,
      className, onClick, hoverStyles, ...otherProps
    } = this.props

    return (
      <div className='o-button__container' style={hoverStyles}>
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
