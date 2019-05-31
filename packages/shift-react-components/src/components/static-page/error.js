// Libraries
import React, { PureComponent } from 'react'
import classNames from 'classnames'

// Components
import StaticPageErrorBody from './error-body'
import StaticPageErrorDetails from './error-details'
/**
 * Display the wrapper for the static page error, which includes the error
 * body, and the error details
 */
class StaticPageError extends PureComponent {
  render () {
    return (
      <div className={classNames(this.props.className, 'c-static-page-error')}>
        <StaticPageErrorBody
          title={this.props.title}
          subtitle={this.props.subtitle}
          className={this.props.bodyClassName}
        />
        <StaticPageErrorDetails
          errorDetails={this.props.errorDetails}
          isProduction={this.props.isProduction}
          className={this.props.detailsClassName}
        />
        { this.props.children }
      </div>
    )
  }
}

export default StaticPageError
