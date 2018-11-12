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
  Alert
} from 'element-ui'

export default (Vue: VueConstructor) => {
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
}
