// Libraries
import React, { Component } from 'react'
import classNames from 'classnames'

class Sidebar extends Component {
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

  render () {
    const { menus, currentMenu } = this.props
    const child = menus.find(menu => menu.label.toLowerCase() === (currentMenu && currentMenu.toLowerCase()))
    const Child = child && child.component

    return (
      <div className='c-sidebar'>
        <ul className='c-sidebar__menu'>
          { this.renderMenus() }
        </ul>
        <div className='c-sidebar__child'>
          { Child && <Child
            {...child.props}
          /> }
        </div>
      </div>
    )
  }
}
