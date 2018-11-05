// Libraries
import { Component } from 'react'

// Objects
import Image from './image'

class Map extends Component {
  render () {
    const className = this.props
    return (
      <Image src='/static/googlemap.png' className={className}/>
    )
  }
}

export default Map
