// Component
import ProductDisplay from '../../../../../client/components/products/display/product-display'
import Carousel from '../../../../../client/components/products/display/carousel'

// Objects
import { EwisForm, ProductPrice, VariantSelector } from 'shift-react-components'

// Fixtures
import product from '../../../../fixtures/product'

describe('PDP renders correctly', () => {
  test('when no variant is selected', () => {
    // arrange
    const emptyFunction = () => { }
    const value = {
      sku: '',
      variant: '',
      variantId: null,
      quantity: 1,
      price: '',
      stockAvailableLevel: 0
    }

    // act
    const wrapper = mount(
      <ProductDisplay product={product} changeVariant={emptyFunction} addToBag={emptyFunction} {...value} />
    )

    // assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText(product.title)
    expect(wrapper).toIncludeText(product.description)
    expect(wrapper).toContainReact(<Carousel assetFiles={product.asset_files} />)
    expect(wrapper).toContainReact(<VariantSelector onClick={emptyFunction} value={value.sku} name='line_item[item_id]' prompt='Select a Product' variants={product.variants} aria-label='Variant Selector' />)
    expect(wrapper.find('button.c-product-display__buttons-basket')).toMatchElement(<button>add to basket</button>)
    expect(wrapper).toContainReact(<ProductPrice minPrice={16.95} maxPrice={97.68} />)
  })

  test('when an in stock variant has been selected', () => {
    // arrange
    const emptyFunction = () => { }
    const value = {
      sku: '',
      variant: '',
      variantId: '343',
      quantity: 1,
      price: '',
      stockAvailableLevel: 0
    }

    // act
    const selectedVariant = product.variants.find(variant => variant.id === value.variantId)

    const wrapper = mount(
      <ProductDisplay product={product} selectedVariant={selectedVariant} changeVariant={emptyFunction} addToBag={emptyFunction} {...value} />
    )

    // assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText(selectedVariant.description)
    expect(wrapper).toIncludeText(selectedVariant.sku)
    expect(wrapper).toContainReact(<ProductPrice minPrice={16.95} maxPrice={16.95} />)
  })

  test('when an out of stock variant has been selected', () => {
    // arrange
    const emptyFunction = () => { }
    const value = {
      sku: '',
      variant: '',
      variantId: '344',
      quantity: 1,
      price: '',
      stockAvailableLevel: 0
    }

    // act
    const selectedVariant = product.variants.find(variant => variant.id === value.variantId)

    const wrapper = mount(
      <ProductDisplay product={product} selectedVariant={selectedVariant} changeVariant={emptyFunction} addToBag={emptyFunction} {...value} />
    )

    // assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText(selectedVariant.description)
    expect(wrapper).toIncludeText(selectedVariant.sku)
    expect(wrapper).toContainReact(<ProductPrice minPrice={97.68} maxPrice={97.68} />)
  })

  test('when an out of stock, "Email When In Stock" enabled variant has been selected', () => {
    // arrange
    const emptyFunction = () => { }
    const value = {
      sku: '',
      variant: '',
      variantId: '345',
      quantity: 1,
      price: '',
      stockAvailableLevel: 0
    }

    // act
    const selectedVariant = product.variants.find(variant => variant.id === value.variantId)

    const wrapper = mount(
      <ProductDisplay product={product} selectedVariant={selectedVariant} changeVariant={emptyFunction} addToBag={emptyFunction} {...value} />
    )

    // assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText(selectedVariant.description)
    expect(wrapper).toIncludeText(selectedVariant.sku)
    expect(wrapper).toContainReact(<ProductPrice minPrice={97.68} maxPrice={97.68} />)
    expect(wrapper).toContainReact(<EwisForm />)
  })
})
