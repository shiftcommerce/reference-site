// Components
import EwisForm from '../../../../../client/components/products/display/ewis-form'

// Objects
import Input from '../../../../../client/objects/input'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <EwisForm />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Input placeholder='Email' className='c-ewis-form__input-field' />)
})
