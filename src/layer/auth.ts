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

interface Dictionary<T> {
  [key: string]: T
}

// testnet
export const NETWORK = {
  blockchain: Blockchains.EOS,
  protocol: 'http',
  host: 'jungle2.cryptolions.io',
  port: 80,
  chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
}

export const NETWORK1 = {
  blockchain: Blockchains.EOS,
  protocol: 'https',
  host: 'nodes.get-scatter.com',
  port: 443,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}

export const NETWORKS: Dictionary<any> = {
  EOS: NETWORK1,
  JUNGLE: NETWORK
}

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

  public getIdentity(network: any) {
    return Scatter.scatter.getIdentity({
      accounts: [network]
    })
      .then((user: any) => {
        store.commit(SET_USER, user)
        const {scatter} = Scatter
        const eos = scatter.eos(network, Eos, {expiresInSeconds: 60})
        _eos = eos
        _account = (user.accounts as any[])
          .find((v: {blockchain: string}) => v.blockchain === Blockchains.EOS)
      })
  }

  public forgetIdentity(): Promise<void> {
    return Scatter.scatter.forgetIdentity()
  }

  public transfer(amount: number, memo: string) {
    const transactionOpts = {
      authorization: [`${_account.name}@${_account.authority}`]
    }
    return _eos.transfer(_account.name, 'dicedicedice', `${Number(amount)
      .toFixed(4)
      .toString()} EOS`, memo, transactionOpts)
  }

  public getBalance() {
    return this.eos.getCurrencyBalance('eosio.token', this.account.name)
      .then((result: any) => {
        return !result[0] ? 0 : parseFloat(result[0].split(' ', 1)[0]).toFixed(4)
      })
  }

  public getTableRows(opts = {}) {
    return this.eos.getTableRows({
      json: true,
      code: 'dicedicedice',
      scope: 'dicedicedice',
      table: 'activebets',
      ...opts
    })
  }

  public getLastId(): Promise<number> {
    return this.eos.getTableRows({
      json: true,
      code: 'dicedicedice',
      scope: 'dicedicedice',
      table: 'globalvars',
      lower_bound: 101,
      upper_bound: 101
    }).then((data: {rows: GlobalVars[]}) => {
      const {rows} = data
      const lastId = rows[0].val
      return lastId
    })
  }
}

interface GlobalVars {
  id: number;
  val: number;
}

export default new Auth()
