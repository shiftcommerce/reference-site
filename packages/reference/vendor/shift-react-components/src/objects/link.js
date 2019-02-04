// Libraries
import React from 'react'

/**
 * Basic Link element, which returns a standard anchor tag
 * @param  {Object} props
 * @return {string} - HTML markup for the component
 */
export default (props) => {
  const { href, className, children } = props

  return (
    <a href={href} className={className}>{ children }</a>
  )
}
