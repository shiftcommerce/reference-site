// Libraries
import { connect } from 'react-redux'
import { cartPage } from 'shift-next'

// Lib
import { algoliaReduxWrapper } from '../lib/algolia-redux-wrapper'

function mapStateToProps (state) {
  const { cart } = state
  return { cart }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(cartPage), cartPage)
