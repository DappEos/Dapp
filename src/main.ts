import './css/app.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import bootstrapComponents from './bootstrap'
import authLayer from './layer/auth'

Vue.config.productionTip = false;

bootstrapComponents(Vue)

authLayer.bootstrap()
  .then(() => {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  })
