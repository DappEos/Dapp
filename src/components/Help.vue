<template>
  <div>
    <el-dialog
      width="42%"
      title="How To Play"
      custom-class="help-dialog bg-secondary text-white"
      :visible="value"
      :before-close="close"
      center
    >
      <div class="text-white pa-md">
        <ol>
          <li>
            <p>Make sure you have an EOS account. For a on how to create one, click here.</p>
          </li>
          <li>
            <p>If you haven't already, download and install Scatter, an EOS wallet that facilitates between users and dApps. Click here for a tutoral.</p>
          </li>
          <li>
            <p>Set your BET AMOUNT. This is the amount of EOS you will be waggering.</p>
          </li>
          <li>
            <p>Adjust the slider to change your chance of winning.</p>
          </li>
        </ol>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component({
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
})
export default class Help extends Vue {

  public close(done: () => void) {
    done()
    this.$emit('input', false)
  }
}
</script>

<style lang="scss">
.help-dialog {
  > .el-dialog__header {
    > .el-dialog__title {
      color: white !important;
    }
  }
}
</style>
