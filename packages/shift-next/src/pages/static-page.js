// Libraries
import React, { Component, Fragment } from 'react'
import Router from 'next/router'

// Lib
import renderComponents from '../lib/render-components'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'
import setSurrogateKeys from '../lib/set-surrogate-keys'
import ApiClient from '../lib/api-client'
import Config from '../lib/config'

// Components
import StaticPageError from '@shiftcommerce/shift-react-components/src/components/static-page/error'
import { Loading } from '@shiftcommerce/shift-react-components/src/objects/loading'

class StaticPage extends Component {
  static async getInitialProps ({ query: { id }, req, res, reduxStore }) {
    const page = await StaticPage.fetchPage(id, reduxStore.dispatch, req, res)
    const isServer = !!req
    const { published } = page
    const preview = req && req.query && req.query.preview ? true : false

    // Unpublished pages should return a 404 page to the public however we should
    // be able to preview unpublished pages using a ?preview=true query string
    if (published === false && preview === false) {
      if (isServer) {
        // server-side
        res.redirect('/error')
      } else {
        // client-side
        Router.push('/error')
      }
    }

    return { id, page, isServer }
  }

  constructor (props) {
    super(props)

    this.Head = Config.get().Head
  }

  /**
   * Request the page from the API
   * @param  {Number} id
   * @param  {Function} dispatch
   * @return {Object} API response or error
   */
  static async fetchPage (id, dispatch, req, res) {
    try {
      const request = StaticPage.pageRequest(id)
      const options = {}
      if (req && res) {
        options.postRequestHook = (response) => {
          return setSurrogateKeys(response.headers, req, res)
        }
      }
      const response = await new ApiClient(options).read(request.endpoint, request.query, dispatch)

      return response.data
    } catch (error) {
      return { error }
    }
  }

  /**
   * Generate the page request object. This method can be overridden when
   * StaticPage is imported, if the query needs to be altered. For example:
   * StaticPage.pageRequest = (pageId) => { ... }
   * @param  {Number} pageId
   * @return {Object}
   */
  static pageRequest (pageId) {
    return {
      endpoint: `/getStaticPage/${pageId}`,
      query: {
        include: 'template,meta.*'
      }
    }
  }

  renderPageHead (canonicalPath, title) {
    const homepage = title === 'Homepage'

    return (
      <this.Head>
        { homepage ? <title>{ Config.get().storeName }</title> : <title>{ suffixWithStoreName(title) }</title> }
        { Config.get().storeUrl ? <link rel='canonical' href={`${Config.get().storeUrl}${canonicalPath}`} /> : null }
      </this.Head>
    )
  }

  /**
   * Render the static page when loaded. This method is seperate to the main
   * render method so it can be overridden, without overriding the loading and
   * error parts of the render method
   * @return {String} - HTML markup for the component
   */
  renderLoaded () {
    const { page } = this.props

    if (page.template.sections) {
      const { components } = page.template.sections.slice(-1).pop()

      if (components) {
        return renderComponents(components)
      }
    }

    return null
  }

  render () {
    const { page: { canonical_path, error, title }, loading, isServer } = this.props

    if (loading && !isServer) {
      return (
        <Loading />
      )
    } else if (error) {
      const errorDetails = {
        Endpoint: JSON.stringify(error.request.endpoint),
        Query: JSON.stringify(error.request.query),
        'Response data': JSON.stringify(error.data)
      }

      return (
        <StaticPageError
          errorDetails={errorDetails}
          isProduction={process.env.NODE_ENV === 'production'}
        />
      )
    } else {
      return (
        <Fragment>
          { this.renderPageHead(canonical_path, title) }
          { this.renderLoaded() }
        </Fragment>
      )
    }
  }
}

export default StaticPage
