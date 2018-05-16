// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'

// Actions
import { readCategories } from '../actions/categoryActions'

// utils
import { configureStore } from '../utils/configureStore'

// Components
import Layout from '../components/Layout'

class Index extends Component {
  static async getInitialProps ({ store }) {
    await store.dispatch(readCategories(store))
  }
  render () {
    return (
      <Layout>
        <div>Welcome To Shift Commerce Front End React</div>
      </Layout>
    )
  }
}

export default withRedux(configureStore)(Index)
