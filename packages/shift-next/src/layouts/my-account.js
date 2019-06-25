// Libraries
import React, { Component } from 'react'
import Router from 'next/router'

// Lib
import { suffixWithStoreName } from '../lib/suffix-with-store-name'
import Config from '../lib/config'

// Components
import { Sidebar } from '@shiftcommerce/shift-react-components/src/components/account/sidebar'
import { MyAccountHeader } from '@shiftcommerce/shift-react-components/src/components/account/my-account-header'

export class MyAccountLayout extends Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.Head = Config.get().Head
  }

  componentDidMount () {
    const items = this.props.menu
    const path = Router.asPath
    const selected = items.filter(item => item.location.toLowerCase() === (path && path.toLowerCase()))

    this.setState({
      currentItem: selected.length ? selected[0].label : items[0].label
    })
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
          />
          <div className='c-myaccount-main__content'>
            { children }
          </div>
        </div>
      </>
    )
  }
}
