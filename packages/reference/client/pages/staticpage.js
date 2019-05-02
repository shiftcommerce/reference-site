// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, StaticPage } from '@shiftcommerce/shift-next'

function mapStateToProps ({ global: { loading } }) {
  return { loading }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(StaticPage), StaticPage)
