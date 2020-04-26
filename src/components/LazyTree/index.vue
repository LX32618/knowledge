<template>
    <div class="block">
        <el-tree2 ref="tree"
                  node-key="id"
                  lazy
                  :props="treeProps"
                  :load="loadNodes"
                  :default-expanded-keys="defaultExpandedKey"
                  :check-strictly="settings.check_strictly"
                  :default-expand-all="settings.default_expand_all"
                  :show-checkbox="settings.show_checkbox||settings.show_radio"
                  :expand-on-click-node="settings.expand_on_click_node"
                  @node-contextmenu="rightClick"
                  @check-change="checkChange"
                  @node-click="nodeClick">
                 <span slot-scope="{ node, data }">
                    <span>
                        <i :class="data.icon?data.icon:data.isLeaf?'el-icon-document':'el-icon-folder'"></i>
                        <span :style="{fontSize:'14px'}"> {{ node.label }}</span>
                    </span>
                </span>
        </el-tree2>
        <div id="right_click_menu" v-if="settings.right_click"  v-show="show_right_click">
            <el-button v-if="show_append_btn" icon="el-icon-circle-plus" size="mini" @click="append">添加</el-button>
            <el-button v-if="show_edit_btn" icon="el-icon-edit" size="mini" @click="edit">编辑</el-button>
            <el-button v-if="show_remove_btn" icon="el-icon-delete-solid" size="mini" @click="remove">删除</el-button>
        </div>
    </div>
</template>

<script>
    import Tree2 from "../Tree2"
    import request from '@/utils/request'

    export default {
        name: "Tree",
        props:{
            settings:{
                type:Object
            },
            dataFormat:{//加工返回的数据
                type:Function
            }
        },
        data() {
            return {
                treeProps: {
                    label: 'name',
                    isLeaf: 'isLeaf'
                },
                checkdNodes:[],
                right_click_node:{},//右键选择的节点
                checkedNodes:[],//选中的节点
                defaultExpandedKey:[],//默认需要展开的层数
                show_right_click:false,//控制右键menu的显隐
                show_append_btn:true,//控制右键中的添加载按钮的显隐
                show_edit_btn:true,//控制右键中的编辑按钮的显隐
                show_remove_btn:true//控制右键中的删除按钮的显隐
            }
        },
        methods: {
            rightClick(MouseEvent, object, Node, VueComponent){
                if(this.settings.right_click) {
                    this.show_right_click = true;
                    let menu = document.querySelector('#right_click_menu');
                    menu.style.left = MouseEvent.clientX + 20 + 'px';
                    document.addEventListener('click', this.vanish); // 给整个document添加监听鼠标事件，点击任何位置执行vanish方法
                    menu.style.top = MouseEvent.clientY - 10 + 'px';
                    this.right_click_node = {MouseEvent, object, Node, VueComponent};
                    this.show_append_btn = object.right_click_option.append;
                    this.show_edit_btn = object.right_click_option.edit;
                    this.show_remove_btn = object.right_click_option.remove;
                }
            },
            vanish() { // 取消鼠标监听事件
                this.show_right_click = false;
                document.removeEventListener('click', this.vanish); // 要及时关掉监听
            },
            nodeClick(data,node){
                this.$emit("treeNodeClick",{data,node});
            },
            loadNodes(node,resolve){
                let pid;
                if(node.level == 0)
                {
                    pid="";
                }
                else
                {
                    pid = node.data.id;
                }
                request({
                    url: this.settings.request.url,
                    method: this.settings.request.method,
                    data:{pid:pid}
                }).then(data=>{
                    let formatData = this.dataFormat(data.data);
                    resolve(formatData);
                    if(this.settings.expand_root && node.level == 0)//如果默认需要展开第一层根节点
                    {
                        this.defaultExpandedKey = formatData.map(d=>{return d.id});
                    }
                });


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
            },
            checkChange(data, checked, indeterminate) {
                if(!this.settings.show_checkbox && this.settings.show_radio)//只有在单选的情况下
                {
                    if(checked == true){
                        this.$refs.tree.setCheckedNodes([data]);
                        this.checkedNodes = [data];
                    }
                }
                else
                {
                    this.checkedNodes = this.$refs.tree.getCheckedNodes();
                }
            }
        },
        components:{
            "el-tree2":Tree2
        },
        mounted() {
            //this.loadNodes();

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




