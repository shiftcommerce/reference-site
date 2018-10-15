// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Objects
import Button from '../../objects/button'
import Input from '../../objects/input'

export class ForgotPassword extends Component {
  renderFormSubmitButton () {
    return (
      <div className='o-form__input-group'>
        <Button
          className='c-password__button-icon'
          aria-label='Submit'
          label='SUBMIT'
          size='lrg'
          status='primary'
          type='submit'
        />
      </div>
    )
  }

  render () {
    return (
      <div className='c-password'>
        <h1 className='c-password__title'>Forgot Password</h1>
        <p className='c-password__caption'>Please enter your email address and submit. In doing this an email containing a special link will be mailed to you. Once received, click on this link and you will then have the opportunity to enter a new password.</p>
        <Input
          label='Email:'
          className='o-form__input-block'
          name='email'
        />
        <div className='c-password__button'>
          <Link href={'/account/login'}>
            { this.renderFormSubmitButton() }
          </Link>
        </div>
      </div>
    )
  }
}

export default ForgotPassword
