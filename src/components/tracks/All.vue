<template>
  <div>
    <app-table :data="data" :headers="headers">
      <div slot="col-payout" slot-scope="{row}">
        <div
          :class="`text-${isLost(row) ? 'negative' : 'positive'}`"
        >
          {{ isLost(row) ? '' : row.payout }}
        </div>
      </div>
    </app-table>
  </div>
</template>

<script lang="ts">
import bets from '@/layer/bets'
import AppTable from '@/components/table'
import { Vue, Component } from 'vue-property-decorator'
import { TableHeader } from '@/components/table'

@Component({
  components: {AppTable}
})
export default class All extends Vue {
  public data: any[] = [];
  public headers: TableHeader[] = [
    {title: 'Bettor', property: 'bettor'},
    {title: 'Roll Under', property: 'percentage'},
    {title: 'Bet', property: 'bet_amt'},
    {title: 'Roll', property: 'random_roll'},
    {title: 'Payout', property: 'payout'},
  ];

  async getBets() {
    try {
      const {data} = await bets.getLast30()
      this.data = data
    } catch (e) {

    }
  }

  isLost(row: {random_roll: number, percentage: number}) {
    return row.random_roll > row.percentage
  }

  mounted() {
    this.getBets()
  }
}
</script>
