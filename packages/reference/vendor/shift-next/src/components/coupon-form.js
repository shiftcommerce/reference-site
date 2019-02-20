// Libraries
import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

// Actions
import { readCart } from '../actions/cart-actions'

// Lib
import ApiClient from '../lib/api-client'

// Objects
import { Button } from 'shift-react-components'

const addCartCouponRequest = (couponCode) => {
  return {
    endpoint: '/addCartCoupon',
    body: { couponCode }
  }
}

class CouponForm extends Component {
  async submitCoupon (couponCode) {
    const request = addCartCouponRequest(couponCode)
    const response = await new ApiClient().post(request.endpoint, request.body)
    if (response.status === 201) {
      return response.data
    }
    throw response.data
  }

  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateCart = this.updateCart.bind(this)
  }

  handleSubmit (values, { setSubmitting, setErrors }) {
    return this.submitCoupon(values.couponCode)
      .then(this.updateCart)
      .catch((error) => this.setAPIError(error, setErrors))
      .finally(() => setSubmitting(false))
  }

  updateCart () {
    this.props.dispatch(readCart({ force: true }))
  }

  setAPIError (error, setErrors) {
    setErrors({ couponCode: error.errors[0]['title'] })
  }

  validate (values) {
    let errors = {}
    if (!values.couponCode) errors.couponCode = 'Please enter a coupon code'
    return errors
  }

  renderForm () {
    return (
      <Formik
        initialValues={{ couponCode: '' }}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        { () => (
          <Form>
            <div className='c-coupon-form__field'>
              <Field type='text' name='couponCode' className='c-coupon-form__input' placeholder='Enter Promotion Code' />
              <div className="c-coupon-form__button-container">
                <Button
                  aria-label='Apply Gift Code'
                  className='c-coupon-form__button o-button--sml'
                  label='Apply'
                  status='primary' />
              </div>
            </div>
            <ErrorMessage name='couponCode' component='div' className='c-coupon-form__error' />
          </Form>
        ) }
      </Formik>
    )
  }

  render () {
    return (
      <div className='c-coupon-form'>
        <div aria-label='Use gift card or rewards code' className='c-gift__wrapper'>
          <p className='c-coupon-form__title'>Promotion Code</p>
          { this.renderForm() }
        </div>
      </div>
    )
  }
}

export default CouponForm