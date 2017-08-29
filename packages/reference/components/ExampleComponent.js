import { Component } from 'react'

class ExampleComponent extends Component {
  render () {
    return <div>
      The output of { this.props.this } + { this.props.that } is { this.props.this + this.props.that }
    </div>
  }
}

export default ExampleComponent
