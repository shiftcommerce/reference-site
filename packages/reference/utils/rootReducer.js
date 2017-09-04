import { combineReducers } from 'redux'

import setCart from '../reducers/setCart'

const rootReducer = combineReducers({
  cart: setCart
})

export default rootReducer
