// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, AccountOrdersPage, MyAccountLayout } from '@shiftcommerce/shift-next'

// Config
import menu from '../../config/myaccount-menu.js'

const layout = {
  component: MyAccountLayout,
  props: { menu }
}

function mapStateToProps ({ orders }) { return { orders, layout } }

export default algoliaReduxWrapper(connect(mapStateToProps)(AccountOrdersPage), AccountOrdersPage)
