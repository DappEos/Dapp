import auth from './auth';

const sortBet = (result: any) => {
  result.rows = result.rows.sort((a: any, b: any) => b.bet_id - a.bet_id)
  return result
}

export default {
  async getLast30() {
    return this.getRecentBets(30)
  },

  getForUser(user: string) {
    return auth.getTableRows({
      limit: 30,
      index_position: 2,
      key_type: 'i64',
      lower_bound: user,
      upper_bound: user
    }).then(sortBet)
  },

  getRecentBets(limit: number = 30) {
    return auth.getTableRows({limit}).then(sortBet)
  }
};
