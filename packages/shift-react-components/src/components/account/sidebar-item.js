// Libraries
import React from 'react'
import classNames from 'classnames'

import Config from '../../lib/config'
import link from '../../objects/link'

import Router from 'next/router'

export const SidebarItem = ({ label, location, current }) => {
  const Link = Config.get().Link || link

  return (
    <li onClick={() => Router.push(location)} className={classNames('c-sidebar__item', { 'c-sidebar__item--current': current })}>
      { label }
    </li>
  )
}
