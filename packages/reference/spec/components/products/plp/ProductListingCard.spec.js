// Components
import ProductListingCard from '../../../../components/products/plp/ProductListingCard'

// Libraries
import Link from 'next/link'

// Objects
import Image from '../../../../objects/Image'

// Fixtures
import product from '../../../fixtures/product.fixture'

test('renders ProductListingCard correctly', () => {
  // Act
  const wrapper = mount(
    <ProductListingCard product={product} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Link href={`/slug?slug=${product.canonical_path}`} as={product.canonical_path}><Image className='c-product-listing-card__image' src={product.asset_files[0].s3_url} alt={product.title} aria-label={product.title} /></Link>)
  expect(wrapper).toIncludeText(product.title)
  expect(wrapper).toIncludeText('£10.00')
  expect(wrapper.find('.c-product-listing-card__rating')).toHaveClassName('c-product-listing-card__rating')
})
