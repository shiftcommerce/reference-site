// Libraries
import { connect } from 'react-redux'

import menu from '../../config/myaccount-menu.js'

// Pages
import { algoliaReduxWrapper, AccountPasswordPage } from '@shiftcommerce/shift-next'

function mapStateToProps ({ account }) { return { account, menu } }

export default algoliaReduxWrapper(connect(mapStateToProps)(AccountPasswordPage), AccountPasswordPage)
