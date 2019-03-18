// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, CategoryPage } from '@shiftcommerce/shift-next'

export default algoliaReduxWrapper(connect()(CategoryPage), CategoryPage)
