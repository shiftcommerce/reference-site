//  Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import OrderPage from '@shiftcommerce/shift-next/src/pages/order'

const mapStateToProps = (state) => {
  const { order } = state
  return { order }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(OrderPage), OrderPage)
