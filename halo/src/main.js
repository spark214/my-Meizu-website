import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueWechatTitle from 'vue-wechat-title';
import Vuelazyload from 'vue-lazyload';
import Cropper from 'cropperjs';
import qs from 'qs';
Vue.use(VueWechatTitle)
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true;
Vue.prototype.$rootUrl = '/proxy';
Vue.use(Vuelazyload, {
  loading: require('../static/img/lazyloadPanda.gif')
})
// Vue.http.interceptors.push({
//   request(request) {
//     const jwtToken = JSON.parse(sessionStorage.getItem('auth.jwt_token'));
//     if (jwtToken) {
//       Vue.http.headers.common.Authorization = `Bearer ${jwtToken.access_token}`;
//     } else {
//       delete Vue.http.headers.common.Authorization;
//     }
//     return request;
//   },
//   response(response) {
//     if (response.status === 400 || response.status === 401) {
//       // 当 Token 已经失效时，清空所有保存在 localStorage 的数据
//       sessionStorage.clear();
//     }
//     return response;
//   },
// });
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
