// Libraries
import React, { PureComponent } from 'react'

export class OrderAddresses extends PureComponent {
  render () {
    return (
      <>
        { this.props.addresses.map((address) => {
          return (
            <div className='c-order-history__address' key={address.id}>
              <p className='u-bold'>{ address.name }</p>
              <p>{ address.company }</p>
              { address.lines.map((line => { return <p>{line}</p> })) }
              <p>{ address.city }</p>
              <p>{ address.state }</p>
              <p>{ address.postcode }</p>
              <p>{ address.country }</p>
            </div>
          )
        })}
      </>
    )
  }
}
