// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, SearchPage } from 'shift-next'

export default algoliaReduxWrapper(connect()(SearchPage), SearchPage)
