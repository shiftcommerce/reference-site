// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import SearchPage from '@shiftcommerce/shift-next/src/pages/search'

const mapStateToProps = ({ search }) => {
  return { search }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(SearchPage), SearchPage)
