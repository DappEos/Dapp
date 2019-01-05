<style lang="scss">
.nav-list {
  > .col-auto {
    padding: (16px * .9) (16px * .5);
    &:not(:last-child) {
      border-bottom: solid var(--color-secondary);
      border-bottom: solid #052846;
    }
  }
}

.locale-menu {
  .el-submenu__title {
    font-size: 1rem;
    padding: 0px .5rem !important;
    &:hover {
      background: var(--color-primary) !important;
    }
  }
}
</style>

<template>
  <el-aside class="text-white bg-primary full-height">
    <div class="full-height column justify-between">
      <div class="col-auto" @click="hide">
        <div class="nav-list column gutter-y-sm">
          <div
            v-for="({icon, label, link}) in socialMedia"
            :key="icon"
            class="col-auto"
            @click="openUrl(link)"
          >
            <img
              :src="icon"
              style="width: 2rem"
              class="vertical-middle"
            />
            <span class="ml-sm inline-block">{{ label }}</span>
          </div>
          <div class="col-auto" @click="layout.toggleHelp">
            <div>
              <img
                src="/img/md-help.svg"
                style="width: 2rem"
                class="vertical-middle"
              />
              <span class="ml-sm inline-block">{{ $t('how_to_play') }}</span>
            </div>
          </div>
          <div class="col-auto no-padding" @click.stop>
            <el-menu class="bg-primary no-border" ref="menu" menu-trigger="click">
              <el-submenu class="locale-menu" index="a">
                <div class="text-white" slot="title">
                  <img
                    src="/img/md-globe.svg"
                    style="width: 2rem"
                    class="vertical-middle"
                  />
                  <span class="ml-sm inline-block">{{ currentLocale }}</span>
                </div>
                <el-menu-item
                  v-for="(language, key) in langMap"
                  :key="key"
                  :index="language"
                  @click="setLang(key)"
                >
                  {{ language }}
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </div>
      <div class="col-auto" @click="hide">
        <button
          class="full-width button is-info is-rounded is-medium"
        >Login</button>
      </div>
    </div>
    <!-- <div class="pa-md">
    </div> -->
  </el-aside>
</template>

<script lang="ts">
import AuthMixin from '@/mixins/auth'
import Base from '@/components/layouts/Base.vue'
import { Component, Inject, Mixins } from 'vue-property-decorator'

@Component
export default class NavContent extends Mixins(AuthMixin) {

 @Inject('layout')
  private layout?: Base

  private socialMedia: any[] = [
    {
      label: 'Facebook',
      icon: '/img/logo-facebook.svg',
      link: 'https://facebook.com/dappxbet'
    },
    {
      label: 'Twitter',
      icon: '/img/logo-twitter.svg',
      link: 'https://twitter.com/dappxbet'
    },
    {
      label: 'Instagram',
      icon: '/img/logo-instagram.svg',
      link: 'https://instagram.com/dappxbet'
    },
    // {icon: '/img/logo-twitter.svg', label: 'Twitter'},
  ]

  private hide() {
    if (this.layout) {
      this.layout.toggleSideNav()
    }
  }
}
</script>
