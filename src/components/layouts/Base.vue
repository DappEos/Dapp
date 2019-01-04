<template>
  <el-container>
    <el-header class="bg-primary shadow-1">
      <app-bar />
    </el-header>
    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import AppBar from '../navigations/AppBar.vue'
import {Vue, Component} from 'vue-property-decorator'

@Component({
  components: {
    AppBar
  }
})
export default class Base extends Vue {}
</script>
