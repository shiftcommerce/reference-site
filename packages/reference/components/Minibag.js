import { Component } from 'react'
import Link from 'next/link'

class Minibag extends Component {
  render () {
    return <div>
      <Link href='/cart' ><a aria-label='View your cart'>View Your Bag</a></Link>
      <Link href='/checkout' ><a className='c-button c-button--negative c-button--lrg' aria-label='Go to checkout' >CHECKOUT</a></Link>
    </div>
  }
}

export default Minibag
