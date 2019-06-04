// Libraries
import { connect } from 'react-redux'

import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import LoginPage from '@shiftcommerce/shift-next/src/pages/login'

function mapStateToProps ({ login, account: { loggedIn } }) {
  return { login, loggedIn }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(LoginPage), LoginPage)
