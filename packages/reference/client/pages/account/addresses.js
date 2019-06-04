// Libraries
import { connect } from 'react-redux'

// Pages
import { algoliaReduxWrapper, AccountAddressesPage, MyAccountLayout } from '@shiftcommerce/shift-next'

// Config
import menu from '../../config/myaccount-menu.js'

const layout = {
  component: MyAccountLayout,
  props: { menu }
}

function mapStateToProps ({ checkout: { addressBook } }) { return { addressBook, layout } }

export default algoliaReduxWrapper(connect(mapStateToProps)(AccountAddressesPage), AccountAddressesPage)
