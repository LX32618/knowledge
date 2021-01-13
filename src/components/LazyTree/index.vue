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
                        <i :class="data.icon?data.icon:data.isLeaf?'el-icon-document':node.expanded?'el-icon-folder-opened':'el-icon-folder'"></i>

                        <span :style="{fontSize:'14px'}"> {{ node.label }}</span>
                         <span v-if= "data.icon1"><i  :class="data.icon1"></i></span>
                    </span>
                </span>
        </el-tree2>
        <div id="right_click_menu" v-if="settings.right_click"  v-show="show_right_click">
            <el-button v-if="show_append_btn" icon="el-icon-circle-plus" size="mini" @click="append">{{append_btn_label}}</el-button>
            <el-button v-if="show_edit_btn" icon="el-icon-edit" size="mini" @click="edit">{{edit_btn_label}}</el-button>
            <el-button v-if="show_remove_btn" icon="el-icon-delete-solid" size="mini" @click="remove">{{remove_btn_label}}</el-button>
        </div>
    </div>
</template>

<script>
    import Tree2 from "../Tree2"
    import request from '@/utils/request'
    import {baseRequest} from '@/utils/request'

    export default {
        name: "LazyTree",
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
                show_remove_btn:true,//控制右键中的删除按钮的显隐
                append_btn_label:"添加",
                edit_btn_label:"编辑",
                remove_btn_label:"删除"
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
                    this.append_btn_label = object.right_click_option.appendLabel?object.right_click_option.appendLabel:"添加";
                    this.edit_btn_label = object.right_click_option.editLabel?object.right_click_option.appendLabel:"编辑";
                    this.remove_btn_label = object.right_click_option.removeLabel?object.right_click_option.appendLabel:"删除";
                }
            },
            vanish() { // 取消鼠标监听事件
                this.show_right_click = false;
                document.removeEventListener('click', this.vanish); // 要及时关掉监听
            },
            loadNodes(node,resolve){
                let pid;
                if(node.level == 0)
                {
                    pid=this.settings.root_id;
                }
                else
                {
                    pid = node.data.id;
                }
                baseRequest({
                    url: this.settings.request.url,
                    method: this.settings.request.method,
                    data:{id:pid}
                }).then(data=>{
                    let formatData = this.dataFormat({node:node,data:data.content});
                    resolve(formatData);
                    if(this.settings.expand_root && node.level == 0)//如果默认需要展开第一层根节点
                    {
                        this.defaultExpandedKey = formatData.map(d=>{return d.id});
                    }
                });
            },
            nodeClick(data,node){
                this.$emit("treeNodeClick",{data,node});
            },
            append(e) {
                this.$emit("appendTreeNode",this.right_click_node);
            },
            appendSuccess(id){//新增成功
                let node = this.$refs.tree.getNode(id); //获得当前添加的node
                this.$set(node,'loaded',false);//无论当前节点是否展开加载，都将其设置为未加载
                this.$set(node.data,"isLeaf",false);//如果是叶子节点，将其变为非叶子节点
                node.expand();//展开
            },
            remove(e) {
                this.$emit("removeTreeNode",this.right_click_node);
            },
            removeSuccess(pid){//删除成功
                let pNode = this.$refs.tree.getNode(pid); //获取当前删除node的父节点
                this.$set(pNode,'loaded',false);//无论当前节点是否展开加载，都将其设置为未加载
                pNode.expand();//展开
                if(pNode.childNodes.length<=1){//如果父节点还有子节点
                    this.$set(pNode.data,'isLeaf',true);
                }
            },
            edit(e) {
                this.$emit("editTreeNode",this.right_click_node);
            },
            editSuccess(id){
                let node = this.$refs.tree.getNode(id); // 通过节点id找到对应树节点对象
                let pNode = this.$refs.tree.getNode(node.data.pid); // 通过节点id找到对应树节点对象
                this.$set(pNode,'loaded',false);//无论当前节点是否展开加载，都将其设置为未加载
                pNode.expand();//展开
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
                this.$emit("checkChange",this.checkedNodes);
            }
        },
        components:{
            "el-tree2":Tree2
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




