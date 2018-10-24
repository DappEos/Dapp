import {VueConstructor} from 'vue'
import {Container, Header, Main, Col, Row, Button, Menu, MenuItem, Submenu, Card, Slider} from 'element-ui'

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
}
