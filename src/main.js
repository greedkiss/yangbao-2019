// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import VueAreaLinkage from 'vue-area-linkage'
import 'vue-area-linkage/dist/index.css'
import { tokenStr } from './util/fetch'
import vuex from 'vuex'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faMapMarker, faPlayCircle, faStar, faThumbsUp, faQuestion, faHome, faComment, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAreaLinkage)
Vue.use(vuex)
library.add(faSearch)
library.add(faMapMarker)
library.add(faPlayCircle)
library.add(faStar)
library.add(faThumbsUp)
library.add(faQuestion)
library.add(faHome)
library.add(faComment)
library.add(faUser)

Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */

// login interceptors
// cooperate with another interceptor in util/fetch.js
router.beforeEach((to, from, next) => {
    if (to.matched.some(v => v.meta.requireAuth)) {
        if (localStorage.getItem(tokenStr)) {
            next()
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next()
    }
})

let store = new vuex.Store({
    state: {
        user: {}
    },

    mutations: {
        storeUserInfo (state, user) {
            state.user = user
        }
    }
})

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

