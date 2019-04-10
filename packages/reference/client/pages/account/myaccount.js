// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, MyAccountPage } from '@shiftcommerce/shift-next'

function mapStateToProps ({ account, checkout: { addressBook }, orders }) {
  return { account, addressBook, orders }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(MyAccountPage), MyAccountPage)
