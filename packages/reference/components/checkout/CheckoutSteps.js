// Libraries
import { Component } from 'react'
import classNames from 'classnames'

class CheckoutSteps extends Component {
  renderCheckoutSteps () {
    const currentStep = this.props.checkout.currentStep

    const checkoutSteps = [
      { position: 1, title: 'Shipping Address', componentName: 'shippingAddress' },
      { position: 2, title: 'Shipping Method', componentName: 'shippingMethod' },
      { position: 3, title: 'Payment', componentName: 'paymentMethod' },
      { position: 4, title: 'Review & Submit', componentName: 'reviewOrder' }
    ]

    const checkoutData = checkoutSteps.map((step, index) =>
      <div className='o-header__step' key={index}>
        { this.renderCheckoutStep(step, currentStep) }
      </div>
    )

    return checkoutData
  }

  renderCheckoutStep (step, currentStep) {
    const stepCompleted = this.props.checkout[step.componentName].completed
    const content = stepCompleted ? '✓' : step.position
    const active = step.position === currentStep

    return (
      <div className={classNames('c-step-indicator', { 'c-step-indicator--active': active, 'c-step-indicator--completed': stepCompleted })}>
        <div className='c-step-indicator__position'>
          { content }
        </div>
        <div className='c-step-indicator__subtitle'>
          { step.title }
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='c-step-indicators__steps'>
        { this.renderCheckoutSteps() }
      </div>
    )
  }
}

export default CheckoutSteps
