// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'

// utils
import { configureStore } from '../../utils/configureStore'

// Components
import Layout from '../../components/Layout'

class Index extends Component {
  render () {
    return (
      <Layout>
        <div>Welcome To Shift Commerce Front End React</div>
      </Layout>
    )
  }
}

export default withRedux(configureStore)(Index)
