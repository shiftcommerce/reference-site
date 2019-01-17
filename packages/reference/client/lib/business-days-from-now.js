// Libraries
import moment from 'moment-business-days'

moment.locale('en-gb')

export function businessDaysFromNow (days) {
  return moment(new Date()).businessAdd(days)
}
