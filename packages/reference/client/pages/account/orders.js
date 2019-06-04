// Libraries
import { connect } from 'react-redux'

// Pages etc
import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import { AccountOrdersPage } from '@shiftcommerce/shift-next/src/pages/account/orders'
import { MyAccountLayout } from '@shiftcommerce/shift-next/src/layouts/my-account'

// Config
import menu from '../../config/myaccount-menu.js'

const layout = {
  component: MyAccountLayout,
  props: { menu }
}

function mapStateToProps ({ orders }) { return { orders, layout } }

export default algoliaReduxWrapper(connect(mapStateToProps)(AccountOrdersPage), AccountOrdersPage)
