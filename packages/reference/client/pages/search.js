// Libraries
import { connect } from 'react-redux'

// Pages
import { SearchPage } from 'shift-next'

// Lib
import { algoliaReduxWrapper } from '../lib/algolia-redux-wrapper'

export default algoliaReduxWrapper(connect()(SearchPage), SearchPage)
