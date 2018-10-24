<template>
  <base-layout class="bg-secondary window-height">
    <el-row type="flex" justify="center">
      <el-col :span="3">
        <el-button type="warning">EOS</el-button>
        <el-button type="primary">DICE</el-button>
      </el-col>
    </el-row>
    <el-row class="mt-md" type="flex" justify="center" align="middle">
      <el-col :span="8" class="text-light">
        <el-row type="flex" align="middle">
          <el-col :span="3">
            <img class="vertical-middle" style="width: 2rem; height: 2rem" src="/img/poker-chip-icon.svg" />
          </el-col>
          <el-col>
            <span class="inline-block">BET AMOUNT</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="text-light">
        <el-row type="flex" align="middle">
          <el-col :span="3">
            <img class="vertical-middle" style="width: 2rem; height: 2rem" src="/img/poker-chip-icon.svg" />
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
            <el-row class="pa-xs text-white" type="flex" align="bottom">
              <el-col class="text-left" :span="8">
                <span class="inline-block">EOS</span>
              </el-col>
              <el-col class="text-center" :span="8">
                <span class="inline-block text-weight-bold" style="font-size: 1.2rem;">0.0001</span>
              </el-col>
              <el-col class="text-right text-light" :span="8">
                <span class="inline-block">EOS</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col
            class="text-white ml-sm text-center pa-sm"
            style="font-size: 1.3rem;"
            :span="12"
          >
            <el-row type="flex" justify="center">
              <el-col>1/2</el-col>
              <el-col>2X</el-col>
              <el-col>MAX</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="bg-primary round-borders pa-sm ml-sm" :span="6">
        <el-row class="pa-sm text-white" type="flex" align="bottom">
          <el-col class="text-left" :span="5">
            <span class="inline-block">EOS</span>
          </el-col>
          <el-col>
            <span class="inline-block text-weight-bold" style="font-size: 1.2rem;">0.0001</span>
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
                <span class="inline-blocks text-light">ROLL UNDER TO WIN</span>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <span class="inline-blocks" style="font-size: 2rem; font-weight: bold">501</span>
              </div>
            </div>
          </el-col>
          <el-col class="text-center pa-xs">
            <div class="columns">
              <div class="column">
                <span class="inline-blocks text-light">PAYOUT</span>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <span class="inline-blocks" style="font-size: 2rem; font-weight: bold">2.04x</span>
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
                <span class="inline-blocks" style="font-size: 2rem; font-weight: bold">49%</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ma-lg" type="flex" justify="center">
      <el-col :span="14" class="text-center">
        <div class="block">
          <!-- <el-slider class="is-large" :value="50" show-tooltip :step="25" input-size="large" /> -->
          <vue-slider ref="slider2" :value="50" :height="20" :dot-size="25" :interval="25"></vue-slider>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="3" class="text-center">
        <button class="full-width button is-info is-rounded is-medium">
          Login
        </button>
      </el-col>
    </el-row>
    <el-row class="mt-xl" type="flex" justify="center">
      <el-col :span="9" class="bg-primary pa-sm text-center" style="border-radius: 290486px;">
        <el-row type="flex" align="middle">
          <el-col :span="3">
            <img class='vertical-middle app-icon' src="/img/poker-chip-icon.svg" />
          </el-col>
          <el-col class="ml-sm">BetDice</el-col>
        </el-row>
      </el-col>
    </el-row>
  </base-layout>
</template>

<script lang="ts">
import VueSlider from 'vue-slider-component'
import { Component, Vue } from 'vue-property-decorator'
import BaseLayout from '@/components/layouts/Base.vue'

@Component({
  components: {
    BaseLayout,
    VueSlider
  }
})
export default class Home extends Vue {}
</script>
