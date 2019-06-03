// Libraries
import React, { Component } from 'react'
import Router from 'next/router'

// Lib
import { suffixWithStoreName } from '../lib/suffix-with-store-name'
import Config from '../lib/config'

// Components
import { Sidebar, MyAccountHeader } from '@shiftcommerce/shift-react-components'

class MyAccountLayout extends Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.Head = Config.get().Head
    this.handleClickedItem = this.handleClickedItem.bind(this)
  }

  componentDidMount () {
    const items = this.props.menu
    const path = Router.asPath
    const selected = items.filter(item => item.location.toLowerCase() === (path && path.toLowerCase()))

    this.setState({
      currentItem: selected.length ? selected[0].label : items[0].label
    })

    if (!selected.length) {
      Router.replace(items[0].location)
    }
  }

  handleClickedItem (item) {
    return () => {
      Router.push(item.location)
    }
  }

  renderPageTitle () {
    return (
      <this.Head>
        <title>{ suffixWithStoreName('My Account') }</title>
      </this.Head>
    )
  }

  render () {
    const { menu, children } = this.props

    return (
      <>
        { this.renderPageTitle() }
        <MyAccountHeader />
        <div className='c-myaccount-main'>
          <Sidebar
            items={menu}
            currentItem={this.state.currentItem}
            handleClickedItem={this.handleClickedItem}
          />
          <div className='c-myaccount-main__content'>
            { children }
          </div>
        </div>
      </>
    )
  }
}

export default MyAccountLayout
