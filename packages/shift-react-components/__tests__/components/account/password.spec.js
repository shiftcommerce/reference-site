// Libraries
import React from 'react'
import { Formik, Field } from 'formik'

// Component
import { AccountPassword } from '../../../src/components/account/password'
import { Button } from '../../../src/objects/button'

test('renders the form', () => {
  const wrapper = mount(<AccountPassword />)

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find(Formik)).toExist()
  expect(wrapper.find(Field).length).toEqual(3)
  expect(wrapper.find(Button)).toExist()
})
