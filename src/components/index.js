import Vue from "vue";
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

//后台管理组件
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";
import SideItem from "./SideItem";
import Tree from "./Tree";
import Table from "./Table";
import LazyTree from "./LazyTree/index";
import JsonEditor from "./JsonEditor"
import CatTreeSelect from "./CatTreeSelect"
import PeopleSelect from "./PeopleSelect"
import DynamicTable from '@/components/KnowledgeView/components/DynamicTable'
import DynamicForm from '@/components/KnowledgeView/components/DynamicForm'

//第三方组件
import Treeselect from '@riophae/vue-treeselect'

//注册全局组件
Vue.component("cs-breadcrumb", Breadcrumb);
Vue.component("cs-sidebar", Sidebar);
Vue.component("cs-sideitem", SideItem);
Vue.component("cs-tree", Tree);
Vue.component("cs-table", Table);
Vue.component("cs-lazytree",LazyTree);
Vue.component("cs-cat-tree-select",CatTreeSelect);
Vue.component("cs-people-select",PeopleSelect);
Vue.component("json-editor",JsonEditor);
Vue.component("dynamic-table",DynamicTable)
Vue.component("dynamic-form",DynamicForm)

//注册全局第三方组件
Vue.component('treeselect', Treeselect)
