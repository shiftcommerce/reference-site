// Libraries
import React from 'react'

// Objects
import { LazyLoad } from 'shift-react-components'

test('renders a placeholder when image is loading', () => {
  // act
  const wrapper = mount(
    <LazyLoad height='35px' width='125px' src='test@test.com' />
  )

  // assert
  expect(wrapper).toMatchSnapshot()

  // Assert lazyload component is loading image
  expect(wrapper.find('.lazyload-placeholder')).toHaveClassName('lazyload-placeholder')
})
