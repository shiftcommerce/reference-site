// Components
import CheckoutSteps from '../../../components/checkout/CheckoutSteps'

test('Renders steps correctly', () => {
  // arrange
  const checkout = {
    currentStep: 2
  }

  // act
  const wrapper = shallow(<CheckoutSteps checkout={checkout} />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Shipping Address')
  expect(wrapper).toIncludeText('Shipping Method')
  expect(wrapper).toIncludeText('Payment')
  expect(wrapper).toIncludeText('Review & Submit')
})

test('Renders current step 1 correctly', () => {
  // arrange
  const checkout = {
    currentStep: 1
  }

  // act
  const wrapper = shallow(<CheckoutSteps checkout={checkout} />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('.c-step-indicator--active')).toIncludeText('Shipping Address')
})

test('Renders current step 2 correctly', () => {
  // arrange
  const checkout = {
    currentStep: 2
  }

  // act
  const wrapper = shallow(<CheckoutSteps checkout={checkout} />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('.c-step-indicator--active')).toIncludeText('Shipping Method')
})

test('Renders current step 3 correctly', () => {
  // arrange
  const checkout = {
    currentStep: 3
  }

  // act
  const wrapper = shallow(<CheckoutSteps checkout={checkout} />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('.c-step-indicator--active')).toIncludeText('Payment')
})

test('Renders current step 4 correctly', () => {
  // arrange
  const checkout = {
    currentStep: 4
  }

  // act
  const wrapper = shallow(<CheckoutSteps checkout={checkout} />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('.c-step-indicator--active')).toIncludeText('Review & Submit')
})
