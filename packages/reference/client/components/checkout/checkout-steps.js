// Libraries
import { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Link from 'next/link'

class CheckoutSteps extends Component {
  renderCheckoutSteps () {
    const { currentStep } = this.props

    const checkoutSteps = [
      { position: 1, title: 'Shipping Address', href: '/checkout/shipping-address' },
      { position: 2, title: 'Shipping Method', href: '/checkout/shipping-method' },
      { position: 3, title: 'Payment', href: '/checkout/payment', as: '/checkout/payment', shallow: true },
      { position: 4, title: 'Review & Submit' }
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
    const { stepActions } = this.props

    const stepCompleted = step.position < currentStep
    const content = stepCompleted ? '✔' : step.position
    const active = step.position === currentStep

    if (stepCompleted) {
      return (
        <Link href={step.href} as={step.as} shallow={step.shallow}>
          <a onClick={stepActions[step.position]}>{ this.renderStepIndicator(stepCompleted, active, content, step.title) }</a>
        </Link>
      )
    } else {
      return this.renderStepIndicator(stepCompleted, active, content, step.title)
    }
  }

  renderStepIndicator (stepCompleted, active, content, title) {
    return (
      <div className={classNames('c-step-indicator', { 'c-step-indicator--active': active, 'c-step-indicator--completed': stepCompleted })}>
        <div className={classNames('c-step-indicator__position', { 'c-step-indicator__position--active': active, 'c-step-indicator__position--completed': stepCompleted })}>
          { content }
        </div>
        <div className={classNames('c-step-indicator__line', { 'c-step-indicator__line--active': active, 'c-step-indicator__line--completed': stepCompleted })} />
        <div className={classNames('c-step-indicator__subtitle', { 'c-step-indicator__subtitle--active': active, 'c-step-indicator__subtitle--completed': stepCompleted })}>
          { title }
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='o-header--checkout'>
        <div className='c-checkout__steps'>
          <div className='c-step-indicators'>
            { this.renderCheckoutSteps() }
          </div>
        </div>
      </div>
    )
  }
}

CheckoutSteps.propTypes = {
  currentStep: PropTypes.oneOf([1, 2, 3, 4]),
  stepActions: PropTypes.objectOf(PropTypes.func)
}

CheckoutSteps.defaultProps = {
  stepActions: {}
}

export default CheckoutSteps
