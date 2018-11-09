import auth from '@/layer/auth'

export default {
  methods: {
    login() {
      auth.forgetIdentity()
        .then(() => {
          auth.getIdentity()
            .then(console.log)
            .catch(console.error)
        })
    }
  }
}
