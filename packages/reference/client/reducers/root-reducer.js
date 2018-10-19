// Libraries
import { combineReducers } from 'redux'

// Reducers
import setCart from './set-cart'
import setCategory from './set-category'
import setCheckout from './set-checkout'
import setAccount from './set-account'
import setLogin from './set-login'
import setMenu from './set-menu'
import setOrder from './set-order'
import setOrders from './set-orders'
import setPage from './set-page'
import setProduct from './set-product'
import setSearchState from './set-search-state'
import setSlug from './set-slug'

const rootReducer = combineReducers({
  cart: setCart,
  category: setCategory,
  checkout: setCheckout,
  account: setAccount,
  login: setLogin,
  menu: setMenu,
  order: setOrder,
  orders: setOrders,
  page: setPage,
  product: setProduct,
  search: setSearchState,
  slug: setSlug
})

export default rootReducer
