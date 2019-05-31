// Libraries
import React from 'react'

// Lib
import Image from '../../objects/image'

// Assets
import completedCheck from '../../static/white-check.svg'

export const CheckoutStepIcon = () => {
  return (
    <Image className='c-step-indicator__icon' src={completedCheck} />
  )
}
