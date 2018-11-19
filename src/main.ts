import './css/app.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import bootstrapComponents from './bootstrap'
import authLayer from './layer/auth'
import VueI18n from 'vue-i18n'
import * as messages from './locale'

Vue.config.productionTip = false;

bootstrapComponents(Vue)

const i18n = new VueI18n({
  messages,
  locale: 'en'
})

authLayer.bootstrap()
  .then(() => {
    new Vue({
      router,
      store,
      i18n,
      render: (h) => h(App),
    }).$mount('#app');
  })
