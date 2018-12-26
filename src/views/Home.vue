<template>
  <base-layout class="bg-secondary window-height">
    <div class="row justify-center">
      <div class="pa-sm text-white round-borders bg-primary col-auto">
        <i class="el-icon-tickets mr-sm" style="font-size: 1.2rem;" />
        <span class="text-weight-bold">{{ balance }}</span>
        <span class="text-light ml-sm">EOS</span>
      </div>
    </div>
    <el-row class="mt-md" type="flex" justify="center" align="middle">
      <el-col :span="8" :xs="15" class="text-light">
        <el-row type="flex" align="middle">
          <el-col :span="3">
            <img class="vertical-middle" style="width: 2rem; height: 2rem" src="/img/poker-chip-icon.svg" />
          </el-col>
          <el-col>
            <span class="inline-block">BET AMOUNT</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" :xs="9" class="text-light">
        <el-row type="flex" align="middle">
          <el-col :span="3">
            <eos-logo class="ml-sm" :width="17" :height="25" fill="white" />
          </el-col>
          <el-col>
            <span class="inline-block">PAYOUT ON WIN</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="my-xs" type="flex" align="middle" justify="center">
      <el-col class="bg-primary round-borders pa-xs" :span="8">
        <el-row class="round-borders" type="flex" align="middle">
          <el-col class="pa-sm round-borders bg-blue-grey-6">
            <el-row class="px-xs text-white" type="flex" align="bottom">
              <el-col class="text-left" :span="5">
                <eos-logo :width="17" :height="25" fill="white" />
              </el-col>
              <el-col class="text-center" :span="14">
                <el-input
                  class="amount-input"
                  v-model="betAmount"
                  :disabled="rolling"
                />
              </el-col>
              <el-col class="text-right text-light" :span="5">
                <span class="inline-block">EOS</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col
            class="text-white ml-sm text-center pa-sm"
            style="font-size: 1.3rem;"
            :span="12"
          >
            <el-row class="cursor-pointer" type="flex" justify="center">
              <el-col class="pr-sm">
                <el-button
                  class="bg-primary text-white"
                  size="small"
                  @click="multiplyBet(0.5)"
                  :disabled="rolling"
                >1/2</el-button>
              </el-col>
              <el-col class="pl-sm pr-sm border-lr-secondary">
                <el-button
                  class="bg-primary text-white"
                  size="small"
                  @click="multiplyBet(2)"
                  :disabled="rolling"
                >2X</el-button>
              </el-col>
              <el-col class="pl-sm">
                <el-button
                  class="bg-primary text-white"
                  size="small"
                  @click="setMaxAmount()"
                  :disabled="rolling"
                >MAX</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="bg-primary round-borders pa-sm ml-sm" :span="6">
        <el-row class="pa-sm text-white" type="flex" align="bottom">
          <el-col class="text-left" :span="5">
            <eos-logo :width="17" :height="25" fill="white" />
          </el-col>
          <el-col>
            <span class="inline-block amount-text">{{ payoutOnWin }}</span>
            <span class="ml-sm inline-block text-light">EOS</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="my-lg" type="flex" justify="center">
      <el-col class="bg-primary pa-sm round-borders" :span="14">
        <el-row class="text-white pa-sm" type="flex" align="middle">
          <el-col class="text-center pa-xs">
            <div class="columns">
              <div class="column">
                <span class="inline-blocks text-light">
                  ROLL {{ below ? 'UNDER' : 'OVER' }} TO WIN
                </span>
              </div>
            </div>
            <div class="row justify-center">
              <div class="col-auto">
                <span  class="vertical-middle" style="font-size: 2rem; font-weight: bold">
                  {{ currentThreshold }}
                </span>
                <span>
                  <img
                    :src="`/img/md-arrow-round-${below ? 'down' : 'up'}.svg`"
                    class="vertical-middle"
                    style="width: 2rem"
                  />
                </span>
              </div>
            </div>
          </el-col>
          <el-col class="border-lr-secondary text-center pa-xs">
            <div class="columns">
              <div class="column">
                <span class="inline-blocks text-light">PAYOUT</span>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <span class="inline-blocks" style="font-size: 2rem; font-weight: bold">
                  {{ payout }}
                </span>
              </div>
            </div>
          </el-col>
          <el-col class="text-center pa-xs">
            <div class="columns">
              <div class="column">
                <span class="inline-blocks text-light">WIN CHANCE</span>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <span class="inline-blocks" style="font-size: 2rem; font-weight: bold">
                  {{ below ? currentThreshold : 99 - currentThreshold }}%
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="mt-md row justify-center">
      <div class="col-auto">
        <el-button
          :class="getClass(!below)"
          @click="below = false"
          class="text-white"
          size="small"
          :disabled="rolling"
        >
          <img
            src="/img/md-arrow-round-up.svg"
            class="vertical-middle"
            style="width: 1rem"
          /> {{ $t('boundary.up') }}
        </el-button>
        <el-button
          :class="getClass(below)"
          @click="below = true"
          class="text-white"
          size="small"
          :disabled="rolling"
        >
          <img
            src="/img/md-arrow-round-down.svg"
            class="vertical-middle"
            style="width: 1rem"
          /> {{ $t('boundary.down') }}
        </el-button>
      </div>
    </div>
    <el-row class="ma-lg px-md" type="flex" justify="center">
      <el-col :span="15" style="border-radius: 45px;" class="pa-md text-center bg-primary">
        <div class="block">
          <threshold-picker :disabled="rolling" />
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="3" class="text-center">
        <button
          v-if="!currentUser"
          class="full-width button is-info is-rounded is-medium"
          @click="login"
        >Login</button>
        <button
          v-else
          class="full-width button is-success is-rounded is-medium"
          :disabled="rolling"
          @click="roll"
        >
          <i v-if="rolling" class="el-icon-loading" />
          <span class="ml-sm">Roll</span>
        </button>
      </el-col>
    </el-row>
    <el-row class="mt-xl" type="flex" justify="center">
      <el-col :span="9" class="bg-primary pa-sm" style="border-radius: 290486px;">
        <el-row type="flex" align="middle">
          <el-col :span="3">
            <img class='vertical-middle app-icon' src="/img/poker-chip-icon.svg" />
          </el-col>
          <el-col :span="18" class="ml-sm text-white">
            <div>Bet to get: <span class="inline-block text-bold" style="font-size: 1.5rem;">0.0001</span> DICE</div>
            <div class="text-amber-8">Bet now for FREE tokens 100% DICE</div>
          </el-col>
          <el-col :span="2" class="text-right cursor-pointer" @click.native="showHelp">
            <img
              src="/img/ios-help-circle-outline.svg"
              class="vertical-middle"
              style="width: 2rem"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <tracks class="mt-md" />
  </base-layout>
