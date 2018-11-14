// Object
import VariantSelector from '../../../client/objects/variant-selector'

// Fixtures
import product from '../../fixtures/product'

test('renders correctly', () => {
  // Arrange
  const changeVariant = jest.fn()

  // Act
  const wrapper = mount(
    <VariantSelector name='line_item[item_id]' prompt='Select a Size' onChange={changeVariant} variants={product.variants} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  wrapper.find('select').simulate('change', { target: { value: 'Variant 1' } })
  expect(changeVariant).toHaveBeenCalled()
})
