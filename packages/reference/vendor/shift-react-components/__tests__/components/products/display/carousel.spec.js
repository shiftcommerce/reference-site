// Libraries
import React from 'react'

// Components
import { Carousel } from 'shift-react-components'

// Fixtures
import product from '../../../fixtures/product'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <Carousel assetFiles={product.asset_files} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('div').at(1)).toHaveClassName('.carousel.carousel-slider')
})
