// Libraries
import { connect } from 'react-redux'

// Pages
import { StaticPage } from 'shift-next'

// Lib
import { algoliaReduxWrapper } from '../lib/algolia-redux-wrapper'

export default algoliaReduxWrapper(connect()(StaticPage), StaticPage)
