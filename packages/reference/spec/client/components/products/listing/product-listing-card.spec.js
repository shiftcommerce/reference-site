// Components
import ProductListingCard from '../../../../../client/components/products/listing/product-listing-card'

// Libraries
import Link from 'next/link'

// Objects
import Image from '../../../../../client/objects/image'

// Fixtures
import productSearchHit from '../../../../fixtures/product-search-hit'

test('renders ProductListingCard correctly', () => {
  // Act
  const wrapper = mount(
    <ProductListingCard
      title={productSearchHit.product_title}
      assetFileUrl={productSearchHit.product_assets[0].url}
      assetFileAltText={productSearchHit.product_assets[0].alt_text}
      minPrice={productSearchHit.variant_meta_data.eu.price}
      maxPrice={productSearchHit.variant_meta_data.eu.price}
      productPath={productSearchHit.product_path}
      productRating={productSearchHit.product_rating}
    />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(
    <Link href={`/slug?slug=${productSearchHit.product_path}`} as={productSearchHit.product_path}>
      <Image
        className='c-product-listing-card__image u-image-shadow'
        src={productSearchHit.product_assets[0].url}
        alt={productSearchHit.product_title}
        aria-label={productSearchHit.product_title}
      />
    </Link>
  )
  expect(wrapper).toIncludeText(productSearchHit.product_title)
  expect(wrapper.find('.c-product-price')).toIncludeText(`£${productSearchHit.variant_meta_data.eu.price}`)
  expect(wrapper.find('.c-product-listing-card__rating')).toHaveClassName('c-product-listing-card__rating')
})
