import { Component } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

class NavBarOption extends Component {
  render() {
    let {
      link,
      title,
      index
    } = this.props

    return <Link href={ link }>
      <a className={ classNames('o-nav__option', { 'o-nav__option--first': index === 0 }) } >
        { title }
      </a>
    </Link>
  }
}

export default NavBarOption