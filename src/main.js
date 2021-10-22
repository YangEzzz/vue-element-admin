import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import * as Echarts from 'echarts'
import VueECharts from 'vue-echarts'
// import * as VELine from 'v-charts/lib/line.common'
// import * as VEBar from 'v-charts/lib/bar.common'
// import * as VEHistogram from 'v-charts/lib/histogram'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.config.productionTip = false
Vue.prototype.$echarts = Echarts
// Vue.component('ve-line', VELine)
// Vue.component('ve-bar', VEBar)
Vue.component('v-chart', VueECharts)
// Vue.component('ve-histogram', VEHistogram)
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
