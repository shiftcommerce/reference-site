// Libraries
import React, { Component } from 'react'
<<<<<<< HEAD
import SidebarItem from './sidebar-item'

class Sidebar extends Component {
=======
import classNames from 'classnames'

export class Sidebar extends Component {
  renderMenus () {
    const { currentMenu, handleClickedMenu, menus } = this.props
    return menus.map((menu, index) => (
      <li
        className={classNames('c-sidebar__menu-item', {
          'c-sidebar__menu-item--current': menu.label.toLowerCase() === (currentMenu && currentMenu.toLowerCase())
        })}
        key={index}
        onClick={() => handleClickedMenu(menu)()}
      >
        { menu.label }
      </li>
    ))
  }

>>>>>>> master
  render () {
    const { items, currentItem, handleClickedItem } = this.props

    return (
      <ul className='c-sidebar'>
        { items.map((item, index) => (
          <SidebarItem
            key={index}
            label={item.label}
            handleClick={handleClickedItem(item)}
            current={item.label.toLowerCase() === (currentItem && currentItem.toLowerCase())}
          />
        )) }
      </ul>

    )
  }
}
