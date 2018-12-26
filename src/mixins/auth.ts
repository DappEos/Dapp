import store from '@/store'
import {ComponentOptions} from 'vue';
import auth, {NETWORKS} from '@/layer/auth'
import { SET_USER, SET_BALANCE } from '@/store/mutation-types';
import bets from '@/layer/bets';

export default {
  computed: {
    currentUser() {
      return (this as any).$store.state.user
    },
    username() {
      const [user] = (this.currentUser as any).accounts
      return user.name
    }
  },
  mounted() {
    if (auth.hasIdentity) {
      (this as any).login()
    }
  },
  methods: {
    getUserBets() {
      return bets.getForUser(this.username)
    },
    login(provider: string = localStorage.getItem('provider') as string) {
      const callback = async () => {
        try {
          await auth.getIdentity(NETWORKS[provider])
          localStorage.setItem('provider', provider)
          await this.getBalance()
        } catch (e) {}
      }

      if (auth.hasIdentity && process.env.NODE_ENV !== 'development') {
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
            this.$store.commit(SET_BALANCE, 0)
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
    }
  }
} as ComponentOptions<any>
