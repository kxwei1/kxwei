import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import state from './state' 
import mutations from './mutations' 
import actions from './actions' 
import getters from './getters' 
import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    plugins:[createPersistedState()]
})