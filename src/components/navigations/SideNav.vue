<template>
  <transition
    enter-active-class="animated"
    leave-active-class="animated"
  >
    <div
      v-show="showOverlay"
      :class="{dimmed: showNav}"
      class="fixed window-width window-height z-top"
      @click.self="hide"
    >
      <transition
        enter-active-class="animated secs-500 slideInLeft"
        leave-active-class="animated secs-500 slideOutLeft"
        @after-leave="hide"
      >
        <div v-show="showNav" class="fixed full-height z-max">
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { debounce } from '@/utils'
import { Vue, Component, Model, Watch } from 'vue-property-decorator'

@Component
export default class SideNav extends Vue {

  @Model('input', {type: Boolean})
  private showNav = false
  private showOverlay = false
  private resizeCallback?: (...args: any[]) => void;

  @Watch('showNav')
  protected watchModel(val: boolean) {
    this.$nextTick(() => {
      this.showOverlay = val
    })
  }

  private mounted() {
    this.resizeCallback = debounce((e: Event) => this.shouldShowNav(e))
    window.addEventListener('resize', this.resizeCallback)
  }

  private destroyed() {
    window.removeEventListener('resize', this.resizeCallback as any)
  }

  private hide() {
    this.$emit('input', false)
    this.$emit('change', false)
  }

  private shouldShowNav(e: Event) {
    if (screen.availWidth > 770 && this.shouldShowNav) {
      this.hide()
    }
  }
}
</script>
