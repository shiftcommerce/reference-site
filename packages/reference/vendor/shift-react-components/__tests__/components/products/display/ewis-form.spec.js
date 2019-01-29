// Libraries
import React from 'react'

// Components
import { EwisForm } from 'shift-react-components'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <EwisForm />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('input')).toHaveClassName('c-ewis-form__input-field')
  expect(wrapper.find('button')).toIncludeText('Email When in Stock')
})
