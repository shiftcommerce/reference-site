// Libs
import InputFieldValidator from '../../src/lib/input-field-validator'

describe('InputFieldValidator', () => {
  describe('Optional Field', () => {
    test('no rules provided', () => {
      // Arrange
      const data = { name: 'first_name', value: '' }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })
  })

  describe('Required Field validation', () => {
    test('rules provided', () => {
      // Arrange
      const data = { name: 'first_name', value: '', rules: { required: true } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe(`${data.name.replace(/_/g, ' ')} is required.`)
    })

    test('no rules provided', () => {
      // Arrange
      const data = { name: 'first_name', value: '' }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })
  })

  describe('Email validation', () => {
    test('valid email', () => {
      // Arrange
      const data = { name: 'email', value: 'test@test.com', rules: { email: true } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('invalid email', () => {
      // Arrange
      const data = { name: 'email', value: 'testtest.com', rules: { email: true } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe(`${data.value} is not valid.`)
    })
  })

  describe('Max Length validation', () => {
    test('with valid maxlength', () => {
      // Arrange
      const maxLength = 4
      const data = { name: 'first_name', value: 'Test', rules: { maxLength: maxLength } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('with invalid maxlength', () => {
      // Arrange
      const maxLength = 4
      const data = { name: 'first_name', value: 'Testing', rules: { maxLength: maxLength } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe(`Please enter no more than ${maxLength} characters.`)
    })
  })

  describe('Min Length validation', () => {
    test('with valid minlength', () => {
      // Arrange
      const minLength = 4
      const data = { name: 'first_name', value: 'John', rules: { minLength: minLength } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('with invalid minLength', () => {
      // Arrange
      const minLength = 4
      const data = { name: 'first_name', value: 'Tom', rules: { minLength: minLength } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe(`Please enter more than ${minLength} characters.`)
    })
  })

  describe('Phone validation', () => {
    test('with valid mobile number', () => {
      // Arrange
      const data = { name: 'phone_number', value: '07800000000', rules: { phone: true } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('with valid mobile number that has country code', () => {
      // Arrange
      const data = { name: 'phone_number', value: '+447800000000', rules: { phone: true } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('with valid landline number', () => {
      // Arrange
      const data = { name: 'phone_number', value: '01130000000', rules: { phone: true } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('with valid landline number that has country code', () => {
      // Arrange
      const data = { name: 'phone_number', value: '+441130000000', rules: { phone: true } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('with invalid phone', () => {
      // Arrange
      const data = { name: 'phone_number', value: '07800', rules: { phone: true } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe(`${data.value} - is not a valid ${data.name.replace(/_/g, ' ')}.`)
    })
  })

  describe('Postcode validation', () => {
    let data = { name: 'postcode', rules: { postcode: true } }

    test('with valid postcode - format: AA9A 9AA', () => {
      // Arrange
      data.value = 'EC1A 1BB'

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('with valid postcode - format: A9A 9AA', () => {
      // Arrange
      data.value = 'W1A 0AX'

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('with valid postcode - format: A9 9AA', () => {
      // Arrange
      data.value = 'M1 1AE'

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('with valid postcode - format: A99 9AA', () => {
      // Arrange
      data.value = 'B33 8TH'

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('with valid postcode - format: AA9 9AA', () => {
      // Arrange
      data.value = 'CR2 6XH'

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('with valid postcode - format: AA99 9AA', () => {
      // Arrange
      data.value = 'DN55 1PT'

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe('')
    })

    test('with invalid postcode', () => {
      // Arrange
      data = { name: 'postcode', value: 'ls9', rules: { postcode: true } }

      // Act
      const validationMessage = new InputFieldValidator(data.name, data.value, data.rules).validate()

      // Assert
      expect(validationMessage).toBe(`${data.value} - is not a valid ${data.name.replace(/_/g, ' ')}.`)
    })
  })
})
