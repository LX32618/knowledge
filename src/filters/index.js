import moment from 'moment'

export function dateTime (time) {
  if (!time) {
    return ''
  }
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

export function date (time) {
  if (!time) {
    return ''
  }
  return moment(time).format('YYYY-MM-DD')
}

export function dateFormat (time, format) {
  if (!time) {
    return ''
  }
  return moment(time).format(format)
}
