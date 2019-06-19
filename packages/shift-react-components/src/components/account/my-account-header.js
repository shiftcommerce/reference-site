// Libraries
import React, { Component } from 'react'

// Lib
import { Button } from '../../objects/button'
import Config from '../../lib/config'
import Link from '../../objects/link'

export class MyAccountHeader extends Component {
  constructor (props) {
    super(props)

    this.Link = Config.get().Link || Link
  }

  renderLogout () {
    return (
      <this.Link href='/account/logout'>
        <Button
          aria-label='Logout'
          className='c-myaccount-header__logout-button o-button--sml'
          label='Logout'
          status='secondary'
        />
      </this.Link>
    )
  }

  render () {
    return (
      <div className='c-myaccount-header'>
        <h1 className='c-myaccount-header__title'>My Account</h1>
        { this.renderLogout() }
      </div>
    )
  }
}
