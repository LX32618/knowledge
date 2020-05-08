import DynamicForm from '@/components/Form/DynamicForm'
import { Col } from 'element-ui'
import { createWrapper } from '../config'
import _ from 'lodash'

// 动态表单配置
const defaultConfig = {
  id: '1',
  formName: 'myForm'
}

// 动态表单组件测试
describe('DynamicForm.vue', () => {
  // 表单名显示测试
  it('show formName as title', () => {
    const wrapper = createWrapper(DynamicForm, {
      config: defaultConfig
    })
    expect(wrapper.find('h3').text()).toContain(defaultConfig.formName)
  })

  //表单域数量测试
  it('fields length is equal to el-col count', () => {
    const config = _.assign(_.clone(defaultConfig), {
      fields: [{}, {}, {}]
    })
    const wrapper = createWrapper(DynamicForm, {
      config
    })
    expect(wrapper.findAllComponents(Col)).toHaveLength(config.fields.length)
  })
})
