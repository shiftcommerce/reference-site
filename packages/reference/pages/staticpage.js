// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../components/Loading'
import PageTemplates from '../components/pages'

// Actions
import { readPage } from '../actions/pageActions'

class Page extends Component {
  static async getInitialProps ({ reduxStore, req, query }) {
    const { id } = query
    const isServer = !!req
    if (isServer) {
      await reduxStore.dispatch(readPage(id))
    }
    return {id: id}
  }

  componentDidMount () {
    const { dispatch, id } = this.props
    dispatch(readPage(id))
  }

  render () {
    const { page, page: { loading, template } } = this.props

    if (loading) {
      return (
        <Loading />
      )
    } else {
      const TemplateRenderer = PageTemplates[template.reference]

      return (
        <TemplateRenderer {...page} />
      )
    }
  }
}

function mapStateToProps (state) {
  const { page } = state

  return { page }
}

export default connect(mapStateToProps)(Page)
