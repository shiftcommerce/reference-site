// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'

// Components
import Layout from '../components/Layout'
import PageTemplates from '../components/pages'

// Actions
import { readMenu } from '../actions/menuActions'
import { readPage } from '../actions/pageActions'

// Utils
import { configureStore } from '../utils/configureStore'

export class Page extends Component {
  static async getInitialProps ({ store, query }) {
    await store.dispatch(readMenu(store))
    await store.dispatch(readPage(store, query))
  }

  render () {
    let {
      page
    } = this.props

    const { template } = page

    if (page.loading) {
      return (
        <Layout>
          <h1>Loading page...</h1>
        </Layout>
      )
    } else if (page.error || Object.keys(page).length === 0 || !template) {
      return (
        <Layout>
          <h1>Unable to load page.</h1>
        </Layout>
      )
    } else {
      const TemplateRenderer = PageTemplates[template.reference]

      return (
        <Layout>
          <TemplateRenderer {...page} />
        </Layout>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  page: state.page || {}
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(Page)
