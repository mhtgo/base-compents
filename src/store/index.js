import Vue from 'vue'
import Vuex from 'vuex'
import project from './modules/project' // 引入项目立项阶段的项目信息
import loading from './modules/loading' // 全局按钮loading控制
import user from './modules/user' // 当前用户信息
import tagsView from './modules/cachedViews' // 缓存页面
import getters from './getters'

Vue.use(Vuex)

const store=new Vuex.Store({
    modules:{
        project,
        loading,
        user,
        tagsView
    },
    getters,
})

export default store
