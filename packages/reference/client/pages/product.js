// Libraries
import { connect } from 'react-redux'

// Lib
import { algoliaReduxWrapper } from '../lib/algolia-redux-wrapper'

// Pages
import { ProductPage } from 'shift-next'

function mapStateToProps ({ menu, product, cart }) {
  return { menu, product, cart }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(ProductPage), ProductPage)
