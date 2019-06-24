// Libraries
import React from 'react'
import classNames from 'classnames'

export const SidebarItem = ({ label, location, current, handleItemClick }) => {
  return (
    <li onClick={() => handleItemClick(location)} className={classNames('c-sidebar__item', { 'c-sidebar__item--current': current })}>
      { label }
    </li>
  )
}
