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

    return (
      <div className='c-step-indicators__steps'>
        { checkoutData }
      </div>
    )
  }

  renderCheckoutStep (step, currentStep) {
    const stepCompleted = this.props.checkout[step.componentName].completed
    const content = stepCompleted ? '✔' : step.position
    const active = step.position === currentStep

    return (
      <div className={classNames('c-step-indicator', { 'c-step-indicator--active': active, 'c-step-indicator--completed': stepCompleted })}>
        <div className={classNames('c-step-indicator__position', { 'c-step-indicator__position--active': active, 'c-step-indicator__position--completed': stepCompleted })}>
          { content }
        </div>
        <div className={classNames('c-step-indicator__line', { 'c-step-indicator__line--active': active, 'c-step-indicator__line--completed': stepCompleted })} />
        <div className={classNames('c-step-indicator__subtitle', { 'c-step-indicator__subtitle--active': active, 'c-step-indicator__subtitle--completed': stepCompleted })}>
          { step.title }
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='c-step-indicators'>
        { this.renderCheckoutSteps() }
      </div>
    )
  }
}

export default CheckoutSteps
