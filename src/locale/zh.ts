export default {
  payout: 'JKSJD',
  win_chance: 'ILSKJD',
  bet_amount: 'BET AMOUNT ',
  pay_on_win: '##KAL0O AK',
  roll: {
    main: 'ROLL',
    win: 'TO WIN',
    over: '@:roll.main OVER @:roll.win',
    under: '@:roll.main UNDER @:roll.win'
  },
  message: {
    won: 'Your roll number is {0}, you win {1} EOS!',
    lost: 'Your roll number is {0}, you lost',
    transfer_error: 'Unable to make transfer at the moment'
  },
  titles: {
    error: {
      transfer: 'Transfer Error'
    }
  },
  boundary: {
    up: 'OVER',
    down: 'UNDER'
  }
}
