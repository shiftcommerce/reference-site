// Libraries
import { Component } from 'react'
import Link from 'next/link'

class Breadcrumb extends Component {
  constructor (props) {
    super(props)
    this.renderBreadcrumbs = this.renderBreadcrumbs.bind(this)
  }

  renderBreadcrumbs (trail) {
    return (
      trail && trail.map((crumb, idx) =>
        <li key={idx} className='o-breadcrumb__item'>
          <Link href={crumb.canonical_path} >
            <a className='o-breadcrumb__link'>{ crumb.title }</a>
          </Link>
        </li>
      )
    )
  }

  render () {
    let {
      trail,
      ...otherProps
    } = this.props

    return (
      <nav>
        <ol className={'o-breadcrumb'} {...otherProps}>
          <li className='o-breadcrumb__item'>
            <Link href='/home/index' as='/'>
              <a className='o-breadcrumb__link'>Home</a>
            </Link>
          </li>

          { this.renderBreadcrumbs(trail) }
        </ol>
      </nav>
    )
  }
}

export default Breadcrumb
