import React from 'react'
// Objects
import { DropdownSelect } from 'shift-react-components'

test('renders correctly', () => {
  // Arrange
  const quantityOptions = [ 1, 2, 3, 4, 5 ]

  // Act
  const wrapper = mount(
    <DropdownSelect name='line_item[unit_quantity]' prompt='Select a Quantity' options={quantityOptions} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
