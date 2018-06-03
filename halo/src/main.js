import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueWechatTitle from 'vue-wechat-title';
import Vuelazyload from 'vue-lazyload';
import Cropper from 'cropperjs';

Vue.use(VueWechatTitle)
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true;
Vue.prototype.$rootUrl = '/proxy';
Vue.use(Vuelazyload, {
  loading: require('../static/img/lazyloadPanda.gif')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
