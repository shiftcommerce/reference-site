// Libraries
import { connect } from 'react-redux'
import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import CartPage from '@shiftcommerce/shift-next/src/pages/cart'

function mapStateToProps (state) {
  const { cart } = state
  return { cart }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(CartPage), CartPage)
