import { Component } from 'react'

class ExampleComponent extends Component {
  render () {
    const {
      thisProp,
      thatProp
    } = this.props

    return (
      <div>
        `The output of { thisProp } + { thatProp } is { thisProp + thatProp }`
      </div>
    )
  }
}

export default ExampleComponent
