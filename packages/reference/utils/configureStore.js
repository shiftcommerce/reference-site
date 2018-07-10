import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

// // Reducers
import rootReducer from '../reducers/rootReducer'

export const initialState = {}

export function initializeStore (initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(
      thunkMiddleware
    ))
  )
}
