<template>
  <div>
    <app-table v-if="currentUser" :data="data" :headers="headers">
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
    <el-alert
      v-else
      title="Unavailable"
      type="error"
      description="You need to sign to view your statistics!"
      show-icon
    />
  </div>
</template>

<script lang="ts">
import bets from '@/layer/bets'
import AuthMixin from '@/mixins/auth'
import TrackMixin from '@/mixins/track'
import AppTable from '@/components/table'
import { Notification } from 'element-ui'
import { TableHeader } from '@/components/table'
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({
  mixins: [AuthMixin, TrackMixin],
  components: {AppTable}
})
export default class All extends Vue {
  private data: any[] = [];

  private headers: TableHeader[] = [
    // { title: 'Bettor', property: 'bettor' },
    { title: 'Roll Border', property: 'roll_border' },
    { title: 'Bet', property: 'bet_amt' },
    { title: 'Roll', property: 'roll_value' },
    { title: 'Payout', property: 'payout' }
  ];

  @Watch('currentUser', {immediate: true})
  private watchUser(newVal: any) {
    if (newVal) {
      this.history()
    }
  }

  private async history() {
    try {
      const $this = this as any
      const result = await $this.getUserBets()
      this.data = result.rows.map($this.formatPayout)
    } catch (e) {
      Notification({
        type: 'error',
        duration: 3000,
        title: 'Error',
        message: 'Unable to fetch statistics!'
      })
    }
  }

  private mounted() {
    this.$root.$on('refresh', () => this.history())
  }
}
</script>
