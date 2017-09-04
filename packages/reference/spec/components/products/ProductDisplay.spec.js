// Component
import ProductDisplay from '../../../components/products/ProductDisplay'
import RelatedProducts from '../../../components/products/RelatedProducts'
import DeliveryInformation from '../../../components/products/DeliveryInformation'

// Objects
import ContentImage from '../../../objects/ContentImage'
import Button from '../../../objects/Button'
import DropdownSelect from '../../../objects/DropdownSelect'
import SizeSelector from '../../../objects/SizeSelector'

// Fixtures
import product from '../../fixtures/product.fixture'

test('renders correctly', () => {
  // Arrange
  const quantityOptions = [ 1, 2, 3, 4, 5 ]
  const emptyFunction = () => {}
  const value = {
    sku: '',
    size: '',
    quantity: ''
  }

  // Act
  const wrapper = mount(
    <ProductDisplay product={product} changeQuantity={emptyFunction} changeSize={emptyFunction} addToBag={emptyFunction} { ...value } />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(product.title)
  expect(wrapper).toIncludeText(product.sku)
  expect(wrapper).toIncludeText(product.description)
  expect(wrapper).toContainReact(<ContentImage src={product.asset_files[0].url} alt={product.title} height='705' width='503' aria-label={product.title} />)
  expect(wrapper).toContainReact(<SizeSelector onChange={emptyFunction} value='' name='line_item[item_id]' prompt='Select a Size' variants={product.variants} aria-label='Size Selector' />)
  expect(wrapper).toContainReact(<DropdownSelect onChange={emptyFunction} value='' name='line_item[unit_quantity]' prompt='Select a Quantity' options={quantityOptions} aria-label='Quantity Selector' />)
  expect(wrapper).toContainReact(<Button label='ADD TO BAG' status='positive' aria-label='Add to Bag' onClick={emptyFunction} />)
  expect(wrapper).toContainReact(<DeliveryInformation />)
  expect(wrapper).toContainReact(<RelatedProducts bundles={product.bundles} />)
})
