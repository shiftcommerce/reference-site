// Libraries
import { connect } from 'react-redux'

// Libs
import { algoliaReduxWrapper } from '../../lib/algolia-redux-wrapper'

// Pages
import { RegisterPage } from 'shift-next'

function mapStateToProps ({ registration, account: { loggedIn } }) {
  return { registration, loggedIn }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(RegisterPage), RegisterPage)
