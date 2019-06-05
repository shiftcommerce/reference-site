// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import StaticPage from '@shiftcommerce/shift-next/src/pages/static-page'

function mapStateToProps ({ global: { loading } }) {
  return { loading }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(StaticPage), StaticPage)
