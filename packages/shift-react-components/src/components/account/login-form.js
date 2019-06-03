// Libraries
import React, { Component } from 'react'
import classNames from 'classnames'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'

// lib
import { Button } from '../../objects/button'
import Checkbox from '../../objects/checkbox'
import { FormErrors } from '../../lib/form-errors'

export class LoginForm extends Component {
  renderEmailInputField () {
    const { emailInputLabel, emailPlaceholder } = this.props.formTranslations

    return (
      <div className='o-flex o-flex__space-between'>
        <div className='o-flex-full-width-s'>
          <label htmlFor='login-email' className='o-form__label'><b>{ emailInputLabel }</b></label>
          <Field
            autoComplete='username'
            className='o-form__input-field o-form__input-block'
            id='login-email'
            name='email'
            placeholder={emailPlaceholder}
            type='email'
          />
          <div className='o-form__input-field__error'>
            <ErrorMessage name='email' />
          </div>
        </div>
      </div>
    )
  }

  renderPasswordInputField () {
    const { passwordInputLabel, passwordPlaceholder } = this.props.formTranslations

    return (
      <div className='o-flex o-flex__space-between'>
        <div className='o-flex-full-width-s'>
          <label htmlFor='login-password' className='o-form__label'><b>{ passwordInputLabel }</b></label>
          <Field
            autoComplete='current-password'
            className='o-form__input-field o-form__input-block'
            id='login-password'
            name='password'
            placeholder={passwordPlaceholder}
            type='password'
          />
          <div className='o-form__input-field__error'>
            <ErrorMessage name='password' />
          </div>
        </div>
      </div>
    )
  }

  renderSubmitButton (props) {
    const { loginButtonText } = this.props.formTranslations

    return (
      <Button
        className='c-login__button o-button--sml'
        aria-label='Continue Securely'
        label={ loginButtonText }
        status={(props.isValid ? 'positive' : 'disabled')}
        type='submit'
        disabled={!props.isValid}
      />
    )
  }

  renderFormik (initialValues, loginSchema, handleSubmit, login) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
        render={props => (
          <Form className='c-login__form'>
            <FormErrors errors={login.errors} />
            { this.renderEmailInputField() }
            { this.renderPasswordInputField() }
            <div>
              <Checkbox label='Remember me' />
              { this.renderSubmitButton(props) }
            </div>
          </Form>
        )}
      />
    )
  }

  render () {
    const {
      className,
      handleSubmit,
      login,
      formTranslations
    } = this.props

    const initialValues = {
      email: '',
      password: ''
    }

    const loginSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
    })

    return (
      <div className ='c-login'>
        <h1 className='c-login__title'>{ formTranslations.title }</h1>
        <p className='c-login__caption'>{ formTranslations.caption }</p>
        <div className={classNames('o-form', className)}>
          { this.renderFormik(initialValues, loginSchema, handleSubmit, login) }
        </div>
        <a href='/account/forgotpassword' className='c-login__anchor'>Reset Password?</a>
        <p className='c-login__caption'>Don't have an account?</p>
        <Link href='/account/register'>
          <a className='c-login__register-button'>{ formTranslations.registerButtonText }</a>
        </Link>
      </div>
    )
  }
}
