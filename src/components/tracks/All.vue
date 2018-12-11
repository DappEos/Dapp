<template>
  <div>
    <app-table :data="data" :headers="headers">
      <div slot="col-roll_border" slot-scope="{row}">
        <img
          :src="getArrow(row)"
          class="vertical-middle"
          style="width: 1.5rem;"
        >
        {{ row.roll_border }}
      </div>
      <div slot="col-payout" slot-scope="{row}">
        <div
          :class="`text-${isLost(row) ? 'negative' : 'positive'}`"
        >{{ isLost(row) ? '0' : row.payout }} EOS</div>
      </div>
    </app-table>
  </div>
</template>

<script lang="ts">
import bets from '@/layer/bets';
import AppTable from '@/components/table';
import { TableHeader } from '@/components/table';
import { MD_ARROW_UP,  MD_ARROW_DOWN } from '@/layer/icons';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  components: { AppTable }
})
export default class All extends Vue {
  public data: any[] = [];
  public headers: TableHeader[] = [
    { title: 'Bettor', property: 'bettor' },
    { title: 'Roll Border', property: 'roll_border' },
    { title: 'Bet', property: 'bet_amt' },
    { title: 'Roll', property: 'roll_value' },
    { title: 'Payout', property: 'payout' }
  ];

  protected async getBets() {
    try {
      const { rows } = await bets.getLast30();
      this.data = rows.map((row: {payout: number|string[]}) => {
        row.payout = Number((row.payout as string[])[0].split(' ')[0]);
        return row;
      });
    } catch (e) {}
  }

  protected getArrow(row: {roll_type: number}) {
    return row.roll_type == 2 ? MD_ARROW_UP : MD_ARROW_DOWN
  }

  protected isLost(row: { payout: number }) {
    return row.payout === 0;
  }

  protected mounted() {
    this.getBets();
  }

  @Watch('$store.state.user')
  protected watchUserChanged() {
    this.getBets();
  }
}
</script>
