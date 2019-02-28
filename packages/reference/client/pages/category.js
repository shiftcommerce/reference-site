// Libraries
import { connect } from 'react-redux'

// Lib
import { algoliaReduxWrapper } from '../lib/algolia-redux-wrapper'

// Pages
import { CategoryPage } from 'shift-next'

export default algoliaReduxWrapper(connect()(CategoryPage), CategoryPage)
