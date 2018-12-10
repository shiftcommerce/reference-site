// Component
import ProductMenuOptions from '../../../../../client/components/products/listing/product-menu-options'

// Objects
import Breadcrumb from '../../../../../client/objects/breadcrumb'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    ALGOLIA_INDEX_NAME: 'instant_search'
  }
}))

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
})
