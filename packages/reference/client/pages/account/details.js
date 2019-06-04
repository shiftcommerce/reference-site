// Libraries
import { connect } from 'react-redux'

// Pages etc
import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import { AccountDetailsPage } from '@shiftcommerce/shift-next/src/pages/account/details'
import { MyAccountLayout } from '@shiftcommerce/shift-next/src/layouts/my-account'

// Config
import menu from '../../config/myaccount-menu.js'

const layout = {
  component: MyAccountLayout,
  props: { menu }
}

function mapStateToProps ({ account }) { return { account, layout } }

export default algoliaReduxWrapper(connect(mapStateToProps)(AccountDetailsPage), AccountDetailsPage)
