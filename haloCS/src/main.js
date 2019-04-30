import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueWechatTitle from 'vue-wechat-title';
import Vuelazyload from 'vue-lazyload';
import store from './store';
import vuex from 'vuex'

Vue.use(vuex)
Vue.use(VueWechatTitle)
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$rootUrl = '/proxy';
Vue.use(Vuelazyload, {loading: require('../static/img/lazyloadPanda.gif')});

router.beforeEach((to, from, next) => {
  let expireTime = sessionStorage.getItem('expireTime');
  if(to.path === '/newPost' || to.path == '/user' || to.path == '/mallCheck' || to.matched[0].path == '/member'){
    const nowTime = new Date().getTime();
    if(expireTime && nowTime < expireTime){
      next();
    }else{
      sessionStorage.setItem('pageHistory',to.fullPath);
      next('/login');
    }
  }else{
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
