import Vuex from 'vuex'
import getters from '@/store/getters'

// 测试环境用
import docCategory from '@/store/modules/docCategory'
import user from '@/store/modules/user'
import utils from '@/store/modules/utils'

import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Form, FormItem, Row, Col, Card, ButtonGroup, Button, Dialog } from 'element-ui'

const localVue = createLocalVue()

// 创建模拟store
export function createStore () {
  const defaultStoreConfig = {
    state: {},
    getters,
    modules: {
      docCategory,
      user,
      utils
    }
  }
  return new Vuex.Store(defaultStoreConfig)
}

// 创建wrapper
export function createWrapper (component, propsData = {}, mocks = {}) {
  return shallowMount(component, {
    mocks,
    localVue,
    store: createStore(),
    propsData, // props 数据
    // element-ui 组件注册
    stubs: {
      'el-form': Form,
      'el-form-item': FormItem,
      'el-row': Row,
      'el-col': Col,
      'el-card': Card,
      'el-button-group': ButtonGroup,
      'el-button': Button,
      'el-dialog': Dialog
    }
  })
}
