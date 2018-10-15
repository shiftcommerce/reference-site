// Component
import ProductPrice from '../../../../../client/components/products/display/product-price'

// Fixtures
import VariantsWithSimilarPrice from '../../../../fixtures/variants-with-similar-price'
import VariantsWithDifferentPrices from '../../../../fixtures/variants-with-different-prices'

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
