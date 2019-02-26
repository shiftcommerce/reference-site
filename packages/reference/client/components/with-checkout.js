// Libraries
import { Component, createRef } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import Head from 'next/head'

// Libs
import { suffixWithStoreName } from '../lib/suffix-with-store-name'

// Components
import CheckoutCart from '../components/checkout/checkout-cart'
import CheckoutCartTotal from '../components/checkout/checkout-cart-total'
import CheckoutSteps from '../components/checkout/checkout-steps'
import CouponForm from '../components/coupon-form'
import MiniPlaceOrder from '../components/checkout/mini-place-order'

import { PaymentIcons } from 'shift-react-components'

// Actions
import { readCart, updateLineItemQuantity, deleteLineItem } from '../actions/cart-actions'

export function withCheckout (WrappedComponent) {
  class WithCheckout extends Component {
    constructor (props) {
      super(props)

      this.wrappedRef = createRef()

      this.state = {
        loading: true,
        continueButtonProps: {},
        currentStep: 1
      }

      this.setCurrentStep = this.setCurrentStep.bind(this)
      this.updateQuantity = this.updateQuantity.bind(this)
      this.deleteItem = this.deleteItem.bind(this)
    }

    static async getInitialProps (args) {
      if (WrappedComponent.getInitialProps) {
        return WrappedComponent.getInitialProps(args)
      }
    }

    componentDidMount () {
      this.props.dispatch(readCart()).then(() => {
        if (!this.props.cart.line_items_count) {
          return Router.push('/cart')
        }
        this.setState({
          loading: false
        })
      })
    }

    componentDidUpdate () {
      if (this.wrappedRef.current) {
        if (JSON.stringify(this.state.continueButtonProps) !== JSON.stringify(this.wrappedRef.current.continueButtonProps())) {
          this.setState({
            continueButtonProps: this.wrappedRef.current.continueButtonProps()
          })
        }

        if (this.state.pageTitle !== this.wrappedRef.current.pageTitle()) {
          this.setState({
            pageTitle: this.wrappedRef.current.pageTitle()
          })
        }

        if (this.state.currentStep !== this.wrappedRef.current.currentStep()) {
          this.setState({
            currentStep: this.wrappedRef.current.currentStep()
          })
        }

        if (this.wrappedRef.current.stepActions && JSON.stringify(this.state.stepActions) !== JSON.stringify(this.wrappedRef.current.stepActions())) {
          this.setState({
            stepActions: this.wrappedRef.current.stepActions()
          })
        }
      }
    }

    setCurrentStep (step) {
      this.setState({
        currentStep: step
      })
    }

    updateQuantity (e) {
      this.props.dispatch(updateLineItemQuantity(e.target.dataset.id, parseInt(e.target.value, 10)))
    }

    deleteItem (e) {
      e.preventDefault()
      this.props.dispatch(deleteLineItem(e.target.dataset.id)).then(() => {
        if (!this.props.cart.line_items_count) Router.push('/cart')
      })
    }

    render () {
      const { cart, checkout, order, dispatch } = this.props

      if (this.state.loading || !cart.id) {
        return <div>Loading</div>
      }

      return (
        <>
          <Head>
            <title>{ suffixWithStoreName(`Checkout - ${this.state.pageTitle}`) }</title>
          </Head>
          <CheckoutSteps
            currentStep={this.state.currentStep}
            stepActions={this.state.stepActions}
          />
          { this.state.currentStep === 4 && <MiniPlaceOrder
            convertToOrder={this.wrappedRef.current.convertToOrder}
            total={cart.total}
            isValidOrder={this.wrappedRef.current.isValidOrder(cart, order)}
          /> }
          <div className='c-checkout'>
            <div className='o-grid-container'>
              <div className='o-col-1-13 o-col-1-8-l'>
                <WrappedComponent
                  ref={this.wrappedRef}
                  setCurrentStep={this.setCurrentStep}
                  {...this.props}
                />
              </div>
              <div className='o-col-1-13 o-col-8-13-l'>
                <div className='c-checkout__cart'>
                  <CheckoutCart title='Your Cart' cart={cart} updateQuantity={this.updateQuantity} deleteItem={this.deleteItem} />
                  <CouponForm dispatch={dispatch} />
                  <CheckoutCartTotal
                    continueButtonProps={this.state.continueButtonProps}
                    cart={cart}
                    checkout={checkout}
                    order={order}
                  />
                  <div className='c-checkout__payment'>
                    <PaymentIcons />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  return WithCheckout
}

const connectedWithCheckout = (WrappedComponent) => {
  const mapStateToProps = ({ cart, checkout, order }) => {
    return { cart, checkout, order }
  }

  return connect(mapStateToProps)(withCheckout(WrappedComponent))
}

export default connectedWithCheckout
