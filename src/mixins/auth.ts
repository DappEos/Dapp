import auth from '@/layer/auth'
import {ComponentOptions} from 'vue';
import { SET_USER } from '@/store/mutation-types';

export default {
  computed: {
    currentUser() {
      return (this as any).$store.state.user
    }
  },
  methods: {
    login() {
      const callback = () => {
        auth.getIdentity()
          .then((user: any) => {
            this.$store.commit(SET_USER, user)
          })
          .catch(console.error)
      }

      if (auth.hasIdentity) {
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
    }
  }
} as ComponentOptions<any>
