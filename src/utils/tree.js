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

// 遍历树
export function walkTree (forest, func) {
  forest.forEach(tree => {
    func(tree)
    if (tree.children && tree.children.length > 0) {
      walkTree(tree.children, func)
    }
  })
}

export function unflatCategoryTree (nodes, rootId, makeRoot = false) {
  const data = unflatTree(nodes, rootId)
  walkTree(data, item => {
    if (item.type === 2) {
      item.isLeaf = true
    }
  })
  if (makeRoot) {
    const root = {
      id: '0',
      name: '知识工程',
      children: data
    }
    return [root]
  }
  return data
}
