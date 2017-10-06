// Libraries
import { Component } from 'react'
import classNames from 'classnames'

class CheckoutSteps extends Component {
  renderCheckoutSteps () {
    const currentStep = this.props.checkout.currentStep

    const checkoutSteps = [
      { position: 1, title: 'Shipping Address' },
      { position: 2, title: 'Shipping Method' },
      { position: 3, title: 'Payment' },
      { position: 4, title: 'Review & Submit' }
    ]

    const checkoutData = checkoutSteps.map((step, index) =>
      <div className='o-header__step' key={index}>
        { this.renderCheckoutStep(step, currentStep) }
      </div>
    )

    return checkoutData
  }

  renderCheckoutStep (step, currentStep) {
    const content = step.position < currentStep ? '✓' : step.position
    const active = step.position === currentStep

    return <div className={classNames('c-step-indicator', {'c-step-indicator--active': active})}>
      <div className='c-step-indicator__position'>
        { content }
      </div>
      <div className='c-step-indicator__subtitle'>
        { step.title }
      </div>
    </div>
  }

  render () {
    return <div className='c-step-indicators'>
      { this.renderCheckoutSteps() }
    </div>
  }
}

export default CheckoutSteps
