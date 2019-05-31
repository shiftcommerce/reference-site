// Libraries
import React, { Component } from 'react'

// Components
import { Link } from '../../objects/link'

export class NavBarOption extends Component {
  render () {
    const { href, as, title, onClick } = this.props
    const className = 'c-nav__option'

    return (
      <Link
        href={href}
        as={as}
        className={className}
        onClick={onClick}
      >
        <div className='c-nav__option-label'>{ title }</div>
        <div className='c-nav__option-text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </Link>
    )
  }
}
