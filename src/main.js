import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission'
import './utils/error-log' // error log

import * as filters from './filters' // global filters

Vue.config.productionTip = false
// 部署后是生产环境 取消限制
if (process.env.NODE_ENV === 'development') {}
const { mockXHR } = require('../mock')
mockXHR()

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
