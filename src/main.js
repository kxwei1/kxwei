import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    // store:store,
    components: { App },
    template: '<App/>',
    render: h => h(App)

})
