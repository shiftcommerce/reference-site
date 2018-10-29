// Component
import ProductDisplay from '../../../../../client/components/products/display/product-display'

// Objects
import Button from '../../../../../client/objects/button'
import VariantSelector from '../../../../../client/objects/variant-selector'
import Image from '../../../../../client/objects/image'

// Fixtures
import product from '../../../../fixtures/product'

test('renders correctly', () => {
  // Arrange
  const emptyFunction = () => {}
  const value = {
    sku: '',
    size: 'Small',
    quantity: '',
    stockAvailableLevel: 0
  }

  // Act
  const wrapper = mount(
    <ProductDisplay product={product} changeSize={emptyFunction} addToBag={emptyFunction} {...value} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(product.title)
  expect(wrapper).toIncludeText(product.description)
  expect(wrapper).toContainReact(<Image src={product.asset_files[0].s3_url} key={product.asset_files[0].s3_url} className='c-product-display__gallery-image' />)
  expect(wrapper).toContainReact(<VariantSelector value='' name='line_item[item_id]' prompt='Select a Product' variants={product.variants} aria-label='Size Selector' />)
  expect(wrapper.find('Button').at(0)).toMatchElement(<Button className='c-product-display__buttons-basket-icon' label='ADD TO BASKET' status='primary' size='lrg' aria-label='Add to Basket' onClick={emptyFunction} />)
})
