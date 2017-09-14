// Libraries
import { combineReducers } from 'redux'

// Reducers
import setCart from './setCart'
import setCategory from '../reducers/setCategory'
import setProcessingState from './setProcessingState'
import setProduct from './setProduct'
import setSearchState from '../reducers/setSearchState'

const rootReducer = combineReducers({
  cart: setCart,
  category: setCategory,
  process: setProcessingState,
  product: setProduct,
  search: setSearchState
})

export default rootReducer
