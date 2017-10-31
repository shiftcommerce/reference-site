// Libs
import LocalForage from './localforage'

class CheckoutStepTransitionManager {
  static get STEPS () {
    return {
      shippingAddress: 1,
      shippingMethod: 2,
      paymentMethod: 3,
      reviewOrder: 4
    }
  }

  constructor (eventType, currentComponent, checkoutState = {}, localStorage = new LocalForage()) {
    this.eventType = eventType
    this.currentComponent = currentComponent
    this.checkoutState = checkoutState
    this.localStorage = localStorage
    this.currentStep = this.checkoutState.currentStep
    this.collapsed = true
    this.steps = CheckoutStepTransitionManager.STEPS
    this.stepKeys = Object.keys(this.steps)
    this.lastStep = this.steps[this.stepKeys[this.stepKeys.length - 1]]
  }

  call () {
    return this.handleStepTransition(Object.assign({}, this.checkoutState))
  }

  handleStepTransition (newState) {
    // Collapse All Components
    Object.assign(newState, this.stepKeys.every((step) => (newState[step].collapsed = this.collapsed)))

    // Handle Transition Event
    if (this.eventType === 'edit') { Object.assign(newState, this.onEditStepEvent(newState)) }
    if (this.eventType === 'complete') { Object.assign(newState, this.onCompleteStepEvent(newState)) }

    // Update TimeStamp
    newState.updatedAt = new Date()

    // Update Local Storage
    this.localStorage.setValue('checkout', newState)

    return newState
  }

  onEditStepEvent (newState) {
    // Expand Current Component
    newState[this.currentComponent].collapsed = !this.collapsed
    // Set Current Step
    newState.currentStep = this.steps[this.currentComponent]

    return newState
  }

  onCompleteStepEvent (newState) {
    // Collapse Current Component
    newState[this.currentComponent].collapsed = this.collapsed

    if (this.notOnLastStep() && this.nextComponentNotCompleted()) {
      // Expand Current Component
      newState[this.nextComponent()].collapsed = !this.collapsed
      // Update Current Step To The Next Step
      newState.currentStep = this.nextStep()
    }

    // Set Current Step As Completed
    newState[this.currentComponent].completed = true

    return newState
  }

  nextStep () {
    return (this.currentStep < this.lastStep) ? (this.currentStep + 1) : this.lastStep
  }

  nextComponent () {
    return this.stepKeys.find((key) => (this.steps[key] === this.nextStep()))
  }

  nextComponentNotCompleted () {
    return !this.checkoutState[this.nextComponent()].completed
  }

  notOnLastStep () {
    return !(this.currentStep === this.lastStep)
  }
}

export default CheckoutStepTransitionManager
