import { Component } from 'react'

export function withValidationMessage () {
  return (WrappedComponent) => {
    return class extends Component {
      constructor (props) {
        super(props)

        this.renderValidationMessage = this.renderValidationMessage.bind(this)
      }
      renderValidationMessage () {
        let validationMessage = this.props.validationMessage

        return (
          validationMessage ? <div className='o-form__input-field__error'>{ validationMessage }</div> : null
        )
      }

      render () {
        return (
          <WrappedComponent
            {...this.props}
            renderValidationMessage={this.renderValidationMessage}
          />
        )
      }
    }
  }
}