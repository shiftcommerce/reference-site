// Libraries
import React from 'react'

export const Flash = ({ text, modifier }) => {
  const classes = modifier ? `o-flash o-flash--${modifier}` : 'o-flash'

  return (
    <div className={classes}>{ text }</div>
  )
}
