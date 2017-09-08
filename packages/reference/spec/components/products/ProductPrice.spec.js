// Component
import ProductPrice from '../../../components/products/ProductPrice'

// Fixtures
import variants_with_similar_price from '../../fixtures/variants_with_similar_price.fixture'
import variants_with_different_prices from '../../fixtures/variants_with_different_prices.fixture'

test('renders correctly if variants have similar price', () => {
  // Act
  const wrapper = mount(
    <ProductPrice variants={variants_with_similar_price} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('£10.00')
})

test('renders correctly if variants have different prices', () => {
  // Act
  const wrapper = mount(
    <ProductPrice variants={variants_with_different_prices} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('£10.00 - £12.00')
})
