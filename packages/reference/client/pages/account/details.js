// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, AccountDetailsPage } from '@shiftcommerce/shift-next'

// Config
import menu from '../../config/myaccount-menu.js'

function mapStateToProps ({ account }) { return { account, menu } }

export default algoliaReduxWrapper(connect(mapStateToProps)(AccountDetailsPage), AccountDetailsPage)
