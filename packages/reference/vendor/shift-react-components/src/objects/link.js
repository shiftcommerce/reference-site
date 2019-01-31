import React from 'react'

export default (props) => {
  const { href, className, children } = props
  return (
    <a href={href} className={className}>{ children }</a>
  )
}
