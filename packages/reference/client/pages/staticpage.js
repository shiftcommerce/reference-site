// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'

// Requests
import { pageRequest } from '../requests/page-request'

// Lib
import renderComponents from '../lib/render-components'
import { algoliaReduxWrapper } from '../lib/algolia-redux-wrapper'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'
import ApiClient from '../lib/api-client'
import JsonApiParser from '../lib/json-api-parser'

// Components
import { Loading } from 'shift-react-components'
import StaticPageError from '../components/static-page-error'

const fetchPage = async (id) => {
  try {
    const request = pageRequest(id)
    const response = await new ApiClient().read(request.endpoint, request.query)
    return new JsonApiParser().parse(response.data)
  } catch (error) {
    return { error }
  }
}

class Page extends Component {
  static async getInitialProps ({ query: { id }, req }) {
    if (req) { // server-side
      const page = await fetchPage(id)
      return { id, page }
    } else { // client side
      return { id }
    }
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps (newProps, prevState) {
    if (prevState.currentId !== newProps.id) {
      return { currentId: newProps.id, loading: true }
    }
    return null
  }

  async componentDidMount () {
    await this.fetchPageIntoState(this.props.id)
  }

  async componentDidUpdate (_, prevState) {
    if (prevState.currentId !== this.state.currentId) {
      await this.fetchPageIntoState(this.props.id)
    }
  }

  async fetchPageIntoState (id) {
    const page = await fetchPage(id)
    this.setState({ loading: false, page })
  }

  renderPageTitle (title) {
    if (title === 'Homepage') {
      return (
        <Head>
          <title>ShopGo</title>
        </Head>
      )
    } else {
      return (
        <Head>
          <title>{ suffixWithStoreName(title) }</title>
        </Head>
      )
    }
  }

  render () {
    const page = this.props.page || (this.state && this.state.page)
    const loading = (this.state && this.state.loading) || !page

    if (loading) {
      return (
        <Loading />
      )
    } else if (page.error) {
      return (
        <StaticPageError error={page.error} />
      )
    } else {
      const { components } = page.template.sections.slice(-1).pop()

      return (
        <>
          { this.renderPageTitle(page.title) }
          { components && renderComponents(components) }
        </>
      )
    }
  }
}

export default algoliaReduxWrapper(connect()(Page), Page)
