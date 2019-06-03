// Libraries
import React from 'react'
import classNames from 'classnames'

const SidebarItem = ({ label, current, handleClick }) => {
  return <li
    className={classNames('c-sidebar__item', { 'c-sidebar__item--current': current })}
    onClick={() => handleClick()}>
    { label }
  </li>
}

export default SidebarItem
