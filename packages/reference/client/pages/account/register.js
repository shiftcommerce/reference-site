// Libraries
import { connect } from 'react-redux'

// Libs
import { algoliaReduxWrapper } from '../../lib/algolia-redux-wrapper'

// Pages
import { RegisterPage } from 'shift-next'

function mapStateToProps ({ registration, account }) {
  return { registration, account }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(RegisterPage), RegisterPage)
