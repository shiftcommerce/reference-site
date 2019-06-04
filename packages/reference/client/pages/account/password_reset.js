// Libraries
import { connect } from 'react-redux'

import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import PasswordResetPage from '@shiftcommerce/shift-next/src/pages/password_reset'

function mapStateToProps ({ account }) {
  return { account }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(PasswordResetPage), PasswordResetPage)
