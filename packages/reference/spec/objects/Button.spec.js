// Object
import Button from '../../objects/Button'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <Button label='ADD TO BAG' status='positive' />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
