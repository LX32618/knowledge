import { unflatTree, walkTree } from '@/utils/tree.js'

const treeData = [
  {
    id: '1',
    pid: '0'
  },
  {
    id: '2',
    pid: '1'
  },
  {
    id: '3',
    pid: '1'
  },
  {
    id: '4',
    pid: '2'
  }
]

function setName (item) {
  item.name = item.id
  return item
}

describe('Utils:tree', () => {
  // 生成树
  it('unflatTree', () => {
    const result = unflatTree(treeData, '0')[0]
    expect(result.id).toBe('1')
    expect(result.children).toHaveLength(2)
    expect(result.children[0].children[0].id).toBe('4')
  })

  // 生成树（带转换方法）
  it('unflatTree with function', () => {
    const result = unflatTree(treeData, '0', setName)[0]
    expect(result.name).toBe('1')
    expect(result.children[0].children[0].name).toBe('4')
  })

  // 遍历树方法测试
  it('walk tree', () => {
    const forest = unflatTree(treeData, '0')
    walkTree(forest, setName)
    const result = forest[0]
    expect(result.name).toBe('1')
    expect(result.children[0].children[0].name).toBe('4')
  })
})
