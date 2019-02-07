// Libraries
import { connect } from 'react-redux'

import { loginPage } from 'shift-next'

// Libs
import { algoliaReduxWrapper } from '../../lib/algolia-redux-wrapper'

function mapStateToProps (state) {
  const { login } = state

  return { login }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(loginPage), loginPage)
