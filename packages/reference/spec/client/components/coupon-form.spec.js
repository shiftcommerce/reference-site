import nock from 'nock'

import { CouponForm } from '../../../client/components/coupon-form'
import * as cartActions from '../../../client/actions/cart-actions'

afterEach(() => { nock.cleanAll() })

test('displays an input and a submit button', () => {
  const wrapper = mount(
    <CouponForm />
  )

  expect(wrapper).toContainMatchingElement('.c-coupon-form__input')
  expect(wrapper).toContainMatchingElement('.c-coupon-form__button')
  expect(wrapper).toMatchSnapshot()
})

describe('#validate', () => {
  test('adds an error message when the coupon code field is empty', () => {
    const wrapper = mount(
      <CouponForm />
    )

    const errors = wrapper.instance().validate({})
    expect(errors.couponCode).toBeTruthy()
  })

  test("doesn't add errors when a coupon code is provided", () => {
    const wrapper = mount(
      <CouponForm />
    )

    const errors = wrapper.instance().validate({ couponCode: 'COUPON_CODE' })
    expect(errors.couponCode).toBeUndefined()
  })
})

test('setAPIError extracts the error from an API response and sets it on the form', () => {
  const wrapper = mount(
    <CouponForm />
  )

  const apiResponse = {
    errors: [{
      title: 'Error message'
    }]
  }

  const setErrors = jest.fn()

  wrapper.instance().setAPIError(apiResponse, setErrors)

  expect(setErrors).toHaveBeenCalledWith({ couponCode: 'Error message' })
})

describe('#submitCoupon', () => {
  test('when coupon is valid resolves with the body of the response', () => {
    const wrapper = mount(
      <CouponForm />
    )

    nock(process.env.API_HOST_PROXY)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post('/addCartCoupon', { couponCode: 'COUPON_CODE' })
      .reply(201, { coupon: 'coupon_data' })

    expect.assertions(1)
    return expect(wrapper.instance().submitCoupon('COUPON_CODE')).resolves.toEqual({ coupon: 'coupon_data' })
  })

  test('when coupon is invalid rejects with errors', async () => {
    const wrapper = mount(
      <CouponForm />
    )

    nock(process.env.API_HOST_PROXY)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post('/addCartCoupon', { couponCode: 'COUPON_CODE' })
      .reply(422, { error: 'Error reason' })

    expect.assertions(1)
    return expect(wrapper.instance().submitCoupon('COUPON_CODE')).rejects.toEqual({ error: 'Error reason' })
  })
})

describe('#handleSubmit', () => {
  test('updates the cart when the submission is succesfull and sets submitting to false', async () => {
    const wrapper = mount(
      <CouponForm />
    )

    const setSubmitting = jest.fn()

    wrapper.instance().submitCoupon = jest.fn().mockImplementation(() => Promise.resolve())
    wrapper.instance().updateCart = jest.fn()

    await wrapper.instance().handleSubmit({ couponCode: 'COUPON_CODE' }, { setSubmitting })

    // Check that the coupon have been submitted to the backend
    expect(wrapper.instance().submitCoupon).toHaveBeenCalledWith('COUPON_CODE')
    expect(wrapper.instance().updateCart).toHaveBeenCalledTimes(1)
    expect(setSubmitting).toHaveBeenCalledWith(false)
  })

  test('sets API errors on the form when the submission is unsuccessful and sets submitting to false', async () => {
    const wrapper = mount(
      <CouponForm />
    )

    const setSubmitting = jest.fn()

    wrapper.instance().submitCoupon = jest.fn().mockImplementation(() => Promise.reject(Error('Test error')))
    wrapper.instance().setAPIError = jest.fn()

    await wrapper.instance().handleSubmit({ couponCode: 'COUPON_CODE' }, { setSubmitting })

    // Check that the coupon have been submitted to the backend
    expect(wrapper.instance().submitCoupon).toHaveBeenCalledWith('COUPON_CODE')
    expect(wrapper.instance().setAPIError).toHaveBeenCalledTimes(1)
    expect(setSubmitting).toHaveBeenCalledWith(false)
  })
})

test('updateCart dispatches a force read cart action', () => {
  const dispatch = jest.fn()

  const wrapper = mount(
    <CouponForm dispatch={dispatch} />
  )

  const readCartSpy = jest.spyOn(cartActions, 'readCart')
    .mockImplementation(() => 'READ_CART')

  wrapper.instance().updateCart()

  expect(readCartSpy).toHaveBeenCalledWith({ force: true })
  expect(dispatch).toHaveBeenCalledWith('READ_CART')
})
