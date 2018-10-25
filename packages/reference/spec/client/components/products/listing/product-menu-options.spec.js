// Component
import ProductMenuOptions from '../../../../../client/components/products/listing/product-menu-options'
import ProductMenuDropdowns from '../../../../../client/components/products/listing/product-menu-dropdowns'

// Objects
import Breadcrumb from '../../../../../client/objects/breadcrumb'

test('renders correctly', () => {
  // Arrange
  const initialProps = {
    toggleFiltering: () => (null),
    filterCount: 3
  }

  // Act
  const wrapper = shallow(
    <ProductMenuOptions {...initialProps} />
  )

  const rootTree = wrapper.find('.c-product-listing__menu-options')

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(rootTree.find(Breadcrumb))
  expect(rootTree.find(ProductMenuDropdowns))
})
