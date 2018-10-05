// Libraries
import { combineReducers } from 'redux'

// Reducers
import setCart from './setCart'
import setCategory from './setCategory'
import setCheckout from './setCheckout'
import setAccount from './setAccount'
import setLogin from './setLogin'
import setMenu from './setMenu'
import setOrder from './setOrder'
import setPage from './setPage'
import setProduct from './setProduct'
import setSearchState from './setSearchState'
import setSlug from './setSlug'

const rootReducer = combineReducers({
  cart: setCart,
  category: setCategory,
  checkout: setCheckout,
  account: setAccount,
  login: setLogin,
  menu: setMenu,
  order: setOrder,
  page: setPage,
  product: setProduct,
  search: setSearchState,
  slug: setSlug
})

export default rootReducer
