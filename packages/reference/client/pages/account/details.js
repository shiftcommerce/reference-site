// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, AccountDetailsPage, MyAccountLayout } from '@shiftcommerce/shift-next'

// Config
import menu from '../../config/myaccount-menu.js'

const layout = {
  component: MyAccountLayout,
  props: { menu }
}

function mapStateToProps ({ account }) { return { account, layout } }

export default algoliaReduxWrapper(connect(mapStateToProps)(AccountDetailsPage), AccountDetailsPage)
