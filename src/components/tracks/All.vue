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
import bets from '@/layer/bets'
import TrackMixin from '@/mixins/track'
import AppTable from '@/components/table'
import { TableHeader } from '@/components/table'
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({
  mixins: [TrackMixin],
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
      this.data = rows.map((this as any).formatPayout);
    } catch (e) {}
  }

  @Watch('$store.state.user', {immediate: true})
  protected watchCurrentUser(newVal: any) {
    if (newVal) {
      this.getBets();
    }
  }

  protected mounted() {
    this.$root.$on('refresh', () => this.getBets())
  }
}
</script>
