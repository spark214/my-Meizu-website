import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueWechatTitle from 'vue-wechat-title';
import Vuelazyload from 'vue-lazyload';
import store from './store';
import Cropper from 'cropperjs';
import qs from 'qs';
Vue.use(VueWechatTitle)
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$rootUrl = '/proxy';
Vue.use(Vuelazyload, {
  loading: require('../static/img/lazyloadPanda.gif')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
