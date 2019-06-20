// Libraries
import React from 'react'
import classNames from 'classnames'

import Config from '../../lib/config'
import link from '../../objects/link'

export const SidebarItem = ({ label, location, current }) => {
  const Link = Config.get().Link || link

  return (
    <Link href={location}>
      <li className={classNames('c-sidebar__item', { 'c-sidebar__item--current': current })}>
        { label }
      </li>
    </Link>
  )
}
