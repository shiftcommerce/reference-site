// Component
import ProductDisplay from '../../../../components/products/pdp/ProductDisplay'
import DeliveryInformation from '../../../../components/products/pdp/DeliveryInformation'
import Carousel from '../../../../components/products/pdp/Carousel'
// Objects
import Button from '../../../../objects/Button'
import DropdownSelect from '../../../../objects/DropdownSelect'
import SizeSelector from '../../../../objects/SizeSelector'

// Fixtures
import product from '../../../fixtures/product.fixture'

test('renders correctly', () => {
  // Arrange
  const quantityOptions = [ 1, 2, 3, 4, 5 ]
  const emptyFunction = () => {}
  const value = {
    sku: '',
    size: 'Small',
    quantity: ''
  }

  // Act
  const wrapper = mount(
    <ProductDisplay product={product} changeQuantity={emptyFunction} changeSize={emptyFunction} addToBag={emptyFunction} {...value} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(product.title)
  expect(wrapper).toIncludeText(product.description)
  expect(wrapper).toIncludeText(product.variants[0].sku)
  expect(wrapper).toContainReact(<Carousel className='c-carousel-slider' product={product} />)
  expect(wrapper).toContainReact(<SizeSelector onChange={emptyFunction} value='' name='line_item[item_id]' prompt='Select a Size' variants={product.variants} aria-label='Size Selector' />)
  expect(wrapper).toContainReact(<DropdownSelect onChange={emptyFunction} value='' name='line_item[unit_quantity]' prompt='Select a Quantity' options={quantityOptions} aria-label='Quantity Selector' />)
  expect(wrapper).toContainReact(<Button label='ADD TO BAG' status='primary' size='lrg' aria-label='Add to Bag' onClick={emptyFunction} />)
  expect(wrapper).toContainReact(<DeliveryInformation />)
})
