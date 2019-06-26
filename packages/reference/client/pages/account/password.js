// Libraries
import { connect } from 'react-redux'

// Pages etc
import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import { AccountPasswordPage } from '@shiftcommerce/shift-next/src/pages/account/password'
import { MyAccountLayout } from '@shiftcommerce/shift-next/src/layouts/my-account'
// Config
import menu from '../../config/myaccount-menu.js'

const layout = {
  component: MyAccountLayout,
  props: { menu }
}

function mapStateToProps ({ account, login }) { return { account, layout, login } }

export default algoliaReduxWrapper(connect(mapStateToProps)(AccountPasswordPage), AccountPasswordPage)
