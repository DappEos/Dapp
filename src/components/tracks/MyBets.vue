<template>
  <div>
    <app-table v-if="currentUser" :data="data" :headers="headers">
      <div slot="col-won" slot-scope="{row}">
        <div
          :class="`text-${row.roll > row.per ? 'negative' : 'positive'}`"
        >
          {{ row.won }}
        </div>
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
import AppTable from '@/components/table'
import { Vue, Component, Watch } from 'vue-property-decorator'
import { TableHeader } from '@/components/table'
import { Notification } from 'element-ui';

@Component({
  mixins: [AuthMixin],
  components: {AppTable}
})
export default class All extends Vue {
  private data: any[] = [];

  private headers: TableHeader[] = [
    {title: 'Roll Under', property: 'per'},
    {title: 'Bet', property: 'bet'},
    {title: 'Roll', property: 'roll'},
    {title: 'Won', property: 'won'},
  ];

  @Watch('currentUser')
  private watchUser(newVal: any) {
    if (newVal) {
      this.getBets()
    }
  }

  private async getBets() {
    if (!(this as any).currentUser) {
      return
    }
    try {
      const {data} = await bets.getForUser('eos4betprime')
      this.data = data.RecentBets
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
    this.getBets()
  }
}
</script>
