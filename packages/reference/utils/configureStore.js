import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

// // Reducers
import rootReducer from '../reducers/rootReducer'

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
*/

export const makeStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(
      thunkMiddleware
    ))
   )

  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      console.log('Replacing reducer')
      store.replaceReducer(require('../reducers/rootReducer').default)
    })
  }

  return store
}
