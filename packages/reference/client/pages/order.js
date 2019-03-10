//  Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, OrderPage } from 'shift-next'

const mapStateToProps = (state) => {
  const { order } = state
  return { order }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(OrderPage), OrderPage)
