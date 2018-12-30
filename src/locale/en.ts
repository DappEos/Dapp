export default {
  payout: 'PAYOUT',
  win_chance: 'WIN CHANCE',
  bet_amount: 'BET AMOUNT ',
  pay_on_win: 'PAYOUT ON WIN',
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
