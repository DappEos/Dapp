import { MD_ARROW_UP,  MD_ARROW_DOWN } from '@/layer/icons'

export default {
  methods: {
    getArrow(row: {roll_type: number}) {
      return row.roll_type == 2 ? MD_ARROW_UP : MD_ARROW_DOWN
    },
    isLost: (row: { payout: number }) => row.payout === 0,
    formatPayout: (row: {payout: number|string[]}) => {
      row.payout = Number((row.payout as string[])[0].split(' ')[0]);
      return row;
    }
  }
}
