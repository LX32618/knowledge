import '@/assets/css/formMaking/iconfont/iconfont.css'
import '@/assets/css/formMaking/cover.scss'
import '@/assets/css/formMaking/index.scss'

import Vue from 'vue'
import MakingForm from '@/components/FormMaking/Container.vue'
import GenerateForm from '@/components/FormMaking/GenerateForm.vue'

Vue.component('form-making', MakingForm)
Vue.component('form-generate', GenerateForm)
