<template>
    <div class="knowlist box">
        <div class="knowlist sidebar">
            <cs-lazytree :settings="treeSettings" :dataFormat="treeDataFormat" @treeNodeClick="treeNodeClick" @appendTreeNode="appendTreeNode" @editTreeNode="editTreeNode"></cs-lazytree>
        </div>
        <div class="knowlist main">
            <el-tabs v-model="activeName" type="border-card" v-if="basicFormData.catalogType!='root'" :style="{height:'100%'}">
                <el-tab-pane :key="0" label="基本信息" name="basic">
                    <div>
                        <basic :settings="basicFormSettings" :form-data="basicFormData"></basic>
                    </div>
                </el-tab-pane>
                <el-tab-pane :key="1" v-if="basicFormData.catalogType=='catalog'" label="模板配置" name="template">模板配置</el-tab-pane>
                <el-tab-pane :key="2" v-if="basicFormData.catalogType=='catalog'" label="列表配置" name="list">列表配置</el-tab-pane>
                <el-tab-pane :key="3" v-if="basicFormData.catalogType!='repository'" label="权限配置" name="permission">权限配置</el-tab-pane>
                <el-tab-pane :key="4" v-if="basicFormData.catalogType=='catalog'" label="接口配置" name="interface">接口配置</el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog title="新增知识目录" :visible.sync="dialogFormVisible">
            <basic :settings="appendFormSettings" :form-data="appendFormData"></basic>
        </el-dialog>
    </div>
</template>


<script>
    import basic from "./Form/Basic"
    import _ from 'lodash'

    const rootUrl = '/api/tree/';

    export default {
        name: "KnowledgeList",
        data(){
            return {
                activeName:'basic',
                dialogFormVisible:false,
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
                    name:"",
                    catalogType:"root",
                    associatedForm:"",
                    labelClassification:"",
                    viewSort:"",
                    secrectLevel:"10",
                    repositoryPicture:"",
                    isEnabled:"",
                    isMailEnabled:"",
                    description:""
                },
                appendFormData:{
                    name:"",
                    catalogType:"",
                    associatedForm:"",
                    labelClassification:"",
                    viewSort:0,
                    secrectLevel:"internal",
                    repositoryPicture:"",
                    isEnabled:true,
                    isMailEnabled:false,
                    description:""
                }
            }
        },
        methods:{
            treeNodeClick({data,node})
            {
                this.$set(this.basicFormData, 'catalogType', data.type);
            },
            appendTreeNode(node){
                this.$set(this.appendFormData, 'catalogType', node.object.type);
                this.dialogFormVisible = true;
            },
            editTreeNode(node){

            },
            treeDataFormat({node,data}){
                const temp = _.cloneDeep(data);
                let formatData = temp.map((item,index,arr)=>{
                    if(item.type=="root")
                    {
                        item.icon = "element-icons el-custom-book";
                        item.right_click_option={
                            append:true,
                            edit:false,
                            remove:false,
                        };

                    }
                    else if(item.type=="repository"){
                        item.icon = "element-icons el-custom-db";
                        item.right_click_option={
                            append:true,
                            edit:false,
                            remove:true,
                        };
                    }
                    else if(item.type=="sort"){
                        item.icon = "element-icons el-custom-files";
                        item.right_click_option={
                            append:true,
                            edit:false,
                            remove:true,
                        };
                    }
                    else if(item.type=="catalog"){
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