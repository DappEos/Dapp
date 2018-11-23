import {VueConstructor} from 'vue'
import {
  Container,
  Header,
  Main,
  Col,
  Row,
  Button,
  Menu,
  MenuItem,
  Submenu,
  Card,
  Slider,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Dialog,
  Alert,
  Input,
  Popover,
  Radio
} from 'element-ui'

import VueI18n from 'vue-i18n'

export default (Vue: VueConstructor) => {
  Vue.use(VueI18n)
  Vue.use(Header)
  Vue.use(Container)
  Vue.use(Main)
  Vue.use(Col)
  Vue.use(Row)
  Vue.use(Button)
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(Submenu)
  Vue.use(Card)
  Vue.use(Slider)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Dialog)
  Vue.use(Alert)
  Vue.use(Input)
  Vue.use(Popover)
  Vue.use(Radio)
}
