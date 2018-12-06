import store from '@/store'
import {ComponentOptions} from 'vue';
import auth, {NETWORKS} from '@/layer/auth'
import { SET_USER, SET_BALANCE } from '@/store/mutation-types';
const lastId = localStorage.getItem('lastId') || 1;
let _lastId = Number(lastId)

export default {
  computed: {
    currentUser() {
      return (this as any).$store.state.user
    }
  },
  mounted() {
    if (auth.hasIdentity) {
      (this as any).login()
    }
  },
  methods: {
    login(provider: string = localStorage.getItem('provider') as string) {
      const callback = async () => {
        try {
          await auth.getIdentity(NETWORKS[provider])
          localStorage.setItem('provider', provider)
          await this.getBalance()
        } catch (e) {
          console.error(e)
        }
      }

      if (auth.hasIdentity && process.env.NODE_ENV != 'development') {
        auth.forgetIdentity()
          .then(callback)
      } else {
        callback()
      }
    },
    logout() {
      if (auth.hasIdentity) {
        auth.forgetIdentity()
          .then(() => {
            this.$store.commit(SET_USER, null)
          })
      }
    },
    getBalance() {
      return auth.getBalance()
        .then((v: number) => {
          store.commit(SET_BALANCE, Number(v))
          return Number(v)
        })
    },
    createTransfer(amount: number, memo: string) {
      return auth.transfer(amount, memo)
    },
    getTableRows() {
      return auth.getTableRows(_lastId, {limit: 100})
        .then((data: {rows: any[], more: boolean}) => {
          const { rows } = data
          const last = rows[rows.length - 1]
          localStorage.setItem('lastId', _lastId = last.id)
          return data
        })
    }
  }
} as ComponentOptions<any>
