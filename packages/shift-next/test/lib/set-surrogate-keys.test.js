// Libs
import setSurrogateKeys from '../../src/lib/set-surrogate-keys'

describe('#setSurrogateKeys()', () => {
  test('sets the surrogate keys to the response when there are no keys on the response', () => {
    // Arrange
    const responseHeaders = {
      'surrogate-key': 'responseSurrogateKey1 responseSurrogateKey2 responseSurrogateKey3',
      'surrogate-control': 'responseSurrogateControl'
    }
    let headers = {
      'surrogate-key': ''
    }
    const res = {
      get: (key) => {
        return headers[key]
      },
      set: (key, value) => {
        return headers[key] = value
      }
    }
    const req = { server: true }

    // Act
    setSurrogateKeys(responseHeaders, req, res)

    // Assert
    expect(headers['surrogate-key']).toEqual(responseHeaders['surrogate-key'])
    expect(headers['surrogate-control']).toEqual(responseHeaders['surrogate-control'])
  })

  test('appends the surrogate keys to the response when there are keys on the response', () => {
     // Arrange
     const responseHeaders = {
      'surrogate-key': 'responseSurrogateKey1 responseSurrogateKey2',
      'surrogate-control': 'testSurrogateControl'
    }
    let headers = {
      'surrogate-key': 'existingKey1 existingKey2',
      'surrogate-control': 'existingSurrogateControl'
    }
    const res = {
      get: (key) => {
        return headers[key]
      },
      set: (key, value) => {
        return headers[key] = value
      }
    }
    const req = { server: true }

    // Act
    setSurrogateKeys(responseHeaders, req, res)

    // Assert
    expect(headers['surrogate-key']).toContain('responseSurrogateKey1')
    expect(headers['surrogate-key']).toContain('responseSurrogateKey2')
    expect(headers['surrogate-key']).toContain('existingKey1')
    expect(headers['surrogate-key']).toContain('existingKey2')
    expect(headers['surrogate-control']).toEqual('existingSurrogateControl')
  })
})
