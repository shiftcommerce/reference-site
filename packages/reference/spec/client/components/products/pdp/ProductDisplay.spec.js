// Component
import ProductDisplay from '../../../../../client/components/products/display/ProductDisplay'
import Carousel from '../../../../../client/components/products/display/Carousel'

// Objects
import Button from '../../../../../client/objects/Button'
import VariantSelector from '../../../../../client/objects/VariantSelector'

// Fixtures
import product from '../../../../fixtures/product.fixture'

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
  expect(wrapper).toContainReact(<Carousel className='c-carousel-slider' product={product} />)
  expect(wrapper).toContainReact(<VariantSelector value='' name='line_item[item_id]' prompt='Select a Size' variants={product.variants} aria-label='Size Selector' />)
  expect(wrapper.find('Button').at(0)).toMatchElement(<Button className='c-product-display__buttons-basket-icon' label='ADD TO BASKET' status='primary' size='lrg' aria-label='Add to Basket' onClick={emptyFunction} />)
  expect(wrapper.find('Button').at(1)).toMatchElement(<Button className='c-product-display__buttons-buy-icon' label='BUY' status='secondary' size='lrg' aria-label='Buy' />)
})
