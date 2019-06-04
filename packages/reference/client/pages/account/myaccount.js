// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import MyAccountPage from '@shiftcommerce/shift-next/src/pages/my-account'

function mapStateToProps ({ account, checkout: { addressBook }, orders }) {
  return { account, addressBook, orders }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(MyAccountPage), MyAccountPage)
