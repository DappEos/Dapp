<template>
  <el-row type="flex" class="pa-sm full-height" align="middle">
    <el-col class="app-name text-white">
      <el-row type="flex" align="middle">
        <el-col :span="3">
          <img class='vertical-middle app-icon' src="/img/poker-chip-icon.svg" />
        </el-col>
        <el-col class="ml-sm">BetDice</el-col>
      </el-row>
    </el-col>
    <el-col class="text-white">
      <el-row type="flex">
        <el-col>
          <el-button type="primary" icon="el-icon-star-on" size="small" circle />
          <span class="mr-md" />
          <el-button type="primary" icon="el-icon-star-on" size="small" circle />
        </el-col>
        <el-col>
          <el-button type="primary" size="small">Lucky Draw</el-button>
        </el-col>
        <el-col>
          <el-button class="text-white" type="text" size="small">
              English <i class="el-icon-arrow-down el-icon-right"></i>
          </el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col>
      <el-row type="flex" justify="end">
        <el-col :span="4">
          <el-button class="text-white" type="text" size="small">Invite</el-button>
        </el-col>
        <el-col :span="6">
          <el-button class="text-white" type="text" size="small">How to play?</el-button>
        </el-col>
        <el-col :span="4">
          <el-button class="text-white" type="text" size="small">DICE</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small">Login</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class AppBar extends Vue {

}
</script>

<style lang="scss">
img.app-icon {
  width: 4rem !important;
  height: 4rem !important;
}

.app-name {
  font-size: 2rem;
}
</style>
