import { Component } from 'react'

// Objects
import NavBarOption from './NavBarOption'

class NavBar extends Component {
  renderNavOptions () {
    const navOptions = [
      { title: 'Mens', link: '/mens' },
      { title: 'Womens', link: '/womens' },
      { title: 'Boys', link: '/boys' },
      { title: 'Girls', link: '/girls' },
      { title: 'Other', link: '/other' },
      { title: 'Offers', link: '/offers' }
    ]

    return navOptions.map((navOption, index) =>
      <NavBarOption key={ index } index={ index } title={ navOption.title } link={ navOption.link } />
    )
  }

  render() {
    return <div className='o-nav' role='navigation' >
      { this.renderNavOptions() }
    </div>
  }
}

export default NavBar