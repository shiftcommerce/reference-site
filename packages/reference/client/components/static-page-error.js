// Libraries
import { PureComponent } from 'react'

import { StaticPageError as ShiftStaticPageError } from 'shift-react-components'

class StaticPageError extends PureComponent {
  render () {
    const isProduction = process.env.NODE_ENV === 'production'
    const { error } = this.props
    const errorDetails = {
      Endpoint: JSON.stringify(error.request.endpoint),
      Query: JSON.stringify(error.request.query),
      'Response data': JSON.stringify(error.data)
    }

    return (
      <ShiftStaticPageError
        errorDetails={errorDetails}
        isProduction={isProduction}
      />
    )
  }
}

export default StaticPageError
