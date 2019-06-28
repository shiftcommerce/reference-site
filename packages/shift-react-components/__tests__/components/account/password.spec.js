// Libraries
import React from 'react'
import { Formik, Field } from 'formik'

// Component
import { AccountPassword } from '../../../src/components/account/password'
import { Button } from '../../../src/objects/button'

test('renders the form', () => {
  // Arrange
  const formOptions = {
    title: {
      visible: true,
      translation: 'test title'
    },
    oldPasswordPlaceholder: 'placeholder 1',
    newPasswordPlaceholder: 'placeholder 2',
    confirmationPlaceholder: 'placeholder 3'
  }

  // Act
  const wrapper = mount(<AccountPassword formOptions={formOptions} />)

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find(Formik)).toExist()
  expect(wrapper.find(Field).length).toEqual(3)
  expect(wrapper.find(Button)).toExist()
  expect(wrapper.find('h1').at(0)).toHaveText('test title')
})
