/**
 * Converts the OMS status to a user friendly one
 * @param  {String} status
 * @return {String}
 */
export const fulfillmentStatus = (status) => {
  const mappedStatuses = {
    pending_approval: 'Awaiting shipment',
    unfulfilled: 'Awaiting shipment',
    short_shipped: 'Short shipped',
    partially_shipped: 'Partially shipped',
    fully_shipped: 'Shipped'
  }

  return mappedStatuses[status]
}
