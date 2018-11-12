import ScatterJs from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'

export class Auth {

  private scatterRef: any

  get scatter() {
    return ScatterJs
  }

  get hasIdentity() {
    return this.scatterRef.scatter.identity
  }

  public async bootstrap() {
    ScatterJs.plugins(new ScatterEOS())
    const connected = await ScatterJs.scatter.connect('app')
    if (!connected) {return}
    this.scatterRef = ScatterJs;
    (window as any).ScatterJS = (window as any).ScatterEOS = undefined
  }

  public async getIdentity() {
    return this.scatterRef.scatter.getIdentity({
      personal: ['firstname', 'lastname'],
      location: ['country'],
      // accounts: [network]
    })
  }

  public forgetIdentity(): Promise<void> {
    return ScatterJs.scatter.forgetIdentity()
  }
}

export default new Auth()
