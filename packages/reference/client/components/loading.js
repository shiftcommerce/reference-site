import React from 'react'
import ReactLoading from 'react-loading'

const Loading = ({ type, color }) => (
  <ReactLoading type={'spin'} color={'#431048'} height={50} width={50} className={'c-loading'} />
)

export default Loading
