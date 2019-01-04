<template>
  <div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-11 col-md-8 col-lg-8">
        <el-tabs v-model="activePane">
          <el-tab-pane class="text-white" label="ALL BETS" name="all_bets">
            <span slot="label" :class="isActiveClass('all_bets')">
              {{ $t('message.all_bets') }}
            </span>
            <all-track />
          </el-tab-pane>
          <el-tab-pane name="my_bets">
            <span slot="label" :class="isActiveClass('my_bets')">
              {{ $t('message.my_bets') }}
            </span>
            <my-bets />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
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

