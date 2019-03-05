//  Libraries
import { connect } from 'react-redux'

// Lib
import { algoliaReduxWrapper } from '../lib/algolia-redux-wrapper'

// Pages
import { OrderPage } from 'shift-next'

const mapStateToProps = (state) => {
  const { order } = state
  return { order }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(OrderPage), OrderPage)
