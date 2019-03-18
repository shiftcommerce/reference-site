// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, MyAccountPage } from '@shiftcommerce/shift-next'

function mapStateToProps ({ orders }) {
  return { orders }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(MyAccountPage), MyAccountPage)
