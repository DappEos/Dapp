import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import { noop } from '@/utils'
import * as mutations from './mutations'
import bets from './module/bets'

Vue.use(Vuex)

const IS_DEV_MODE = process.env.NODE_ENV === 'development'
const Store = new Vuex.Store({
  mutations,
  modules: {bets},
  strict: IS_DEV_MODE,
  plugins: [
    IS_DEV_MODE ? createLogger({}) : noop
  ],
  state: {
    user: null,
    balance: 0,
    threshold: 0
  }
})

if (process.env.DEV && module.hot) {
  // module.hot.accept(['./session'], () => {
  //   const session = require('./session').default
  //   Store.hotUpdate({modules: {session}})
  // })
}

export default Store
