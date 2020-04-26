import Vue from "vue";
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

//后台管理组件
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";
import SideItem from "./SideItem";
import Tree from "./Tree";
import Table from "./Table";
import LazyTree from "./LazyTree/index";

//第三方组件
import Treeselect from '@riophae/vue-treeselect'

//注册全局组件
Vue.component("cs-breadcrumb", Breadcrumb);
Vue.component("cs-sidebar", Sidebar);
Vue.component("cs-sideitem", SideItem);
Vue.component("cs-tree", Tree);
Vue.component("cs-table", Table);
Vue.component("cs-lazytree",LazyTree);

//注册全局第三方组件
Vue.component('treeselect', Treeselect)
