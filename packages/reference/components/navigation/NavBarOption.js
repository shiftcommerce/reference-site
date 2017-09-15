// Libraries
import { Component } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

class NavBarOption extends Component {
  render () {
    let {
      href,
      as,
      title,
      index
    } = this.props

    return (
      <Link href={href} as={as}>
        <a className={classNames('o-nav__option', { 'o-nav__option--first': index === 0 })} >
          { title }
        </a>
      </Link>
    )
  }
}

export default NavBarOption
