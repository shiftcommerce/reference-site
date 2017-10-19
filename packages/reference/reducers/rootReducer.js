// Libraries
import { combineReducers } from 'redux'

// Reducers
import setCart from './setCart'
import setCategory from './setCategory'
import setCategories from './setCategories'
import setProduct from './setProduct'
import setSearchState from './setSearchState'
import setCheckout from './setCheckout'
import setOrder from './setOrder'

const rootReducer = combineReducers({
  cart: setCart,
  category: setCategory,
  categories: setCategories,
  product: setProduct,
  search: setSearchState,
  checkout: setCheckout,
  order: setOrder
})

export default rootReducer
