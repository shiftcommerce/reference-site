// Libraries
import React from 'react'

/**
 * Basic Head element, which returns a standard head tag
 * @param  {Object} props
 * @return {string} - HTML markup for the component
 */
function Head (props) {
  const { children } = props

  return (
    <head>{ children }</head>
  )
}

export default Head
