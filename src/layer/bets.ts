import axios from 'axios';
import auth from './auth';

const BASE_URL = 'https://28n0zokehj.execute-api.us-west-2.amazonaws.com/dev';

const http = axios.create({
  baseURL: BASE_URL
});

export default {
  async getLast30() {
    const lastId = await auth.getLastId()
    return auth.getTableRows({
      lower_bound: lastId - 30,
      upper_bound: lastId,
      limit: 30
    })
    .then((result: any) => {
      result.rows = (result.rows as any[]).reverse()
      return result
    });
  },
  get24H() {
    return http.get(`/bets`);
  },
  getAll() {
    return http.get(`/stats`);
  },
  getForUser(user: string) {
    return http.get<{ RecentBets: any[] }>(`/users/${user}`);
  }
};
