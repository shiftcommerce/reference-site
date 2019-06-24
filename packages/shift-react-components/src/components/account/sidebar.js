// Libraries
import React, { Component } from 'react'
import { SidebarItem } from './sidebar-item'

export class Sidebar extends Component {
  render () {
    const { items, currentItem, handleItemClick } = this.props

    return (
      <ul className='c-sidebar'>
        { items.map((item, index) => (
          <SidebarItem
            key={index}
            label={item.label}
            location={item.location}
            handleItemClick={handleItemClick}
            current={item.label.toLowerCase() === (currentItem && currentItem.toLowerCase())}
          />
        )) }
      </ul>
    )
  }
}
