// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, ProductPage } from 'shift-next'

function mapStateToProps ({ menu, product, cart }) {
  return { menu, product, cart }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(ProductPage), ProductPage)
