// Component
import { ProductMenu } from '../../../../../client/components/products/listing/product-menu'

test('renders correctly', () => {
  // Arrange
  const initialProps = {
    title: 'Super Products',
    searchState: {
      query: 'coffee'
    }
  }

  // Act
  const wrapper = shallow(
    <ProductMenu {...initialProps} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('.c-product-listing__menu-description-title')).toIncludeText(initialProps.title)
})
