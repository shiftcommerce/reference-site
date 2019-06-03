import React, { Component } from 'react'
import classNames from 'classnames'

import Config from '../lib/config'
import link from './link'

export class Breadcrumb extends Component {
  /**
   * Render the breadcrumb item
   * @param  {object} crumb
   * @param  {mixed}  key
   * @return {string} - HTML markup for the component
   */
  renderBreadcrumbItem (crumb, key) {
    const Link = Config.get().Link || link
    // The href for the Home link is different to the others, which are pulled
    // from the platform, so handle a direct href differently
    const href = crumb.href || `${crumb.page}?id=${crumb.id}`

    return (
      <li className='o-breadcrumb__item' key={key}>
        <Link
          href={href}
          as={crumb.canonical_path}
          className='o-breadcrumb__link'
        >
          { crumb.title }
        </Link>
      </li>
    )
  }

  /**
   * Render the breadcrumb trail
   * @param  {array} trail
   * @return {string} - HTML markup for the component
   */
  renderBreadcrumbTrail (trail) {
    return (
      trail && trail.map((crumb, id) => {
        return this.renderBreadcrumbItem(crumb, id)
      })
    )
  }

  /**
   * @return {string} - HTML markup for the component
   */
  render () {
    const { trail, className } = this.props

    return (
      <nav>
        <ol className={classNames(className, 'o-breadcrumb')}>
          { this.renderBreadcrumbItem({
            href: '/home/index',
            canonical_path: '/',
            title: 'Home',
            key: 0
          }) }

          { this.renderBreadcrumbTrail(trail) }
        </ol>
      </nav>
    )
  }
}
