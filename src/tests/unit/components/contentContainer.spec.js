import ContentContainer from '@/views/home/KnowledgeDetail/components/ContentContainer'
import DynamicForm from '@/components/Form/DynamicForm'

import { createWrapper } from '../config'
import _ from 'lodash'

// 动态表单配置
const defaultConfig = {
  id: '1',
  formName: 'myForm'
}

// 表单容器测试
describe('ContentContainer.vue', () => {
  // 表单数量测试
  it('dynamicForm count', () => {
    // 显示主表
    let wrapper = createWrapper(ContentContainer, {
      formConfig: defaultConfig
    })
    expect(wrapper.findAllComponents(DynamicForm)).toHaveLength(1)
    // 显示基础表单与主表
    wrapper = createWrapper(ContentContainer, {
      formConfig: defaultConfig,
      showBase: true
    })
    expect(wrapper.findAllComponents(DynamicForm)).toHaveLength(2)
    // 显示基础表单、主表与子表
    const config = _.clone(defaultConfig)
    config.subForms = [{}, {}]
    wrapper = createWrapper(ContentContainer, {
      formConfig: config,
      showBase: true
    })
    expect(wrapper.findAllComponents(DynamicForm)).toHaveLength(4)
  })
})