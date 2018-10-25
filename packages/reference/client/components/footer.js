// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

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
              <div className='c-footer__social-facebook' />
              <div className='c-footer__social-instagram' />
              <div className='c-footer__social-twitter' />
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
