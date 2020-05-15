import ContentContainer from '@/views/home/KnowledgeDetail/components/ContentContainer'
import DynamicForm from '@/components/Form/DynamicForm'
import Vue from 'vue'

import { createWrapper } from '../config'
import _ from 'lodash'

// 动态表单配置
const defaultConfig = {
  id: '1',
  formName: 'myForm'
}

// 表单容器测试
describe('ContentContainer.vue', () => {

  // 表单数量顺序测试
  it('dynamicForm count and order', () => {
    // 显示主表
    let wrapper = createWrapper(ContentContainer, {
      formConfig: defaultConfig
    })
    expect(wrapper.findAllComponents(DynamicForm)).toHaveLength(1)
    expect(wrapper.findComponent(DynamicForm).props().config.formName).toBe(defaultConfig.formName)

    // 显示基础表单与主表
    wrapper = createWrapper(ContentContainer, {
      formConfig: defaultConfig,
      showBase: true
    })
    let dynamicForms = wrapper.findAllComponents(DynamicForm)
    expect(dynamicForms).toHaveLength(2)

    const baseForm = dynamicForms.wrappers[0]
    expect(baseForm.props().config.formName).toBe('基础信息') // 基础信息表单显示在主表之前

    // 显示基础表单、主表与子表
    const config = _.clone(defaultConfig)
    config.subForms = [{ id: 'sub1' }, { id: 'sub2' }]
    wrapper = createWrapper(ContentContainer, {
      formConfig: config,
      showBase: true
    })
    dynamicForms = wrapper.findAllComponents(DynamicForm)
    expect(dynamicForms).toHaveLength(4)
    // 子表显示在最后
    const subForm1 = dynamicForms.wrappers[2]
    const subForm2 = dynamicForms.wrappers[3]
    expect(subForm1.props().config.id).toBe('sub1')
    expect(subForm2.props().config.id).toBe('sub2')
  })

  // 显示模式开启测试
  it('viewMode open', async () => {
    const wrapper = createWrapper(ContentContainer, {
      formConfig: defaultConfig
    })

    // 初始为显示模式
    const dynamicForm = wrapper.findComponent(DynamicForm)
    expect(dynamicForm.props().isViewMode).toBe(true)

    // 触发edit方法后进入编辑模式
    wrapper.vm.edit()
    await Vue.nextTick()
    expect(dynamicForm.props().isViewMode).toBe(false)
  })
})