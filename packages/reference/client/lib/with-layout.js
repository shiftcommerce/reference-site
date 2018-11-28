// Lib
import InitialPropsDelegator from './initial-props-delegator'

// Components
import ConnectedLayout from '../components/layout'

export default function withLayout (Component) {
  return class extends InitialPropsDelegator(Component) {
    render () {
      return (
        <ConnectedLayout>
          <Component {...this.props} />
        </ConnectedLayout>
      )
    }
  }
}
