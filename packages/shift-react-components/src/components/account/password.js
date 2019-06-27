// Libraries
import React, { Component, Fragment } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

// Lib
import { Button } from '../../objects/button'
import { Flash } from '../../objects/flash'

export class AccountPassword extends Component {
  renderFlash (status) {
    switch (status) {
      case 'success':
        return (<Flash modifier='success' text='Your Password was successfully updated.' />)
      case 'error':
        return (<Flash modifier='error' text='Oops, there was an error updating your password.' />)
    }
  }

  renderFormik (validationSchema, handleSubmit) {
    return (
      <Formik
        enableReinitialize
        initialValues={{
          oldPassword: '',
          newPassword: '',
          newPasswordConfirmation: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        render={({ isSubmitting, isValid, status }) => {
          const submitEnabled = isValid & !isSubmitting
          return (
            <Fragment>
              { this.renderFlash(status) }
              <Form className='c-account-password__form'>
                <div className='c-account-password__old-input'>
                  <label className='o-form__input-label' htmlFor="oldPassword">Old Password</label>
                  <Field type='password' name='oldPassword' className='o-form__input-field o-form__input-block' />
                </div>

                <div className='c-account-password__new-inputs-group'>
                  <div className='c-account-password__new-inputs'>
                    <label className='o-form__input-label' htmlFor="newPassword">New Password</label>
                    <Field type='password' name='newPassword' className='o-form__input-field o-form__input-block' />
                    <div className='o-form__input-field__error'>
                      <ErrorMessage name='newPassword' />
                    </div>
                  </div>
                  <div className='c-account-password__new-inputs'>
                    <label className='o-form__input-label' htmlFor="newPasswordConfirmation">Confirm New Password</label>
                    <Field type='password' name='newPasswordConfirmation' className='o-form__input-field o-form__input-block' />
                    <div className='o-form__input-field__error'>
                      <ErrorMessage name='newPasswordConfirmation' />
                    </div>
                  </div>
                </div>

                <Button
                  className='c-password__button o-button-sml u-margin-top-none u-margin-bottom-none'
                  aria-label='Update password'
                  label='Update password'
                  status='primary'
                  type='submit'
                  disabled={!submitEnabled}
                  status={submitEnabled ? 'positive' : 'disabled'}
                />
              </Form>
            </Fragment>
          )
        }}
      />
    )
  }

  render () {
    const {
      handleSubmit,
      formOptions
    } = this.props

    const validationSchema = Yup.object().shape({
      newPassword: Yup.string()
        .min(10, 'Password must be at least 10 characters')
        .max(30, 'Password must be shorter than 30 characters')
        .required('Required'),
      newPasswordConfirmation: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('newPassword'), null], 'Must match')
    })

    return (
      <div className='c-account-password'>
        { formOptions.title.visible ? <h1 className='c-account-password__title'>{ formOptions.title.translation || 'Password' }</h1> : null }
        { this.renderFormik(validationSchema, handleSubmit) }
      </div>
    )
  }
}
