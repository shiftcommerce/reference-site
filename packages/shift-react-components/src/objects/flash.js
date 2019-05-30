// Libraries
import React from 'react'

const flash = ({ text, modifier }) => {
  const classes = modifier ? `o-flash o-flash--${modifier}` : 'o-flash'
  return (
    <div className={classes}>{ text }</div>
  )
}

export default flash
