import { Notification } from 'element-ui'

const DEFAULT_DURATION = 2000 // 默认消息显示时间为2s
const MSG_TITLE = '系统通知' // 消息标题

// 成功消息
export function successMsg (message, duration = DEFAULT_DURATION) {
  Notification({
    type: 'success',
    title: MSG_TITLE,
    duration,
    message
  })
}

// 失败消息
export function errorMsg (message, duration = DEFAULT_DURATION) {
  Notification({
    type: 'error',
    title: MSG_TITLE,
    duration,
    message
  })
}

// 警告消息
export function warningMsg (message, duration = DEFAULT_DURATION) {
  Notification({
    type: 'warning',
    title: MSG_TITLE,
    duration,
    message
  })
}

// 提示消息
export function infoMsg (message, duration = DEFAULT_DURATION) {
  Notification({
    type: 'info',
    title: MSG_TITLE,
    duration,
    message
  })
}
