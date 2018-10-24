import './css/app.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import bootstrapComponents from './bootstrap'

Vue.config.productionTip = false;

bootstrapComponents(Vue)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
