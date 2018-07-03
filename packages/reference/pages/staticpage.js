// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Components
import PageTemplates from '../components/pages'

// Actions
import { readPage } from '../actions/pageActions'

export class Page extends Component {
  static async getInitialProps ({ store, isServer, pathname, query }) {
    await store.dispatch(readPage(query.id))
  }

  render () {
    const { loading } = this.props.page.data
    const page = this.props.page.data

    const { template } = page

    if (loading) {
      return (
        <h1>Loading page...</h1>
      )
    } else {
      const TemplateRenderer = PageTemplates[template.reference]

      return (
        <TemplateRenderer {...page} />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
