//将打平数据转换为层级数据
export function unflatTree (nodes, rootId, convert = n => n) {
  let items = {}
  nodes.forEach(n => {
    let key = n.pid
    if (!items[key])
      items[key] = []
    items[key].push(convert(n))
  })
  return formatTree(items, rootId, convert);
}

function formatTree (items, pid, convert) {
  let result = []
  if (!items[pid]) {
    return result
  }
  items[pid].forEach(i => {
    i.children = formatTree(items, i.id, convert)
    result.push(convert(i))
  })
  return result
}

export function walkTree (forest, func) {
  forest.forEach(tree => {
    func(tree)
    if (tree.children && tree.children.length > 0) {
      walkTree(tree.children, func)
    }
  })
}
