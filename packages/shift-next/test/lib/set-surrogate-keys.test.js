// Libs
import setSurrogateKeys from '../../src/lib/set-surrogate-keys'

describe('#setSurrogateKeys()', () => {
  test('sets the surrogate keys to the response when there are no keys on the response', () => {
    // Arrange
    const responseHeaders = {
      'surrogate-key': 'responseSurrogateKey1 responseSurrogateKey2 responseSurrogateKey3',
      'surrogate-control': 'responseSurrogateControl'
    }
    const res = {
      get: jest.fn(() => {}),
      set: jest.fn(() => {})
    }
    const req = { server: true }
    const resGetSpy = jest.spyOn(res, 'get')
    const resSetSpy = jest.spyOn(res, 'set')

    // Act
    setSurrogateKeys(responseHeaders, req, res)

    // Assert
    expect(resGetSpy).toHaveBeenCalledTimes(1)
    expect(resSetSpy).toHaveBeenCalledTimes(2)
  })

  test('appends the surrogate keys to the response when there are keys on the response', () => {
    // Arrange
    const responseHeaders = {
      'surrogate-key': 'responseSurrogateKey1 responseSurrogateKey2 responseSurrogateKey3',
      'surrogate-control': 'responseSurrogateControl'
    }
    const res = {
      get: jest.fn(() => {
        return 'existingKey1 existingKey2'
      }),
      set: jest.fn(() => {})
    }
    const req = { server: true }
    const resGetSpy = jest.spyOn(res, 'get')
    const resSetSpy = jest.spyOn(res, 'set')

    // Act
    setSurrogateKeys(responseHeaders, req, res)

    // Assert
    expect(resGetSpy).toHaveBeenCalledTimes(1)
    expect(resSetSpy).toHaveBeenCalledTimes(1)
  })
})
