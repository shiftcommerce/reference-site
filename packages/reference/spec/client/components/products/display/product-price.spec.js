// Component
import ProductPrice from '../../../../../client/components/products/display/product-price'

// Fixtures
import ProductWithVariantsWithSimilarPrice from '../../../../fixtures/product-with-variants-with-similar-price'
import ProductWithVariantsWithDifferentPrices from '../../../../fixtures/product-with-variants-with-different-prices'

test('renders correctly if variants have similar price', () => {
  // Act
  const wrapper = mount(
    <ProductPrice product={ProductWithVariantsWithSimilarPrice} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('£10.00')
})

test('renders correctly if variants have different prices', () => {
  // Act
  const wrapper = mount(
    <ProductPrice product={ProductWithVariantsWithDifferentPrices} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('£10.00 - £12.00')
})
