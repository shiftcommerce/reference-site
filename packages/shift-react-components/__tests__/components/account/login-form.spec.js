// Libraries
import React from 'react'

// Component
import { LoginForm } from '../../../src/components/account/login-form'

describe('LoginForm', () => {
  test('should render the form', () => {
    // Mock store
    const login = {
      errors: []
    }

    const formOptions = {
      title: {
        visible: true,
        translation: 'Login'
      },
      loginButton: {
        visible: true,
        translation: 'CONTINUE SECURELY'
      },
      caption: {
        visible: true,
        translation: 'Please enter your details below'
      },
      caption2: {
        visible: true,
        translation: "don't have an account?"
      },
      registerButton: {
        visible: true,
        translation: 'create new account'
      },
      emailInputLabel: {
        visible: true,
        translation: 'Email *'
      },
      emailPlaceholder: 'Email',
      passwordInputLabel: {
        visible: true,
        translation: 'Password *'
      },
      passwordPlaceholder: 'Password',
      resetPasswordLink: {
        visible: true,
        translation: 'Reset Password?'
      }
    }

    const dispatch = jest.fn()

    const wrapper = mount(<LoginForm login={login} formOptions={formOptions} dispatch={dispatch} />)

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText('Email *')
    expect(wrapper).toIncludeText('Password *')
    expect(wrapper).toIncludeText('Remember me')
    expect(wrapper).toIncludeText('CONTINUE SECURELY')
  })
})
