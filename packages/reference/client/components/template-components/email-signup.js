import { Component } from 'react'
import classNames from 'classnames'
import t from 'typy'

import Button from '../../objects/button'

class EmailSignup extends Component {
  constructor (props) {
    super(props)
    this.inputElement = null
    this.state = {
      submitted: false,
      errorMessage: null
    }

    // TODO: Rewrite this to use the new simpler refs syntax
    // once we've migrated to Next 7
    this.setInputRef = this.setInputRef.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.fakeSubmit = this.fakeSubmit.bind(this)
  }

  setInputRef (element) {
    this.inputElement = element
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.fakeSubmit()
    }
  }

  fakeSubmit () {
    if (this.inputElement.checkValidity()) {
      // TODO: Implement real email singup functionality
      this.setState({
        submitted: true
      })
    } else {
      this.setState({
        errorMessage: this.inputElement.validationMessage
      })
    }
  }

  signUpForm (componentData) {
    const inputClasses = classNames('c-email-signup__input', { 'c-email-signup__input--invalid': this.state.errorMessage })

    return (
      <div className='o-template-component__inner-wrapper'>
        <h1 className='c-email-signup__title u-hidden-m'>{ componentData.desktop_header }</h1>
        <p className='c-email-signup__cat'>{ componentData.cta_text }</p>
        <div className='c-email-signup__form-wrapper'>
          <input className={ inputClasses } ref={ this.setInputRef }
            type='email' placeholder={ componentData.placeholder_text }
            onKeyPress={ this.handleKeyPress } required
          />
          <Button
            className='c-email-signup__button' status='primary'
            size='sml' label={ componentData.button_text }
            hoverStyles={{ border: 'none' }} onClick={ this.fakeSubmit }
          />
        </div>
        { this.state.errorMessage && <p className='c-email-signup__error-message'>{ this.state.errorMessage }</p> }
      </div>
    )
  }

  confirmationMessage (componentData) {
    return (
      <p className='c-email-signup__cat'>{ componentData.confirmation_text }</p>
    )
  }

  render () {
    const { componentData } = this.props
    const backgroundURL = t(componentData, 'background_image[0].canonical_path').safeObject
    const backgroundStyles = {
      backgroundColor: componentData.background_colour,
      backgroundImage: backgroundURL ? `url(${backgroundURL})` : undefined
    }
    Object.entries(backgroundStyles).forEach(([key, val]) => {
      if (!val) delete backgroundStyles[key]
    })

    return (
      <section className='o-template-component o-template-component--full-width c-email-signup u-center-align' style={backgroundStyles}>
        { this.state.submitted ? this.confirmationMessage(componentData) : this.signUpForm(componentData) }
      </section>
    )
  }
}

export default EmailSignup
