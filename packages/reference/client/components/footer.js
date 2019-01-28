// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Objects
import { Image } from 'shift-react-components'

export class Footer extends Component {
  renderFooter () {
    return (
      <div className='c-footer'>
        <div className='c-footer__content'>
          <div className='c-footer__links'>
            <a>FAQs</a><a>About</a><a>Delivery</a><a>Stores</a><a>Contact</a>
          </div>
          <div className='c-footer__social'>
            <div className='c-footer__social-text'>
              <a>Connect with ShopGo</a>
            </div>
            <div className='c-footer__social-links'>
              <Image src='/static/facebook.svg' />
              <Image src='/static/instagram.svg' />
              <Image src='/static/twitter.svg' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        { this.renderFooter() }
      </div>
    )
  }
}

export default connect()(Footer)
