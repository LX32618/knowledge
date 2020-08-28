<template>
  <div class="block">
    <el-tree2
      ref="tree"
      :data="data"
      node-key="id"
      :props="props"
      :check-strictly="treeOptions.check_strictly"
      :default-expand-all="treeOptions.default_expand_all"
      :show-checkbox="treeOptions.show_checkbox || treeOptions.show_radio"
      :expand-on-click-node="treeOptions.expand_on_click_node"
      :default-checked-keys="treeOptions.default_checked_keys"
      @check-change="checkChange"
      @node-contextmenu="rightClick"
      @node-click="nodeClick">
      <span slot-scope="{ data, node }">
        <span>
          <i :class="data.icon?data.icon: data.children?node.expanded?'el-icon-folder-opened':'el-icon-folder':'el-icon-document'"></i>
          <span :style="{ fontSize: '14px' }">
            {{ node.label }}
            <span v-if="treeOptions.showCount">({{ data.knowNum }})</span></span>
        </span>
      </span>
    </el-tree2>
    <div
      id="right_click_menu"
      v-if="treeOptions.right_click"
      v-show="show_right_click"
    >
      <el-button
        v-if="show_append_btn"
        icon="el-icon-circle-plus"
        size="mini"
        @click="append"
        >添加</el-button
      >
      <el-button
        v-if="show_edit_btn"
        icon="el-icon-edit"
        size="mini"
        @click="edit"
        >编辑</el-button>
      <el-button
        v-if="show_remove_btn"
        icon="el-icon-delete-solid"
        size="mini"
        @click="remove">删除</el-button>
    </div>
  </div>
</template>

<script>
import Tree2 from "../Tree2"
import _ from 'lodash'
import { unflatTree } from '@/utils/tree.js'

export default {
  name: "Tree",
  data () {
    return {
      //   data: [],//树的数据
      props: {
        label: 'name'
      },
      right_click_node: {},//右键选择的节点
      checkedNodes: [],//选中的节点
      show_right_click: false,//控制右键menu的显隐
      show_append_btn: true,//控制右键中的添加载按钮的显隐
      show_edit_btn: true,//控制右键中的编辑按钮的显隐
      show_remove_btn: true//控制右键中的删除按钮的显隐
    }
  },
  props: ["treeOptions", "data"],
  methods: {
    show (node) {
      console.log(node)
      return node.label
    },
    //右键点击事件
    rightClick (MouseEvent, object, Node, VueComponent) {
      if (this.settings.right_click) {
        this.show_right_click = true;
        let menu = document.querySelector('#right_click_menu');
        menu.style.left = MouseEvent.clientX + 20 + 'px';
        document.addEventListener('click', this.vanish); // 给整个document添加监听鼠标事件，点击任何位置执行vanish方法
        menu.style.top = MouseEvent.clientY - 10 + 'px';
        this.right_click_node = { MouseEvent, object, Node, VueComponent };
        this.show_append_btn = object.right_click_option.append;
        this.show_edit_btn = object.right_click_option.edit;
        this.show_remove_btn = object.right_click_option.remove;
      }

    },
    vanish () { // 取消鼠标监听事件
      this.show_right_click = false;
      document.removeEventListener('click', this.vanish); // 要及时关掉监听
    },
    nodeClick (data, node) {
      /*      let options = _.cloneDeep(this.treeOptions);
            options.check_strictly = false;
            this.$emit("update:tree-options",options);*/
      this.$emit("treeNodeClick", { data, node });
    },
    append (e) {
      this.$emit("append_tree_node", this.right_click_node);

    },
    remove (e) {
      this.$emit("remove_tree_node", this.right_click_node);
    },
    edit (e) {
      this.$emit("edit_tree_node", this.right_click_node);
    },
    checkChange (data, checked, indeterminate) {
      if (!this.treeOptions.show_checkbox && this.treeOptions.show_radio)//只有在单选的情况下
      {
        if (checked == true) {
          this.$refs.tree.setCheckedNodes([data]);
          this.checkedNodes = [data];
        }
      }
      else {
        this.checkedNodes = this.$refs.tree.getCheckedNodes();
      }
      this.$emit("checkChange",this.checkedNodes);
    },
    setCheckedKeys(keys){
      this.$refs.tree.setCheckedKeys(keys,true);
    }
  },
  components: {
    "el-tree2": Tree2
  }
}
</script>

<style scoped>
/*覆盖原有样式*/
.el-button + .el-button {
  margin-left: 0px !important;
}

#right_click_menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
}
</style>




