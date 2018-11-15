<template>
  <div>
    <el-dialog
      widths="42%"
      title="How To Play"
      top="5vh"
      custom-class="help-dialog bg-secondary text-white"
      :visible="value"
      :before-close="close"
      center
    >
      <div class="text-white px-md">
        <ol>
          <li>
            <p>Ensure you have an <b>EOS</b> account. For a tutorial on how to create one, <a href="https://youtu.be/0k9U-VuYkeM" target="_blank">click here</a>.</p>
          </li>
          <li>
            <p>If you haven't already, download and install Scatter, an <b>EOS Wallet</b> that facilitates between users and dApps. Please <a href="https://get-scatter.com/" target="_blank">click here</a> to install Scatter.</p>
          </li>
          <li>
            <p>Click on the Login button on the navigation bar or on the game page to login through scatter.</p>
          </li>
          <li>
            <p>Set your desirable <b>BET AMOUNT</b>. This is the amount of <b>EOS</b> you will be waggering.</p>
          </li>
          <li>
            <p>Adjust the slider to change your chance of winning.</p>
          </li>
          <li>
            <p>Click <b>Roll Dice</b> to place your Bet.</p>
          </li>
          <li>
            <p>If the dice number rolled is lower than your <b>ROLL UNDER TO WIN</b> number, then you win and get the payout.</p>
          </li>
        </ol>
        <p>By our unique <b>Encryption</b> technology, the game is run on an EOS Smart Contract . It is proved to be fair and cannot be cheated and changed by any means. All results are provablely fair and can be verified.</p>
        <p>If you have any questions , you could join our <a href="https://t.me" target="_blank">Telegram</a> group for help.</p>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component({
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
})
export default class Help extends Vue {

  public close(done: () => void) {
    done()
    this.$emit('input', false)
  }
}
</script>

<style lang="scss">
.help-dialog {
  > .el-dialog__header {
    > .el-dialog__title {
      color: white !important;
    }
  }
}
</style>