</template>

<script lang="ts">
import AuthMixin from '@/mixins/auth'
import { SHOW_HELP } from '@/constants'
import { Notification } from 'element-ui'
import Tracks from '@/components/Tracks.vue'
import EosLogo from '@/components/icons/eos-logo.vue'
import BaseLayout from '@/components/layouts/Base.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import ThresholdPicker from '@/components/ThresholdPicker.vue'
import { mapGetters } from 'vuex'

@Component({
  mixins: [AuthMixin],
  components: {
    Tracks,
    EosLogo,
    BaseLayout,
    ThresholdPicker
  }
})
export default class Home extends Vue {

  private betAmount: number = 1;
  private rolling = false;
  private below = false;
  private pending = null;

  get accountName(): string {
    return this.$store.getters.accountName
  }

  get currentThreshold() {
    return this.$store.state.threshold
  }

  get payout() {
    return this.below
      ? Math.floor(98 / this.currentThreshold * 10000) / 10000
      : Math.floor(98 / (99 - this.currentThreshold) * 10000) / 10000
  }

  get payoutOnWin() {
    return this.below
      ? Math.floor(98 / this.currentThreshold * this.betAmount * 10000) / 10000
      : Math.floor(98 / (99 - this.currentThreshold) * this.betAmount * 10000) / 10000
  }

  get balance() {
    return this.$store.state.balance as number
  }

  public showHelp() {
    this.$root.$emit(SHOW_HELP)
  }

  private getClass(v: boolean) {
    return v ? 'bg-info' : 'bg-primary'
  }

  private async roll() {
    try {
      this.rolling = true
      const range = this.currentThreshold
      const memo = `${this.below ? 1 : 2},${range},diceinviters`
      const $this = this as any
      await $this.createTransfer(this.betAmount, memo)
      const id = setInterval(async () => {
        const {rows} = await $this.getUserBets()
        this.$root.$emit('refresh')
        for (const row of rows) {
          const found = row.bettor === this.accountName &&
            row.roll_border == this.currentThreshold &&
            (row.roll_value < 100 && row.roll_border == range)
          if (found) {
            clearInterval(id)
            this.rolling = false
            if ((row.roll_type == 1 && row.roll_value < row.roll_border) ||
              (row.roll_type == 2 && row.roll_value > row.roll_border)) {
              this.notify(row, true)
            } else {
              this.notify(row, false)
            }
            $this.getBalance()
            break
          }
        }
      }, 2000)
    } catch (e) {
      if (e.code === 402) {
        Notification.info({
          title: 'Transfer denied',
          message: ''
        })
      } else {
        Notification.error({
          title: this.$t('titles.error.transfer') as string,
          message: this.$t('message.transfer_error') as string
        })
      }
      this.rolling = false
    }
  }

  private notify(row: {roll_value: number, payout: string[]}, won: boolean) {
    const {payout, roll_value} = row
    if (won) {
      Notification.success({
        title: this.$t('Congratulation!') as string,
        message: this.$t('message.won', [roll_value, payout]) as string,
      })
    } else {
      Notification.error({
        title: this.$t('You Lost') as string,
        message: this.$t('message.lost', [roll_value]) as string
      })
    }
  }

  private multiplyBet(by: number) {
    this.betAmount *= by;
    if (process.env.NODE_ENV !== 'development' &&
      this.betAmount > this.balance) {
      this.betAmount = this.balance;
    }
  }

  private setMaxAmount() {
    this.betAmount = this.balance
  }
}
</script>
