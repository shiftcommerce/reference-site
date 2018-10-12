import React from 'react'

class StaticPageError extends React.Component {
  constructor (props) {
    super(props)
    this.state = {detailsShown: false}

    this.toggleDetails = this.toggleDetails.bind(this)
  }

  render () {
    const production = process.env.NODE_ENV === 'production'
    const { error } = this.props
    let details

    if (!production) {
      details = (
        <>
          {this.state.detailsShown ? null : (
            <p className="c-static-page-error__details-toggle" onClick={this.toggleDetails}>Show details</p>
          )}
          {this.state.detailsShown ? (
            <>
              <p className="c-static-page-error__details-toggle" onClick={this.toggleDetails}>Hide details</p>
              <div className="c-static-page-error__details">
                <p className="c-static-page-error__detail-header">Endpoint</p>
                <p className="c-static-page-error__detail">{JSON.stringify(error.request.endpoint)}</p>
                <p className="c-static-page-error__detail-header">Query</p>
                <p className="c-static-page-error__detail">{JSON.stringify(error.request.query)}</p>
                <p className="c-static-page-error__detail-header">Response data</p>
                <p className="c-static-page-error__detail">{JSON.stringify(error.data)}</p>
              </div>
            </>
          ) : null}
        </>
      )
    }

    return (
      <div className="o-media c-static-page-error">
        <img className="o-media__img c-static-page-error__image" src="/static/panda.svg" />
        <div className="o-media__body">
          <h1>Oh no, something went wrong.</h1>
          <h2>We weren't able to process your request.</h2>
          {details}
        </div>
      </div>
    )
  }

  toggleDetails () {
    this.setState(prevState => ({
      detailsShown: !prevState.detailsShown
    }))
  }
}

export default StaticPageError
