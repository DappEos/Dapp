<template>
  <base-layout class="bg-secondary window-height">
    <div class="row justify-center">
      <div class="pa-sm text-white round-borders bg-primary col-auto">
        <i class="el-icon-tickets mr-sm" style="font-size: 1.2rem;" />
        <span class="text-weight-bold">{{ balance }}</span>
        <span class="text-light ml-sm">EOS</span>
      </div>
    </div>

    <div class="mt-md row justify-center">
      <div class="col-xs-12 col-sm-11 col-md-8 col-lg-8">
        <div class="text-light row">
          <div class="col-xs-12 col-sm-11 col-md-7 col-lg-7">
            <div class="column gutter-y-xs">
              <div class="col-auto">
                <div class="row gutter-x-xs items-center">
                  <div class="col-auto">
                    <img class="vertical-middle" style="width: 2rem; height: 2rem" src="/img/poker-chip-icon.svg" />
                  </div>
                  <div class="col-auto">
                    <span class="inline-block">{{ $t('bet_amount') }}</span>
                  </div>
                </div>
              </div>

              <div class="col-auto">
                <div class="bg-primary round-borders pa-sm">
                  <div class="row items-center">
                    <div class="bg-blue-grey-6 round-borders col-12 col-lg-6">
                      <div class="pa-sm row justify-between items-end">
                        <div class="col-1">
                          <eos-logo
                            fill="white"
                            class="mb-xs vertical-middle"
                            :width="17"
                            :height="25"
                          />
                        </div>
                        <div class="col-8">
                          <el-input
                            class="amount-input"
                            v-model="betAmount"
                            :disabled="rolling"
                          />
                        </div>
                        <div class="text-light col-2">EOS</div>
                      </div>
                    </div>
                    <div class="col-12 col-lg-6">
                      <div class="pt-sm row justify-center">
                        <div class="pr-sm">
                          <el-button
                            class="bg-primary text-white"
                            size="small"
                            @click="multiplyBet(0.5)"
                            :disabled="rolling"
                          >1/2</el-button>
                        </div>
                        <div class="pl-sm pr-sm border-lr-secondary">
                          <el-button
                            class="bg-primary text-white"
                            size="small"
                            @click="multiplyBet(2)"
                            :disabled="rolling"
                          >2X</el-button>
                        </div>
                        <div class="pl-sm">
                          <el-button
                            class="bg-primary text-white"
                            size="small"
                            @click="setMaxAmount()"
                            :disabled="rolling"
                          >MAX</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xs-12 col-sm-11 col-md-5 col-lg-5">
            <div class="column gutter-y-xs">
              <div class="col-auto">
                <div class="row gutter-x-xs items-center">
                  <div class="col-auto">
                    <eos-logo class="ml-sm" :width="17" :height="25" fill="white" />
                  </div>
                  <div class="col-auto">{{ $t('pay_on_win') }}</div>
                </div>
              </div>
              <div class="col-auto">
                <div class="bg-primary round-borders pa-xs">
                  <div class="pa-sm py-md text-white row gutter-x-xs">
                    <div class="col-2">
                      <eos-logo :width="17" :height="25" fill="white" />
                    </div>
                    <div class="col-auto">
                      <span class="inline-block amount-text">{{ payoutOnWin }}</span>
                      <span class="ml-sm inline-block text-light">EOS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-lg px-xs row justify-center">
      <div class="bg-primary pa-sm round-borders col-xs-12 col-sm-11 col-md-8 col-lg-8">
        <div class="text-white pa-sm row items-center">

          <div class="text-center col-xs-12 col-md-4 col-lg-4">
            <div class="column gutter-y-xs">
              <div class="col-auto">
                <span class="inline-blocks text-light">
                  {{ $t(`roll.${below ? 'under' : 'over'}`) }}
                </span>
              </div>
              <div class="col-auto">
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
              </div>
            </div>
          </div>

          <div
            class="py-sm lt-md border-b-secondary full-width"
            style="height: 1px !important;"
          />

          <div class="border-lr-secondary text-center pa-xs col-xs-12 col-md-4 col-lg-4">
            <div class="column gutter-y-xs">
              <div class="col-auto">
                <span class="inline-blockss text-light">{{ $t('payout') }}</span>
              </div>
              <div class="col-auto">
                <span class="inline-blocks" style="font-size: 2rem; font-weight: bold">
                  {{ payout }}
                </span>
              </div>
            </div>
          </div>

          <div
            class="py-sm lt-md border-t-secondary full-width"
            style="height: 1px !important;"
          />

          <div class="text-center pa-xs col-xs-12 col-md-4 col-lg-4">
            <div class="column gutter-y-xs">
              <div class="col-auto">
                <span class="inline-blocks text-light">{{ $t('win_chance') }}</span>
              </div>
              <div class="col-auto">
                <span class="inline-blocks" style="font-size: 2rem; font-weight: bold">
                  {{ below ? currentThreshold : 99 - currentThreshold }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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

    <div class="my-lg row justify-center">
      <div
        style="border-radius: 2.8125rem;"
        class="pa-md text-center bg-primary col-xs-12 col-sm-11 col-md-8 col-lg-8">
        <div class="block">
          <threshold-picker :disabled="rolling" />
        </div>
      </div>
    </div>

    <div class="row justify-center">
      <div class="text-center col-xs-6 col-sm-5 col-md-4 col-lg-2">
        <button
          v-if="!currentUser"
          class="full-width button is-info is-rounded is-medium"
          @click="login"
        >Login</button>
        <button
          v-else
          class="gt-sm full-width button is-success is-rounded is-medium"
          :disabled="rolling"
          @click="roll"
        >
          <i v-if="rolling" class="el-icon-loading" />
          <span class="ml-sm">{{ $t('message.roll') }}</span>
        </button>
      </div>
    </div>

    <div class="fixed-bottom ma-sm lt-md" style="z-index: 1000;">
      <button
        class="full-width button is-success is-rounded is-medium"
        :disabled="rolling"
        @click="roll"
      >
        <i v-if="rolling" class="el-icon-loading" />
        <span class="ml-sm">{{ $t('message.roll') }}</span>
      </button>
    </div>


    <!-- <div class="mt-xl row justify-center">
      <div
        class="bg-primary pa-sm col-xs-10 col-sm-8 col-md-7 col-lg-4"
        style="border-radius: 290486px;"
      >
        <div class="row justify-between items-center">
          <div class="col-auto">
            <img class='vertical-middle app-icon' src="/img/poker-chip-icon.svg" />
          </div>
          <div class="text-white col-9">
            <div>Bet to get: <span class="inline-block text-bold" style="font-size: 1.5rem;">0.0001</span> DICE</div>
            <div class="text-amber-8">Bet now for FREE tokens 100% DICE</div>
          </div>
          <div
            class="text-right pr-sm cursor-pointer col-auto"
            @click="showHelp"
          >
            <img
              src="/img/ios-help-circle-outline.svg"
              class="vertical-middle"
              style="width: 2rem"
            />
          </div>
        </div>
      </div>
    </div> -->

    <tracks class="mt-md" />

    <div class="lt-md mt-xl" />
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
          title: this.$t('titles.error.denied') as string,
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
