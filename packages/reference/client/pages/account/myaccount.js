// Libraries
import { connect } from 'react-redux'

// Pages
import { MyAccountPage } from 'shift-next'

// Libs
import { algoliaReduxWrapper } from '../../lib/algolia-redux-wrapper'

function mapStateToProps ({ orders }) {
  return { orders }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(MyAccountPage), MyAccountPage)
