import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

export function createStore () {
  const defaultStoreConfig = {
    state: {}
  }
  return new Vuex.Store(defaultStoreConfig)
}

export function createWrapper (component, propsData = {}, mocks = {}) {
  return shallowMount(component, {
    mocks,
    localVue,
    store: createStore(),
    propsData,
    stubs: ['el-form', 'el-form-item']
  })
}
