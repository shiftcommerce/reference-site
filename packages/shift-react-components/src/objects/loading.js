import React, { PureComponent } from 'react'
import classNames from 'classnames'

export class Loading extends PureComponent {
  render () {
    const {
      className
    } = this.props

    return (
      <div className={classNames('o-loading', className)} />
    )
  }
}
