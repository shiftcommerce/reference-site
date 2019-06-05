// Libraries
import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'

// Components
import { Button } from '../../objects/button'
import Checkbox from '../../objects/checkbox'
import { FormErrors } from '../../lib/form-errors'

// Assets
import IconClose from '../../static/icon-close.svg'

export class LoginForm extends Component {
  /**
  * We only want to render a 'close' icon on pages where the form is displayed
  * in a modal. We can pass a closeButton attribute to the login form at the
  * page level.
  * @return {String} - HTML markup for the component
  */
  renderCloseButton () {
    const { onClick, closeButton } = this.props

    if (closeButton) {
      return (
        <button className='c-login__close' onClick={onClick}>
          <span className='u-visually-hidden'>Close</span>
          <img src={IconClose} />
        </button>
      )
    } else return null
  }

  renderEmailInputField () {
    const { emailInputLabel, emailPlaceholder } = this.props.formOptions

    return (
      <div className='o-flex o-flex__space-between'>
        <div className='o-flex-full-width-s'>
          { emailInputLabel.visible ? <label htmlFor='login-email' className='o-form__label'><b>{ emailInputLabel.translation || 'email' }</b></label> : null }
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
    const { passwordInputLabel, passwordPlaceholder } = this.props.formOptions

    return (
      <div className='o-flex o-flex__space-between'>
        <div className='o-flex-full-width-s'>
          { passwordInputLabel.visible ? <label htmlFor='login-password' className='o-form__label'><b>{ passwordInputLabel.translation || 'password' }</b></label> : null }
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

  renderSubmitButton (formProps, pageProps) {
    const { formOptions, submitButtonClassName } = pageProps
    const loginButtonText = formOptions.loginButton.translation || 'Login'

    return (
      <Button
        className={ submitButtonClassName }
        aria-label={ loginButtonText }
        label={ loginButtonText }
        status={(formProps.isValid ? 'positive' : 'disabled')}
        type='submit'
        disabled={!formProps.isValid}
      />
    )
  }

  renderFormik (initialValues, loginSchema, handleSubmit, login) {
    let formFooter

    if (this.props.formFooter) {
      formFooter = this.props.formFooter
    } else {
      formFooter = this.defaultFormFooter
    }

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
        render={formProps => (
          <Form className='c-login__form'>
            <FormErrors errors={login.errors} />
            { this.renderEmailInputField() }
            { this.renderPasswordInputField() }
            { formFooter(formProps, this.props, this.renderSubmitButton) }
          </Form>
        )}
      />
    )
  }

  defaultFormFooter (formProps, pageProps, submitButton) {
    const { formOptions } = pageProps

    return (
      <Fragment>
        <Checkbox label='Remember me' />
        { submitButton(formProps, pageProps) }
        { formOptions.resetPasswordLink.visible ? <a href='/account/forgotpassword' className='c-login__anchor'>{ formOptions.resetPasswordLink.translation || 'Reset Password?' }</a> : null }
        { formOptions.caption2.visible ? <p className='c-login__caption'>{ formOptions.caption2.translation }</p> : null }
        <Link href='/account/register'>
          { formOptions.registerButton.visible ? <a className='c-login__register-button'>{ formOptions.registerButton.translation || 'Register' }</a> : null }
        </Link>
      </Fragment>
    )
  }

  render () {
    const {
      className,
      handleSubmit,
      login,
      formOptions
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
      <div className='c-login'>
        <div className='c-login__headings'>
          { formOptions.title.visible ? <h1 className='c-login__title'>{ formOptions.title.translation || 'Login' }</h1> : null }
          { this.renderCloseButton() }
        </div>
        { formOptions.caption.visible ? <p className='c-login__caption'>{ formOptions.caption.translation }</p> : null }
        <div className={classNames('o-form', className)}>
          { this.renderFormik(initialValues, loginSchema, handleSubmit, login) }
        </div>
      </div>
    )
  }
}
