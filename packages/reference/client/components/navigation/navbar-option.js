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
        <a className={classNames('c-nav__option', { 'c-nav__option--first': index === 0 })} >
          { title }
          <div className='c-nav__option-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </a>
      </Link>
    )
  }
}

export default NavBarOption
