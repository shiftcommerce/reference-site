// Object
import Button from '../../../client/objects/Button'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <Button label='ADD TO BAG' status='positive' />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})

test('disabled button', () => {
  // Arrange & Act
  const wrapper = mount(
    <Button label='Testing Button' disabled='true' />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('button')).toHaveClassName('o-button--disabled')
  expect(wrapper.find('button')).toHaveProp('disabled', 'true')
})

describe('Button by default', () => {
  test('disabled should be false', () => {
    // Arrange & Act
    const wrapper = mount(
      <Button label='Enabled Button' />
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('button')).not.toHaveClassName('o-button--disabled')
  })

  test('should be of large size', () => {
    // Arrange & Act
    const wrapper = mount(
      <Button label='Large Button' />
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('button')).toHaveClassName('o-button--lrg')
  })

  test('status should be primary', () => {
    // Arrange & Act
    const wrapper = mount(
      <Button label='Primary Button' />
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('button')).toHaveClassName('o-button--primary')
  })
})
