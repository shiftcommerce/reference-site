import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

// Reducers
import rootReducers from '../reducers/root-reducer'

import Config from './config'

export const initialState = {}

function fetchReducers() {
  const combined = { ...rootReducers, ...Config.get().customReducers || {}}

  return combineReducers(combined)
}

export function initializeStore (initialState) {
  return createStore(
    fetchReducers(),
    initialState,
    composeWithDevTools(applyMiddleware(
      thunkMiddleware
    ))
  )
}
