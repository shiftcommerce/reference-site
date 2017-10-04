// Libraries
import { combineReducers } from 'redux'

// Reducers
import setCart from './setCart'
import setCategory from './setCategory'
import setCategories from './setCategories'
import setProcessingState from './setProcessingState'
import setProduct from './setProduct'
import setSearchState from './setSearchState'
import setCheckout from './setCheckout'

const rootReducer = combineReducers({
  cart: setCart,
  category: setCategory,
  categories: setCategories,
  process: setProcessingState,
  product: setProduct,
  search: setSearchState,
  checkout: setCheckout
})

export default rootReducer
