// Component
import ProductPrice from '../../../../../client/components/products/display/ProductPrice'

// Fixtures
import VariantsWithSimilarPrice from '../../../../fixtures/variantsWithSimilarPrice.fixture'
import VariantsWithDifferentPrices from '../../../../fixtures/variantsWithDifferentPrices.fixture'

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
