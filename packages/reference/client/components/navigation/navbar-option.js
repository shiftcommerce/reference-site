// Libraries
import { Component } from 'react'
import Link from 'next/link'

class NavBarOption extends Component {
  render () {
    const { href, as, title } = this.props

    return (
      <Link href={href} as={as}>
        <a className='c-nav__option' onClick={this.props.onClick}>
          <div className='c-nav__option-label'>{ title }</div>
          <div className='c-nav__option-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </a>
      </Link>
    )
  }
}

export default NavBarOption
