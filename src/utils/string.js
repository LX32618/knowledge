// 字符串转数组
export function stringToArray (str, token=',') {
  if (!str) {
    return []
  }
  let result = str.split(token)
  return Array.isArray(result) ? result : [result]
}