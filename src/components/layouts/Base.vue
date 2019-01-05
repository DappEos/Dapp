<template>
  <el-container>
    <el-header class="bg-primary shadow-1">
      <app-bar />
    </el-header>

    <side-nav v-model="showSideNav">
      <nav-content />
    </side-nav>

    <el-main>
      <slot />
    </el-main>

    <help-modal v-model="showHelp" />
  </el-container>
</template>

<script lang="ts">
import HelpModal from '@/components/Help.vue'
import AppBar from '@/components/navigations/AppBar.vue'
import SideNav from '@/components/navigations/SideNav.vue'
import NavContent from '@/components/navigations/NavContent.vue'
import {Vue, Component, Provide} from 'vue-property-decorator'

@Component({
  components: {
    AppBar,
    SideNav,
    HelpModal,
    NavContent
  }
})
export default class Base extends Vue {

  protected showHelp = false
  protected showSideNav = false

 @Provide('layout')
  private layout = this

  public toggleHelp() {
    this.showHelp = !this.showHelp
  }

  public toggleSideNav() {
    this.showSideNav = !this.showSideNav
  }
}
</script>
