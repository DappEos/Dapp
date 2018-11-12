import axios from 'axios'

const BASE_URL = 'https://28n0zokehj.execute-api.us-west-2.amazonaws.com/dev'

const http = axios.create({
  baseURL: BASE_URL
})

export default {
  getLast30() {
    return http.get(`/bets`)
  },
  get24H() {
    return http.get(`/bets`)
  },
  getAll() {
    return http.get(`/stats`)
  },
  getForUser(user: string) {
    return http.get<{RecentBets: any[]}>(`/users/${user}`)
  }
}
