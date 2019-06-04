// Libraries
import React from 'react'
import classNames from 'classnames'

import Config from '../../lib/config'
import link from '../../objects/link'

const Link = Config.get().Link || link

export const SidebarItem = ({ label, location, current }) => {
  return <li className={classNames('c-sidebar__item', { 'c-sidebar__item--current': current })}>
    <Link href={location}>{ label }</Link>
  </li>
}
