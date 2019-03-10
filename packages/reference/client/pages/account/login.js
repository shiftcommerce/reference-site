// Libraries
import { connect } from 'react-redux'

import { algoliaReduxWrapper, LoginPage } from 'shift-next'

function mapStateToProps ({ login, account: { loggedIn } }) {
  return { login, loggedIn }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(LoginPage), LoginPage)
