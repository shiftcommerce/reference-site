// Component
import ProductPrice from '../../../../components/products/pdp/ProductPrice'

// Fixtures
import VariantsWithSimilarPrice from '../../../fixtures/variants_with_similar_price.fixture'
import VariantsWithDifferentPrices from '../../../fixtures/variants_with_different_prices.fixture'

test('renders correctly if variants have similar price', () => {
  // Act
  const wrapper = mount(
    <ProductPrice variants={VariantsWithSimilarPrice} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('£10.00')
})

test('renders correctly if variants have different prices', () => {
  // Act
  const wrapper = mount(
    <ProductPrice variants={VariantsWithDifferentPrices} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('£10.00 - £12.00')
})
