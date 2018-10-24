import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import { noop } from '@/utils'

Vue.use(Vuex)

const Store = new Vuex.Store({
  plugins: [
    process.env.NODE_ENV === 'development' ? createLogger({}) : noop
  ]
})

if (process.env.DEV && module.hot) {
  // module.hot.accept(['./session'], () => {
  //   const session = require('./session').default
  //   Store.hotUpdate({modules: {session}})
  // })
}

export default Store
