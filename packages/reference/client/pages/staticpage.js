// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { readPage } from '../actions/pageActions'

// Components
import ComponentManifest from '../components/template_components/templateComponentsManifest'
import Loading from '../components/Loading'

class Page extends Component {
  static async getInitialProps ({ reduxStore, req, query }) {
    const { id } = query
    await reduxStore.dispatch(readPage(id))
    return {id: id}
  }

  renderComponents (components) {
    let html = []

    for (var index = 0; index < components.length; index++) {
      let component = components[index]
      let ComponentName = ComponentManifest[component.reference]
      if (ComponentName) {
        html.push(<ComponentName key={index} componentData={component} />)
      }
    }

    return html
  }

  render () {
    const { page: { loading, error, template } } = this.props

    if (loading) {
      return (
        <Loading />
      )
    } else if (error) {
      return (
        <StaticPageError error={error} />
      )
    } else {
      const { components } = template.sections.slice(-1).pop()

      return (
        <div className='c-page'>
          {this.renderComponents(components)}
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  const { page } = state

  return { page }
}

export default connect(mapStateToProps)(Page)
