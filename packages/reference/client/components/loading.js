import React from 'react'
import ReactLoading from 'react-loading'

const Loading = ({ type, color }) => (
  <ReactLoading
    type={'spin'}
    color={'#f5c6cb'}
    height={50}
    width={50}
    delay={250}
    className={'c-loading u-padding-top-xl'}
  />
)

export default Loading
