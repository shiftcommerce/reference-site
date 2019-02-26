// Components
import CheckoutCartTotal from '../../../../client/components/checkout/checkout-cart-total'

test("renders the cart's total, subtotal and shipping cost", () => {
  // Arrange
  const cart = {
    sub_total: 15,
    total: 20,
    discount_summaries: [],
    shipping_method: {
      total: 5
    }
  }

  // Act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} order={{}} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Total Price:  £15.00')
  expect(wrapper).toIncludeText('Shipping costs:  £5.00')
  expect(wrapper).toIncludeText('TOTAL:  £20.00')
})

test('renders promotions', () => {
  // Arrange
  const cart = {
    sub_total: 15,
    total: 20,
    discount_summaries: [{
      id: 1,
      name: 'Christmas Special',
      total: 1.5
    }],
    shipping_method: {
      total: 5
    }
  }

  // Act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} order={{}} />
  )

  // Assert
  expect(wrapper).toIncludeText('Christmas Special:- £1.50')
})

test('renders shipping promotions', () => {
  // Arrange
  const cart = {
    sub_total: 15,
    total: 20,
    shipping_method: {
      total: 5
    },
    discount_summaries: [],
    shipping_discount_name: 'Free shipping',
    shipping_total_discount: -5
  }

  // Act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} order={{}} />
  )

  // Assert
  expect(wrapper).toIncludeText('Free shipping:- £5.00')
})

test('renders payment errors', () => {
  // Arrange
  const cart = {
    sub_total: 15,
    total: 20,
    discount_summaries: [],
    shipping_method: {
      total: 5
    }
  }

  const order = {
    paymentError: 'Payment authentication failed'
  }

  // Act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} order={order} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Payment authentication failed')
})

test('displays a correct disabled button based on passed props', () => {
  // Arrange
  const cart = {
    sub_total: 15,
    total: 20,
    discount_summaries: []
  }

  const continueButtonProps = {
    label: 'Choose Shipping Method',
    disabled: true
  }

  // Act
  const wrapper = mount(
    <CheckoutCartTotal order={{}} cart={cart} continueButtonProps={continueButtonProps}/>
  )

  // Assert
  expect(wrapper.find('button.c-cart-summary-buttons__cta--proceed')).toHaveText('Choose Shipping Method')
  expect(wrapper.find('button.c-cart-summary-buttons__cta--proceed')).toHaveProp('disabled', true)
})

test('displays a correct enabled button based on passed props', () => {
  // Arrange
  const cart = {
    sub_total: 15,
    total: 20,
    discount_summaries: []
  }

  const continueButtonProps = {
    label: 'Choose Shipping Method',
    disabled: false
  }

  // Act
  const wrapper = mount(
    <CheckoutCartTotal order={{}} cart={cart} continueButtonProps={continueButtonProps}/>
  )

  // Assert
  expect(wrapper.find('button.c-cart-summary-buttons__cta--proceed')).toHaveText('Choose Shipping Method')
  expect(wrapper.find('button.c-cart-summary-buttons__cta--proceed')).toHaveProp('disabled', false)
})
