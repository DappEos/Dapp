<template>
  <el-row type="flex" class="pa-sm full-height" align="middle">
    <el-col class="app-name text-white">
      <el-row type="flex" align="middle">
        <el-col :span="3">
          <img class='vertical-middle app-icon' src="/img/poker-chip-icon.svg" />
        </el-col>
        <el-col class="ml-sm">BetDice</el-col>
      </el-row>
    </el-col>
    <el-col class="text-white">
      <el-row type="flex" align="middle">
        <el-col>
          <el-button class="vertical-middle" type="primary" size="small" circle>
            <img src="/img/ios-paper-plane.svg" style="width: 1.2rem" />
          </el-button>
          <span class="mr-md" />
          <el-button class="vertical-middle" type="primary" size="small" circle>
            <img src="/img/logo-twitter.svg" style="width: 1.2rem" />
          </el-button>
        </el-col>
        <el-col>
          <el-button type="primary" size="small">Lucky Draw</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col>
      <el-row type="flex" align="middle" justify="end">
        <el-col :span="3">
          <el-button class="text-white" type="text" size="small">Invite</el-button>
        </el-col>
        <el-col :span="5">
          <el-button
            class="text-white"
            type="text"
            size="small"
            @click="showHelp = true"
          >How to play?</el-button>
        </el-col>
        <el-col :span="6">
          <el-button class="text-white" type="text" size="small">DICE</el-button>
          <el-button class="text-white" type="text" size="small">
              English <i class="el-icon-arrow-down el-icon-right"></i>
          </el-button>
        </el-col>
        <el-col :span="4">
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
        </el-col>
      </el-row>
    </el-col>
    <help-modal v-model="showHelp" />
  </el-row>
</template>

<script lang="ts">
import {CreateElement} from 'vue'
import { SHOW_HELP } from '@/constants'
import HelpModal from '@/components/Help.vue'
import {Vue, Component} from 'vue-property-decorator'
import AuthMixin from '@/mixins/auth'

@Component({
  components: {
    HelpModal,
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
  },
  mixins: [AuthMixin]
})
export default class AppBar extends Vue {
  protected showHelp = false
  protected showProviders = false

  private mounted() {
    this.$root.$on(SHOW_HELP, () => this.showHelp = true)
  }

  private signIn(provider: string) {
    this.showProviders = false;
    (this as any).login(provider)
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
