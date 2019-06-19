// Libraries
import { createStore } from 'redux'

// Config
import Config from '../../src/lib/config'

describe('Root Reducer', () => {    
  test('it merges custom reducers', () => {
    // Arrange
    const customReducer1 = jest.fn(() => { return { test: true } })
    const customReducer2 = jest.fn(() => { return { testing: true } })

    Config.set({
      customReducers: { customReducer1, customReducer2 }
    })

    // require reducer after config setup
    const rootReducer = require('../../src/reducers/root-reducer').default

    // Act
    const store = createStore(rootReducer)
    const state = store.getState()

    // Assert
    // check the customReducer initial state has been set
    expect(state.customReducer1).toEqual({ test: true })
    expect(state.customReducer2).toEqual({ testing: true })
  })
})
