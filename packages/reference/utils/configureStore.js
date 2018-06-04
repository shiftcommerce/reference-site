// Libraries
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

// Reducers
import rootReducer from '../reducers/rootReducer'

export const configureStore = (preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(
      thunkMiddleware
    ))
  )
}
