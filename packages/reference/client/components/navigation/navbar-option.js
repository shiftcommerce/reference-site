// Libraries
import { Component } from 'react'
import Link from 'next/link'

class NavBarOption extends Component {
  render () {
    const { as, title } = this.props

    return (
      <Link href={`/slug?slug=${as}`} as={as}>
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
