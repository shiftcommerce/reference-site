// Libraries
import { connect } from 'react-redux'

import { algoliaReduxWrapper, PasswordResetPage } from '@shiftcommerce/shift-next'

function mapStateToProps ({ account }) {
  return { account }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(PasswordResetPage), PasswordResetPage)
