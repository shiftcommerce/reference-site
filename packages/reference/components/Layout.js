import { Component } from 'react'

class Layout extends Component {
  render () {
    return <div>
      <div className='header'>
        Header
      </div>

      <div className='body'>
        { this.props.children }
      </div>

      <div className='footer'>
        Footer
      </div>
    </div>
  }
}

export default Layout
