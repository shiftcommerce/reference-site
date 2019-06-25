// Libraries
import React, { PureComponent } from 'react'
import classNames from 'classnames'
import Config from '../../lib/config'
import Link from '../../objects/link'

export class SidebarItem extends PureComponent {
  constructor (props) {
    super(props)

    this.Link = Config.get().Link || Link
  }

  render () {
    const { label, location, current } = this.props
    return (
      <li className={classNames('c-sidebar__item', { 'c-sidebar__item--current': current })}>
        <this.Link href={location} className='c-sidebar__link'>
          { label }
        </this.Link>
      </li>
    )
  }
}
