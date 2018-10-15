// Object
import VariantSelector from '../../../client/objects/variant-selector'

// Fixtures
import product from '../../fixtures/product'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <VariantSelector name='line_item[item_id]' prompt='Select a Size' variants={product.variants} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
