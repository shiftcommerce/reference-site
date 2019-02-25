// Libraries
import { connect } from 'react-redux'

import { LoginPage } from 'shift-next'

// Libs
import { algoliaReduxWrapper } from '../../lib/algolia-redux-wrapper'

function mapStateToProps ({ login, account: { loggedIn } }) {
  return { login, loggedIn }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(LoginPage), LoginPage)
