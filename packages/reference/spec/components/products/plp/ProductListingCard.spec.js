// Components
import ProductListingCard from '../../../../components/products/plp/ProductListingCard'

// Objects
import Button from '../../../../objects/Button'
import Image from '../../../../objects/Image'

// Fixtures
import product from '../../../fixtures/product.fixture'

test('renders ProductListingCard correctly', () => {
  // Arrange
  const emptyFunction = () => {}

  // Act
  const wrapper = mount(
    <ProductListingCard product={product} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Image className='c-product-listing-card__image' src={product.asset_files[0].s3_url} alt={product.title} aria-label={product.title} />)
  expect(wrapper).toIncludeText(product.title)
  expect(wrapper).toIncludeText('£10.00')
  expect(wrapper.find('Button')).toMatchElement(<Button label='View' status='primary' size='lrg' aria-label='View' onClick={emptyFunction} />)
  expect(wrapper.find('.c-product-listing-card__rating')).toHaveClassName('c-product-listing-card__rating')
})
