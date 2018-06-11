// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' // Vuex全局状态管理
// 引入列表公共组件
import BaseList from '@/components/common/base-list.vue'
import InputNumbers from '@/components/common/input-number.vue'
import IconSvg from '@/components/icon-svg/'
// 引入分页全局配置
import getPage from '@/assets/page.js'
// 引入枚举 全局计算属性和过滤器
import { computedMapDict, filtersMapDict } from '@/assets/dict'
// 引入自有公共方法
import assist from '@/utils/assist'
import { filterNum } from '@/utils/filter'
import "@/assets/style/index.scss";
import './assets/iconfont/iconfont' // 引入图标字体
import { storageMsg } from "./utils/storage";
import { getCookie, Token } from './utils/cookie'

import {
    getAgain
} from '@/api/auth/auth'
// 按需引入element组件
import {
    Aside,
    Autocomplete,
    Button,
    Card,
    Checkbox,
    CheckboxGroup,
    Col,
    Container,
    DatePicker,
    Dialog,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Form,
    FormItem,
    Header,
    Icon,
    Input,
    InputNumber,
    Loading,
    Main,
    Menu,
    MenuItem,
    MenuItemGroup,
    Message,
    MessageBox,
    Option,
    Pagination,
    Progress,
    Radio,
    Row,
    Select,
    Step,
    Steps,
    Submenu,
    Table,
    TableColumn,
    TabPane,
    Tabs,
    Tag,
    Upload,
    Tree,
    Breadcrumb,
    BreadcrumbItem
} from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Radio.name, Radio);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Message.name, Message);
Vue.component(Container.name, Container);
Vue.component(Aside.name, Aside);
Vue.component(Header.name, Header);
Vue.component(Main.name, Main);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Submenu.name, Submenu);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Pagination.name, Pagination);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(Option.name, Option);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Dialog.name, Dialog);
Vue.component(Radio.name, Radio);
Vue.component(Step.name, Step);
Vue.component(Steps.name, Steps);
Vue.component(Autocomplete.name, Autocomplete);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Tag.name, Tag);
Vue.component(Card.name, Card);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Upload.name, Upload);
Vue.component(Progress.name, Progress);
Vue.component(BaseList.name, BaseList);
Vue.component(InputNumbers.name, InputNumbers);
Vue.component(IconSvg.name, IconSvg)
Vue.component(Tree.name, Tree)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)

//tabs 选项卡
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);

Vue.use(Loading.directive);
// 使用element-ui 并且组件尺寸默认为small
Vue.prototype.$ELEMENT = { size: 'small' };
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$maxLength = 256;
Vue.prototype.$length = 250;
Vue.prototype.$storageMsg = storageMsg;
// 分页配置
Vue.prototype.$defalutPage = getPage
// 注册自有工具库
Vue.prototype.$assist = assist
// 全局路由跳转
Vue.prototype.goto = function (path) {
    this.$router.push(path)
}
// 全局路由返回
Vue.prototype.goback = function (path) {
    this.$router.go(-1)
}


// 将枚举字典过滤器混入全局Vue
Vue.mixin({
    computed: {
        ...computedMapDict()
    },
    filters: {
        ...filtersMapDict()
    }
})

Vue.mixin({
    filters: {
        filterNum,
    }
})
const whiteList = ['/Login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
    // 判断是否存在token
    if (getCookie(Token)) {
        if (to.path === '/Login') {
            next()
        } else {
            // 检测到当前用户不存在更新当前用户
            if (!store.getters.currentUser.userName) {
                getAgain().then(res=>{
                    store.commit('SET_CURRENT_USER', res.data)
                })
                next()
            }else{
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next() // 在免登录白名单，直接进入
        } else {
            next('/Login') // 否则全部重定向到登录页
        }
    }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
