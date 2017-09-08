// Libraries
import { combineReducers } from 'redux'

// Reducers
import setProcessingState from './setProcessingState'
import setProduct from './setProduct'
import setCart from './setCart'

const rootReducer = combineReducers({
  process: setProcessingState,
  product: setProduct,
  cart: setCart
})

export default rootReducer
