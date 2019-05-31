// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import CategoryPage from '@shiftcommerce/shift-next/src/pages/category'

export default algoliaReduxWrapper(connect()(CategoryPage), CategoryPage)
