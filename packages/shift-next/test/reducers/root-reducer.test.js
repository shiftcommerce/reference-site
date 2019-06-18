// Libraries
import { createStore } from 'redux'

// Config
import Config from '../../src/lib/config'

describe('Root Reducer', () => {    
  test('it merges custom reducers', () => {
    // Arrange
    const customReducer = jest.fn(() => { return { test: true } })

    Config.set({
      customReducers: { customReducer }
    })

    // require reducer after config setup
    const rootReducer = require('../../src/reducers/root-reducer').default

    // Act
    const store = createStore(rootReducer)
    const state = store.getState()

    // Assert
    // check the customReducer initial state has been set
    expect(state.customReducer).toEqual({
      test: true
    })
  })
})
