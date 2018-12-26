<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="14" :sm="15" :xs="20">
        <el-tabs v-model="activePane">
          <el-tab-pane class="text-white" label="ALL BETS" name="all_bets">
            <span slot="label" :class="isActiveClass('all_bets')">ALL BETS</span>
            <all-track />
          </el-tab-pane>
          <el-tab-pane name="my_bets">
            <span slot="label" :class="isActiveClass('my_bets')">MY BETS</span>
            <my-bets />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import AllTrack from '@/components/tracks/All.vue'
import MyBets from '@/components/tracks/MyBets.vue'
import {Vue, Component} from 'vue-property-decorator'

@Component({
  components: {
    MyBets,
    AllTrack
  }
})
export default class Tracks extends Vue {
  public activePane: string = 'all_bets'

  public isActiveClass(pane: string) {
    return this.activePane === pane ? 'is-active' : 'text-white'
  }
}
</script>

