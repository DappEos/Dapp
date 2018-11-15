import ScatterJs from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'

export const NETWORK = {
  blockchain: 'eos',
  protocol: 'https',
  host: 'nodes.get-scatter.com',
  port: 443,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}

export class Auth {

  private scatterRef: any

  private eosPluginRef: any

  get scatter() {
    return ScatterJs
  }

  get hasIdentity() {
    return this.scatterRef.scatter.identity
  }

  public async bootstrap() {
    ScatterJs.plugins(this.getEosPlugin())
    const connected = await ScatterJs.scatter.connect(ScatterJs.Blockchains.EOS)
    if (!connected) {return}
    this.scatterRef = ScatterJs;
    (window as any).ScatterJS = (window as any).ScatterEOS = undefined
  }

  public getEosPlugin() {
    if (this.eosPluginRef) {
      return this.eosPluginRef
    }
    const plugin = new ScatterEOS()

    return this.eosPluginRef = plugin
  }

  public async getIdentity() {
    return this.scatterRef.scatter.getIdentity({
      personal: ['firstname', 'lastname'],
      location: ['country'],
      // accounts: [network]
    })
  }

  public async forgetIdentity(): Promise<void> {
    return ScatterJs.scatter.forgetIdentity()
  }

  public async getArbitrarySignature(
    publicKey: string, data: any, whatfor: string = '', isHash = false
  ) {
    return ScatterJs.scatter.getArbitrarySignature(...arguments)
  }
}

export default new Auth()
