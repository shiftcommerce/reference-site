// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import ProductPage from '@shiftcommerce/shift-next/src/pages/product'

function mapStateToProps ({ menu, product, cart }) {
  return { menu, product, cart }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(ProductPage), ProductPage)
