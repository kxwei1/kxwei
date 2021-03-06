// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios = axios;
import store from './store'
import http from './common/js/http'
import apis from './common/js/apis'
Vue.prototype.$http = http;
Vue.prototype.$apis = apis;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router, store,
    // components: { App },
    // template: '<App/>'
    render: h => h(App)
})
