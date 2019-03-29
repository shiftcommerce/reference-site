// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, SearchPage } from '@shiftcommerce/shift-next'

const mapStateToProps = ({ search }) => {
  return { search }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(SearchPage), SearchPage)
