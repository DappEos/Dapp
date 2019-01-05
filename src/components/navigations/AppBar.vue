<template>
  <div>
    <div class="row items-center gutter-sm justify-between no-wrap scroll">
      <div class="app-name text-white col-auto">
        <div class="flex items-center">
          <div class="col-auto">
            <img class='vertical-middle app-icon' src="/img/poker-chip-icon.svg" />
          </div>
          <div class="col-auto">BetDice</div>
        </div>
      </div>
      <div class="lt-md col-auto">
        <el-button class="transparent" @click="toggleSide">
          <i class="el-icon-menu text-white" style="font-size: 1.2rem" />
        </el-button>
      </div>
      <div class="gt-sm text-white col-auto">
        <div class="row items-center">
          <div class="col-auto">
            <el-button
              class="vertical-middle"
              type="primary"
              size="small"
              circle
              @click="openUrl('https://facebook.com/dappxbet')"
            >
              <img src="/img/logo-facebook.svg" style="width: 1.3rem" />
            </el-button>
            <el-button
              class="vertical-middle"
              type="primary"
              size="small"
              circle
              @click="openUrl('https://medium.com/@dappxbet.com')"
            >
              <span class="text-weight-bold" style="font-size: 1.3rem">M</span>
            </el-button>
            <el-button
              class="vertical-middle"
              type="primary"
              size="small"
              circle
              @click="openUrl('https://instagram.com/dappxbet')"
            >
              <img src="/img/logo-instagram.svg" style="width: 1.3rem" />
            </el-button>
            <span class="mr-sm" />
            <el-button
              class="vertical-middle"
              type="primary"
              size="small"
              circle
              @click="openUrl('https://twitter.com/dappxbet')"
            >
              <img src="/img/logo-twitter.svg" style="width: 1.2rem" />
            </el-button>
          </div>
          <!-- <div class="col-auto">
            <el-button type="primary" size="small">Lucky Draw</el-button>
          </div> -->
        </div>
      </div>
      <div class="gt-sm col-auto">
        <div class="row gutter-xs items-center justify-end">
          <!-- <div class="col-auto">
            <el-button class="text-white" type="text" size="small">Invite</el-button>
          </div> -->
          <div class="col-auto">
            <el-button
              class="text-white"
              type="text"
              size="small"
              @click="layout.toggleHelp"
            >{{ $t('how_to_play') }}?</el-button>
          </div>
          <div class="col-auto">
            <el-dropdown class="cursor-pointer" @command="setLang" trigger="click">
              <span class="text-white">
                {{ currentLocale }} <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(index) in Object.keys(langMap)"
                  :key="index"
                  :command="index"
                >{{ langMap[index] }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="col-auto">
            <el-popover
              ref="popover"
              v-if="!currentUser"
              popper-class="bg-primary no-border"
              placement="bottom"
              trigger="click"
              v-model="showProviders"
              :visible-arrow="false"
              @hide="$nextTick(() => $refs.providers.clear())"
            >
              <providers ref="providers" @input="signIn" />

              <el-button slot="reference" type="primary" size="small">
                <span class="inline-block vertical-middle">
                  <img src="/img/ios-person.svg" style="width: 1rem" />
                </span>
                <span class="text-weight-bold ml-sm mr-sm inline-block vertical-middle">Login</span>
              </el-button>
            </el-popover>
            <el-button v-else type="primary" size="small" @click="logout">
              <span class="text-weight-bold vertical-middle">Log out</span>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {CreateElement} from 'vue'
import { SHOW_HELP } from '@/constants'
import { Vue, Component, Inject, Mixins } from 'vue-property-decorator'
import AuthMixin from '@/mixins/auth'
import Base from '@/components/layouts/Base.vue';

@Component({
  components: {
    Providers: {
      data: () => ({value: null}),
      methods: {
        clear() {
          (this as any).value = null
        }
      },
      render(h: CreateElement) {
        const $this = this as any
        const input = (value: any) => {
          $this.value = value
          this.$emit('input', value)
        }

        return h('div', [
          h('el-radio', {
            class: 'text-white',
            on: {input},
            props: {
              label: 'EOS',
              value: $this.value,
            }
          }),
          h('el-radio', {
            class: 'text-white',
            on: {input},
            props: {
              label: 'JUNGLE',
              value: $this.value
            }
          }),
        ])
      }
    }
  }
})
export default class AppBar extends Mixins(AuthMixin) {
  protected showProviders = false
  @Inject('layout')
  protected layout?: Base;

  private signIn(provider: string) {
    this.showProviders = false;
    (this as any).login(provider)
  }

  private toggleSide() {
    if (this.layout) {
      this.layout.toggleSideNav()
    }
  }
}
</script>

<style lang="scss">
img.app-icon {
  width: 4rem !important;
  height: 4rem !important;
}

.app-name {
  font-size: 2rem;
}
</style>
