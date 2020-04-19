<template>
    <div class="block">

        <el-tree ref="tree"
                 :data="treeData"
                 node-key="id"
                 :default-expand-all="treeOptions.default_expand_all"
                 :show-checkbox="treeOptions.show_checkbox"
                 :expand-on-click-node="treeOptions.expand_on_click_node"
                 @node-contextmenu="rightClick"
                 @node-click="nodeClick">
                 <span slot-scope="{ node, data }">
                    <span>
                        <i :class="data.icon"></i>
                        <span :style="{fontSize:'14px'}"> {{ node.label }}</span>
                    </span>
                </span>
        </el-tree>
        <div id="right_click_menu"  v-if="treeOptions.right_click"  v-show="show_right_click">
            <el-button v-if="show_append_btn" icon="el-icon-circle-plus" size="mini" @click="append">添加</el-button>
            <el-button v-if="show_edit_btn" icon="el-icon-edit" size="mini" @click="edit">编辑</el-button>
            <el-button v-if="show_remove_btn" icon="el-icon-delete-solid" size="mini" @click="remove">删除</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tree",
        data() {
            return {
                show_right_click:false,
                right_click_node:{},
                show_append_btn:true,
                show_edit_btn:true,
                show_remove_btn:true
            }
        },
        props:['treeOptions','treeData'],
        methods: {
            rightClick(MouseEvent, object, Node, VueComponent){
                this.show_right_click = true;
                let menu = document.querySelector('#right_click_menu');
                menu.style.left = MouseEvent.clientX + 20 + 'px';
                document.addEventListener('click', this.vanish); // 给整个document添加监听鼠标事件，点击任何位置执行vanish方法
                menu.style.top = MouseEvent.clientY - 10 + 'px';
                this.right_click_node = {MouseEvent,object,Node,VueComponent};
                this.show_append_btn = object.right_click_option.append;
                this.show_edit_btn = object.right_click_option.edit;
                this.show_remove_btn = object.right_click_option.remove;
            },
            vanish() { // 取消鼠标监听事件
                this.show_right_click = false;
                document.removeEventListener('click', this.vanish); // 要及时关掉监听
            },
            nodeClick(data,node){
                this.$emit("treeNodeClick",{data,node});
            },
            append(e) {
                this.$emit("append_tree_node",this.right_click_node);
         /*       let object = this.right_click_node.object;
                const newChild = { id: 100, label: 'testtest', children: [] };
                if (!object.children) {
                    this.$set(object, 'children', []);
                }
                object.children.push(newChild);
                this.$refs.tree.store.nodesMap[object.id].expanded = true;*/
            },
            remove(e) {
                let node = this.right_click_node.Node;
                let object = this.right_click_node.object;
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === object.id);
                children.splice(index, 1);
            },
            edit(e) {
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    /*覆盖原有样式*/
    .el-button+.el-button{
        margin-left:0px !important;
    }
    #right_click_menu{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        position: absolute;
    }
</style>




