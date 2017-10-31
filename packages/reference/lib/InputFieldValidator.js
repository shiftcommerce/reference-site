class InputFieldValidator {
  constructor (name, value, rules = {}) {
    this.name = name
    this.value = value
    this.rules = rules
  }

  validate () {
    let validationMessage = ''
    Object.keys(this.rules).map((rule) => {
      if (validationMessage === '') {
        validationMessage = this[rule](rule)
      }
    })
    return validationMessage
  }

  required (_rule) {
    const present = (this.value.toString().trim().length !== 0)
    return (present ? '' : `${this.formattedFieldName()} is required.`)
  }

  email (_rule) {
    const regex = /.+@.+\..+/i
    const validEmail = (regex.test(this.value))
    return (validEmail ? '' : `${this.value || this.formattedFieldName()} is not a valid.`)
  }

  maxLength (rule) {
    const maxLength = this.rules[rule]
    const validMaxLength = (this.inputValueLength() <= maxLength)
    return (validMaxLength ? '' : `Please enter no more than ${maxLength} characters.`)
  }

  minLength (rule) {
    const minLength = this.rules[rule]
    const validMinLength = (this.inputValueLength() >= minLength)
    return (validMinLength ? '' : `Please enter more than ${minLength} characters.`)
  }

  phone () {
    const regex = /^((\+44\s?|0)7([45789]\d{2}|624)\s?\d{3}\s?\d{3})$/
    const validPhoneNumber = (this.value.match(regex))
    return (validPhoneNumber ? '' : `${this.value} - is not a valid ${this.formattedFieldName()}.`)
  }

  postcode () {
    const regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i
    const validPostcode = (regex.test(this.value))
    return (validPostcode ? '' : `${this.value} - is not a valid ${this.formattedFieldName()}.`)
  }

  formattedFieldName () {
    return this.name.replace(/_/g, ' ')
  }

  inputValueLength () {
    return this.value.toString().trim().length
  }
}

export default InputFieldValidator
