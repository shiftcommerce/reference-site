// Object
import ContentImage from '../../objects/ContentImage'

// Fixtures
import product from '../fixtures/product.fixture'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <ContentImage src={product.asset_files[0].url} height='705' width='503' />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
