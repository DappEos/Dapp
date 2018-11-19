<template>
  <vue-slider
    ref="slider"
    :min="1"
    :max="100"
    :height="20"
    :dot-size="25"
    piecewise-label
    :disabled="disabled"
    @input="setThreshold"
    :value="sliderValue"
    :label-style="{color: 'white'}"
    :bg-style="{background: '#f02c67'}"
    :labelActiveStyle="{color: 'var(--color-info)'}"
    :process-style="{background: '#03f53c'}"
  >
    <template slot="label" slot-scope="{label, active}">
      <span
        v-if="label == 1 || label % 25 === 0"
        class="vue-slider-piecewise-label text-white"
        :style="{color: labelColor(active)}"
      >
        {{ label == 0 ? 1 : label }}
      </span>
    </template>
  </vue-slider>
</template>

<script lang="ts">
import VueSlider from 'vue-slider-component'
import {Vue, Component, Prop} from 'vue-property-decorator'
import { SET_THRESHOLD } from '@/store/mutation-types';

@Component({
  components: {VueSlider}
})
export default class ThresholdPicker extends Vue {
  protected sliderValue: number = 50

  @Prop() protected disabled: boolean = false

  get threshold() {
    return this.$store.state.threshold
  }

  protected labelColor(active: boolean) {
    return active ? 'var(--color-info) !important' : ''
  }

  protected setThreshold(val: number) {
    this.$nextTick(() => {
      if (val > 3 && val < 97) {
        this.sliderValue = val
      } else {
        this.sliderValue = val < 4 ? 4 : 96
      }
      (this.$refs.slider as any).setValue(this.sliderValue)
      if (this.threshold !== this.sliderValue) {
        this.$store.commit(SET_THRESHOLD, this.sliderValue)
      }
    })
  }
}
</script>
