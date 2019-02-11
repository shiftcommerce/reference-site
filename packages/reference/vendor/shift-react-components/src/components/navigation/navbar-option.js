// Libraries
import React, { Component } from 'react'

// Lib
import componentMapping from '../../lib/component-mapping'

class NavBarOption extends Component {
  constructor (props) {
    super(props)

    this.Link = componentMapping('Link')
  }

  render () {
    const { href, as, title } = this.props

    return (
      <this.Link href={href} as={as}>
        <div className='c-nav__option' onClick={this.props.onClick}>
          <div className='c-nav__option-label'>{ title }</div>
          <div className='c-nav__option-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </this.Link>
    )
  }
}

export default NavBarOption
