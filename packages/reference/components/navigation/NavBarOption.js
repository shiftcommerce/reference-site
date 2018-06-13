// Libraries
import { Component } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

class NavBarOption extends Component {
  render () {
    let {
      as,
      title,
      index
    } = this.props

    return (
      <Link href={`/slug?slug=${as}`} as={as}>
        <a className={classNames('o-nav__option', { 'o-nav__option--first': index === 0 })} >
          { title }
        </a>
      </Link>
    )
  }
}

export default NavBarOption
