import store from '@/store'
import bets from '@/layer/bets'
import { map as langMap } from '@/locale'
import auth, {NETWORKS} from '@/layer/auth'
import { Vue, Component } from 'vue-property-decorator'
import { SET_USER, SET_BALANCE } from '@/store/mutation-types'

@Component
export default class AuthMixin extends Vue {
  protected langMap = Object.assign({}, langMap)

  public get currentLocale() {
    const {locale} = this.$i18n
    return langMap[locale]
  }

  get currentUser() {
    return this.$store.state.user
  }

  get username() {
    const [user] = this.currentUser.accounts
    return user.name
  }

  protected getUserBets() {
    return bets.getForUser(this.username)
  }

  protected login(provider: string = localStorage.getItem('provider') as string) {
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
  }

  protected logout() {
    if (auth.hasIdentity) {
      auth.forgetIdentity()
        .then(() => {
          this.$store.commit(SET_USER, null)
          this.$store.commit(SET_BALANCE, 0)
        })
    }
  }

  protected getBalance() {
    return auth.getBalance()
      .then((v: number) => {
        store.commit(SET_BALANCE, Number(v))
        return Number(v)
      })
  }

  protected createTransfer(amount: number, memo: string) {
    return auth.transfer(amount, memo)
  }

  private mounted() {
    if (auth.hasIdentity) {
      this.login()
    }
  }

  private openUrl(url: string) {
    window.open(url, '_blank')
  }

  private setLang(lang: string) {
    this.$i18n.locale = lang
  }
}
