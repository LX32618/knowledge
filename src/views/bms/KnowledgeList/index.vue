<template>
    <div class="knowlist box">
        <div class="knowlist sidebar">
            <cs-lazytree ref="lazytree" :settings="treeSettings" :dataFormat="treeDataFormat" @treeNodeClick="treeNodeClick" @appendTreeNode="appendTreeNode"  @removeTreeNode="removeTreeNode"></cs-lazytree>
        </div>
        <div class="knowlist main">
            <el-tabs v-model="activeName" type="border-card" v-if="basicFormData.pid!=''" :style="{height:'100%'}">
                <el-tab-pane :key="0" label="基本信息" name="basic">
                    <div>
                        <basic :settings="basicFormSettings" :form-data="basicFormData" @submitSuccess="submitSuccess"></basic>
                    </div>
                </el-tab-pane>
                <el-tab-pane :key="1" v-if="basicFormData.type=='2'" label="模板配置" name="template">模板配置</el-tab-pane>
                <el-tab-pane :key="2" v-if="basicFormData.type=='2'" label="列表配置" name="list">列表配置</el-tab-pane>
                <el-tab-pane :key="3" v-if="basicFormData.type!='0'" label="权限配置" name="permission">权限配置</el-tab-pane>
                <el-tab-pane :key="4" v-if="basicFormData.type=='2'" label="接口配置" name="interface">接口配置</el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog title="新增知识目录" :visible.sync="appendFormVisible">
            <basic :settings="appendFormSettings" :form-data="appendFormData" @submitSuccess="submitSuccess"></basic>
        </el-dialog>
    </div>
</template>


<script>
    import basic from "./Form/Basic"
    import _ from 'lodash'
    import request from '@/utils/request'

    const rootUrl = '/api/knowlist/';

    export default {
        name: "KnowledgeList",
        data(){
            return {
                activeName:'basic',
                appendFormVisible:false,
                treeSettings:{
                    root_id:"",//根节点id
                    expand_root:true,//是否默认展开根节点
                    check_strictly:true,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                    default_expand_all:false,//是否默认展开所层级
                    show_checkbox:false,//是否有checkbox
                    show_radio: false,//是否有单选radio
                    expand_on_click_node:false,//点击接点是否进行展开收缩
                    right_click:true,//是否具有右键功能
                    request:{//访问路径设置
                        url:`${rootUrl}getnodes`,
                        method:"post"
                    }
                },
                basicFormSettings:{
                    lableWidth:"120px",
                    formType:"basic"
                },
                appendFormSettings:{
                    lableWidth:"120px",
                    formType:"append"
                },
                basicFormData:{
                    pid:"",
                    id:"",
                    type:""
                },
                appendFormData:{
                    pid:"",
                    id:"",
                    type:""
                }
            }
        },
        methods:{
            treeNodeClick({data,node})
            {
                this.$set(this.basicFormData, 'pid', data.pid);
                this.$set(this.basicFormData, 'id', data.id);
                this.$set(this.basicFormData, 'type', data.type);
            },
            appendTreeNode(node){
                let data = {};
                data.id = "";
                data.pid = node.object.id;
                data.type = node.object.type;
                this.$set(this, 'appendFormData', data);
                this.appendFormVisible = true;
            },
            removeTreeNode(node)
            {
                this.$confirm('此操作将删除该节点及其子节点, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    request({
                        url: `${rootUrl}remove`,
                        method: 'post',
                        data:node.object,
                    }).then(data=>{
                        this.$refs.lazytree.removeSuccess(node.object.pid);
                    });
                }).catch(() => {
                });
            },
            submitSuccess({type,data}){
                if(type == "append")
                {
                    console.log("append");
                    this.appendFormVisible = false;
                    this.$refs.lazytree.appendSuccess(data.pid);
                }
                else if(type == "basic")
                {
                    this.$refs.lazytree.editSuccess(data);
                }
            },
            treeDataFormat({node,data}){
                const temp = _.cloneDeep(data);
                let formatData = temp.map((item,index,arr)=>{
                    if(item.pid=="")
                    {
                        item.icon = "element-icons el-custom-book";
                        item.right_click_option={
                            append:true,
                            edit:false,
                            remove:false,
                        };

                    }
                    else if(item.type=="0"){
                        item.icon = "element-icons el-custom-db";
                        item.right_click_option={
                            append:true,
                            edit:false,
                            remove:true,
                        };
                    }
                    else if(item.type=="1"){
                        item.icon = "element-icons el-custom-files";
                        item.right_click_option={
                            append:true,
                            edit:false,
                            remove:true,
                        };
                    }
                    else if(item.type=="2"){
                        item.icon = "element-icons el-custom-file";
                        item.right_click_option={
                            append:false,
                            edit:false,
                            remove:true,
                        };
                    }
                    else{}
                    item.showCheckbox = true;
                    return item;
                })
                return formatData;
            }
        },
        components:{
            basic
        }
    }
</script>

<style scoped>
    .knowlist.box{
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
    }
    .knowlist.sidebar{
        flex-basis: 15%;
    }
    .knowlist.main{
        flex-basis:85%;
    }
    .el-tabs--border-card{
        width:100%;
        border:0px;
    }
</style>