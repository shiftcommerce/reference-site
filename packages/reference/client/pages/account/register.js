// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, RegisterPage } from 'shift-next'

function mapStateToProps ({ registration, account: { loggedIn } }) {
  return { registration, loggedIn }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(RegisterPage), RegisterPage)
