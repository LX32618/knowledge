import DynamicForm from '@/components/Form/DynamicForm'
import { createWrapper } from '../config'

describe('DynamicForm.vue', () => {
  it('show formName as title', () => {
    const formName = 'myForm'
    const wrapper = createWrapper(DynamicForm, {
      config: { formName }
    })
    expect(wrapper.find('h3').text()).toContain(formName)
  })
})
