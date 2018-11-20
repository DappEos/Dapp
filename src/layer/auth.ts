import store from '@/store'
import Eos from 'eosjs'
import Scatter from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import { SET_USER } from '@/store/mutation-types';

const {Blockchains} = Scatter
// tslint:disable-next-line:variable-name
let _eos: any = null
// tslint:disable-next-line:variable-name
let _account = {
  name: null,
  authority: null
}

// testnet
export const NETWORK = {
  blockchain: Blockchains.EOS,
  protocol: 'http',
  host: 'jungle.cryptolions.io',
  port: 18888,
  chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
}

// export const NETWORK = {
//   blockchain: Blockchains.EOS,
//   protocol: 'https',
//   host: 'nodes.get-scatter.com',
//   port: 443,
//   chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
// }

export class Auth {
  private eosPluginRef: any

  get account() {
    return _account
  }

  get eos() {
    return _eos
  }

  get hasIdentity() {
    return Scatter.scatter.identity
  }

  public async bootstrap() {
    Scatter.plugins(this.getEosPlugin())
    const connected = await Scatter.scatter.connect(Scatter.Blockchains.EOS)
    if (!connected) {return}
    const win = window as any
    win.ScatterJS = win.ScatterEOS = win.scatter = undefined
  }

  public getEosPlugin() {
    if (this.eosPluginRef) {
      return this.eosPluginRef
    }
    const plugin = new ScatterEOS()

    return this.eosPluginRef = plugin
  }

  public async getIdentity() {
    return Scatter.scatter.getIdentity({
      //personal: ['firstname', 'lastname'],
      //location: ['country'],
      accounts: [NETWORK]
    })
      .then((user: any) => {
        store.commit(SET_USER, user)
        const {scatter} = Scatter
        const eos = scatter.eos(NETWORK, Eos, {expiresInSeconds: 60})
        _eos = eos
        _account = (user.accounts as any[])
          .find((v: {blockchain: string}) => v.blockchain === Blockchains.EOS)
      })
  }

  public async forgetIdentity(): Promise<void> {
    return Scatter.scatter.forgetIdentity()
  }

  public async transfer(amount: number, memo: string) {
    const transactionOpts = {
      authorization: [`${_account.name}@${_account.authority}`]
    }
    return _eos.transfer(_account.name, 'tamtamtamtam', `${Number(amount)
      .toFixed(4)
      .toString()} EOS`, memo, transactionOpts)
  }

  public async getBalance() {
    return this.eos.getCurrencyBalance('eosio.token', this.account.name)
      .then((result: any) => {
        return !result[0] ? 0 : parseFloat(result[0].split(' ', 1)[0]).toFixed(4)
      })
  }

  public async getTableRows() {
    return this.eos.getTableRows(
      true, 'tamtamtamtam', this.account.authority, 'result', '0'
    )
  }
}

export default new Auth()
