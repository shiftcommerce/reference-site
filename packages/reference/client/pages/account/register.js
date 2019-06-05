// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import RegisterPage from '@shiftcommerce/shift-next/src/pages/register'

function mapStateToProps ({ registration, account: { loggedIn } }) {
  return { registration, loggedIn }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(RegisterPage), RegisterPage)
