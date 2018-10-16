// Libraries
import { Component } from 'react'

// Objects
import Button from '../objects/button'
import Input from '../objects/input'

class PromoInput extends Component {
  render () {
    return (
      <div aria-label='Use gift card or rewards code' className='c-gift__wrapper'>
        <span className='c-payment-method__gift'>
          <Input
            label='Promotion Code'
            placeholder='Enter Promotion Code'
            className='c-payment-method__gift-input' />
          <Button
            aria-label='Apply Gift Code'
            className='c-payment-method__gift-button  o-button--sml'
            label='Apply'
            status='primary' />
        </span>
      </div>
    )
  }
}

export default PromoInput
