// Libraries
import { connect } from 'react-redux'
import { algoliaReduxWrapper, CartPage } from '@shiftcommerce/shift-next'

function mapStateToProps (state) {
  const { cart } = state
  return { cart }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(CartPage), CartPage)
