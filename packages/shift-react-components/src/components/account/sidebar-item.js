// Libraries
import React from 'react'
import classNames from 'classnames'
import Router from 'next/router'

export const SidebarItem = ({ label, location, current }) => {
  return (
    <li onClick={() => Router.push(location)} className={classNames('c-sidebar__item', { 'c-sidebar__item--current': current })}>
      { label }
    </li>
  )
}
