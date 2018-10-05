import trimObject from '../../../client/lib/trimObject'

describe('trimObject', () => {
  test('it trims an object', () => {
    // Arrange
    const payload = {
      name: 'James',
      age: null,
      gender: ''
    }

    const expectedPayload = {
      name: 'James'
    }

    // Act
    const parsedPayload = trimObject(payload)

    // Assert
    expect(parsedPayload).toMatchObject(expectedPayload)
  })

  test('it trims objects in an array', () => {
    // Arrange
    const payload = [{
      name: 'James',
      age: null,
      gender: ''
    }]

    const expectedPayload = [{
      name: 'James'
    }]

    // Act
    const parsedPayload = trimObject(payload)

    // Assert
    expect(parsedPayload).toMatchObject(expectedPayload)
  })
})
