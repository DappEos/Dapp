<template>
  <div class="bg-primary pa-md round-borders">
    <el-tabs v-model="activePane" stretch>
      <el-tab-pane class="text-white" label="ALL BETS" name="all_bets">
        <span slot="label" :class="activePane == 'all_bets' ? 'is-active' : 'text-white'">ALL BETS</span>
        <el-table
          class="bg-secondary"
          :data="tableData"
          style="width: 100%"
          :row-class-name="getRowClassName"
        >
          <el-table-column
            prop="date"
            label="Date"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="Address">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="my_bets">
        <span slot="label" :class="activePane == 'my_bets' ? 'is-active' : 'text-white'">MY BETS</span>
      </el-tab-pane>
      <el-tab-pane name="huge_wins">
        <span slot="label" :class="activePane == 'huge_wins' ? 'is-active' : 'text-white'">HUGE WINS</span>
      </el-tab-pane>
      <el-tab-pane name="top_bettors">
        <span slot="label" :class="activePane == 'top_bettors' ? 'is-active' : 'text-white'">TOP BETTORS</span>
      </el-tab-pane>
      <el-tab-pane name="top_rollers">
        <span slot="label" :class="activePane == 'top_rollers' ? 'is-active' : 'text-white'">TOP ROLLERS</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class LogTable extends Vue {
  public tableData: any[] = [{
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }, {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }
  ]

  public activePane: string = 'all_bets'

  public getRowClassName(v: any): string {
    return v.rowIndex % 2 === 0 ? 'bg-indigo' : 'bg-indigo-5';
  }
}
</script>

