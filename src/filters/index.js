import moment from 'moment'

export function dateTime (time) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

export function date (time) {
  return moment(time).format('YYYY-MM-DD')
}
