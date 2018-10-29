<template>
  <div>
    <app-table :data="data" :headers="headers">
      <div slot="col-bettors" slot-scope="prop">
        <div>{{ prop.row }}</div>
      </div>
    </app-table>
  </div>
</template>

<script lang="ts">
import AppTable from '@/components/table'
import { Vue, Component } from 'vue-property-decorator'
import { TableHeader } from '@/components/table'

@Component({
  components: {AppTable}
})
export default class All extends Vue {
  public data: any[] = [
    {bettor: 'yinka'},
    {bettor: 'yinka'},
    {bettor: 'yinka'},
    {bettor: 'yinka'},
  ];
  public headers: TableHeader[] = [
    {title: 'Bettor', property: 'bettor'},
    {title: 'Roll Under', property: 'roll_under'},
    {title: 'Bet', property: 'bet'},
    {title: 'Roll', property: 'roll'},
    {title: 'Payout', property: 'payout'},
  ];
}
</script>
