<template>
    <div class="box">
        <div class="sidebar">
            <cs-tree :tree-options="treeOptions" :tree-data="treeData" @treeNodeClick="treeNodeClick" @append_tree_node="append_tree_node"></cs-tree>
        </div>
        <div class="main">
            <el-tabs v-model="activeName" type="border-card" v-if="basicFormData.catalogType!='root'" :style="{height:'100%'}">
                <el-tab-pane :key="0" label="基本信息" name="basic">
                    <div>
                        <basic :form-option="basicFormOption" :form-data="basicFormData"></basic>
                    </div>
                </el-tab-pane>
                <el-tab-pane :key="1" v-if="basicFormData.catalogType=='catalog'" label="模板配置" name="template">模板配置</el-tab-pane>
                <el-tab-pane :key="2" v-if="basicFormData.catalogType=='catalog'" label="列表配置" name="list">列表配置</el-tab-pane>
                <el-tab-pane :key="3" v-if="basicFormData.catalogType!='repository'" label="权限配置" name="permission">权限配置</el-tab-pane>
                <el-tab-pane :key="4" v-if="basicFormData.catalogType=='catalog'" label="接口配置" name="interface">接口配置</el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog title="新增知识目录" :visible.sync="dialogFormVisible">
            <basic :form-option="appendFormOption" :form-data="appendFormData"></basic>
        </el-dialog>
    </div>
</template>


<script>
    import basic from "./Form/Basic"

    export default {
        name: "KnowledgeList",
        data(){
            return {
                activeName:'basic',
                dialogFormVisible:false,
                treeOptions:{
                    default_expand_all:false,//是否默认展开所层级
                    show_checkbox:false,//是否有checkbox
                    expand_on_click_node:false,//点击接点是否进行展开收缩
                    right_click:true//是否具有右键功能
                },
                treeData:[{
                    id: 1,
                    label: '知识目录',
                    type:"root",
                    icon:'element-icons el-custom-book',
                    right_click_option:{
                        append:true,
                        edit:false,
                        remove:false,
                    },
                    children: [{
                        id: 2,
                        label: "机械产品知识库",
                        type:"repository",
                        icon:'element-icons el-custom-db',
                        right_click_option:{
                            append:true,
                            edit:false,
                            remove:true,
                        },
                        children: [{
                            id: 3,
                            type:"catalog",
                            label: "设计知识",
                            icon:'element-icons el-custom-file',
                            right_click_option:{
                                append:false,
                                edit:false,
                                remove:true,
                            }
                        }, {
                            id: 4,
                            label:"产品分类",
                            type:"sort",
                            icon:'element-icons el-custom-files',
                            right_click_option:{
                                append:true,
                                edit:false,
                                remove:true,
                            },
                            children:[{
                                id: 5,
                                type:"catalog",
                                label: "目录一",
                                icon:'element-icons el-custom-file',
                                right_click_option:{
                                    append:false,
                                    edit:false,
                                    remove:true,
                                }
                            },{
                                id: 6,
                                type:"catalog",
                                label: "目录二",
                                icon:'element-icons el-custom-file',
                                right_click_option:{
                                    append:false,
                                    edit:false,
                                    remove:true,
                                }
                            }]
                        }]
                    }]
                }],
                basicFormOption:{
                    lableWidth:"120px",
                    formType:"basic"
                },
                appendFormOption:{
                    lableWidth:"120px",
                    formType:"append"
                },
                basicFormData:{
                    name:"",
                    catalogType:"root",
                    associatedForm:"",
                    labelClassification:"",
                    viewSort:"",
                    secrectLevel:"secret",
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
            append_tree_node(node){
                this.$set(this.appendFormData, 'catalogType', node.object.type);
                this.dialogFormVisible = true;
            }
        },
        components:{
            basic
        }
    }
</script>

<style scoped>
    .box{
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
    }
    .sidebar{
        flex-basis: 15%;
    }
    .main{
        flex-basis:85%;
    }
    .el-tabs--border-card{
        width:100%;
        border:0px;
    }
</style>