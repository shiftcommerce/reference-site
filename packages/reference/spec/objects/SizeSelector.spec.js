// Object
import SizeSelector from '../../objects/SizeSelector'

// Fixtures
import product from '../fixtures/product.fixture'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <SizeSelector name='line_item[item_id]' prompt='Select a Size' variants={product.variants} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
