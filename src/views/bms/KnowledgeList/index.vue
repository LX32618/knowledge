<template>
    <div class="knowlist box">
        <div class="knowlist sidebar">
            <cs-lazytree ref="lazytree" :settings="treeSettings" :dataFormat="treeDataFormat" @treeNodeClick="treeNodeClick" @appendTreeNode="appendTreeNode"  @removeTreeNode="removeTreeNode"></cs-lazytree>
        </div>
        <div class="knowlist main">
            <el-tabs v-model="activeName" type="border-card" v-if="basicFormData.pid!='0' && Object.keys(basicFormData).length != 0" @tab-click="tabClick" :style="{height:'100%'}">
                <el-tab-pane :key="0" label="基本信息" name="basic">
                    <div>
                        <cs-basic :settings="basicFormSettings" :form-data="basicFormData" @submitSuccess="submitSuccess"></cs-basic>
                    </div>
                </el-tab-pane>
                <el-tab-pane :key="1" v-if="basicFormData.type==2 && clickData.formId" label="模板配置" name="template" >
                    <cs-template :form-data="tempFormData" :category-id="basicFormData.id" v-loading="tabLoading"></cs-template>
                </el-tab-pane>
                <el-tab-pane :key="2" v-if="basicFormData.type==2 && clickData.formId" label="列表配置" name="list" >
                    <cs-table-config :config-data="configData" v-loading="tabLoading"></cs-table-config>
                </el-tab-pane>
                <el-tab-pane :key="3" v-if="basicFormData.type!=0" label="权限配置" name="permission">
                    <cs-authority-config :authority-data="authorityData" v-loading="tabLoading"></cs-authority-config>
                </el-tab-pane>
                <el-tab-pane :key="4" v-if="basicFormData.type==2 && clickData.formId" label="流程配置" name="interface">
                    <cs-flow-config :flow-data="flowData" :category-id="categoryId" :bind-data="bindData" v-loading="tabLoading" @saveSuccess="saveFlowConfig" @deleteSuccess="deleteFlowConfig"></cs-flow-config>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog title="新增知识目录" :visible.sync="appendFormVisible" :close-on-click-modal="false">
            <cs-basic :settings="appendFormSettings" :form-data="appendFormData" @submitSuccess="submitSuccess"></cs-basic>
        </el-dialog>
    </div>
</template>


<script>
    import basic from "./Form/Basic"
    import template from "./Form/Template"
    import tableConfig from "./Form/TableConfig"
    import authorityConfig from "./Form/AuthorityConfig"
    import flowConfig from "./Form/FlowConfig"
    import _ from 'lodash'
    import request from '@/utils/request'
    import {mapGetters} from "vuex";
    import {fetchModel} from "@/api/formMaking.js"
    import {fetchTableConfig} from "@/api/knowledgeList.js"
    import {fetchFlowList} from "@/api/fmsBasic.js"
    import {fetchPermissionList} from "@/api/authorityConfig.js"
    import {fetchProcessBindList} from "@/api/processBind.js"

    const treeUrl = '/app-zuul/knowledge/app/authcenter/api/categoryTree/';
    const rootUrl = '/categoryTree/';

    export default {
        name: "KnowledgeList",
        data(){
            return {
                categoryId:"",
                activeName:'basic',
                clickData:{},
                appendFormVisible:false,
                tabLoading:false,
                fileList:[],
                treeSettings:{
                    root_id:"0",//根节点id
                    expand_root:true,//是否默认展开根节点
                    check_strictly:true,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                    default_expand_all:false,//是否默认展开所层级
                    show_checkbox:false,//是否有checkbox
                    show_radio: false,//是否有单选radio
                    expand_on_click_node:false,//点击接点是否进行展开收缩
                    right_click:true,//是否具有右键功能
                    request:{//访问路径设置
                        url:`${treeUrl}get`,
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
                tempFormData:{},
                basicFormData:{
                },
                appendFormData:{
                },
                configData:{},
                authorityData:{},
                bindData:[],
                flowData:[],
                flowDefaultRow:{}
            }
        },
        methods:{
            async tabClick(tab) {
                if (tab.label == '模板配置') {
                    let option = {
                        categeryId: this.basicFormData.id
                    };

                    let loading = this.$loading({
                        lock: true,
                        text: '',
                        spinner: 'el-icon-loading',
                        background: 'rgba(255, 255, 255, 0.9)'
                    })
                    //this.tabLoading = true;
                    fetchModel(option).then(resp => {
                        if (resp.status == "success") {
                            this.tempFormData = resp.content.knowledgeModel.formModel;
                        } else {
                            this.$error(resp.msg);
                        }
                        loading.close();
                    });
                } else if (tab.label == '列表配置') {
                    let option = {
                        categoryId: this.basicFormData.id,
                        formId: this.basicFormData.formId
                    };
                    this.tabLoading = true;
                    fetchTableConfig(option).then(resp => {
                        if (resp.status == "success") {
                            let configData = _.cloneDeep(resp.content);
                            configData.categoryId = this.basicFormData.id;
                            this.configData = configData;
                        } else {
                            this.$error(resp.msg);
                        }
                        this.tabLoading = false;
                    });
                } else if (tab.label == '流程配置') {
                    let option = {
                        searchName: '',
                        searchKey: '',
                        ifPage: 'false',
                        page: "",
                        rows: ""
                    };
                    this.tabLoading = true;
                    let resp = await fetchFlowList(option);
                    if (resp.data.success) {
                        this.flowData = JSON.parse(resp.data.obj).rows.filter(d => {
                            return d.status == "已发布";
                        });
                    }

                    let option1 = {
                        id:this.basicFormData.id
                    }
                    let resp1 = await fetchProcessBindList(option1);
                    this.categoryId = this.basicFormData.id;
                    this.bindData = resp1.content;
                    this.tabLoading = false;
                } else if(tab.label == '权限配置'){
                    let option = {
                        id:this.basicFormData.id
                    };
                    let resp = await fetchPermissionList(option);
                    this.authorityData={
                        categoryId:resp.content.docCategory.id,
                        ruleLevel:resp.content.rightlevel0,
                        ruleData:resp.content.ruleList
                    };
                }
            },
            onSuccess(response, file, fileList){
            },
            submitUpload(){
                this.$refs.upload.submit();
            },
            onPreview(file){
                console.log(file);
            },
            treeNodeClick({data,node})
            {
                this.clickData = data;
                this.activeName = "basic";
                this.$set(this, 'basicFormData', data);
            },
            appendTreeNode(node){
                let data = {
                    id:"",
                    pid: node.object.id,
                    type:node.object.type,
                    createUser:this.userInfo.id,
                    name:"",
                    categoryName:"",
                    categoryCode:"",
                    sort:0,
                    formId:"",
                    formName:"",
                    labelInfo: [],
                    picture:"",
                    secretLevel:20,
                    isSentMail:0,//是否开启邮件（0否1是）
                    enable:0,//是否开启邮件（0否1是）
                    remark:"",
                    isRoot:node.object.pid=="0"?true:false
                };
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
                        url: `${rootUrl}delete`,
                        method: 'post',
                        data:{id:node.object.id}
                    }).then(data=>{
                        if(data.status == "success")
                        {
                            this.$success("删除成功");
                            this.$refs.lazytree.removeSuccess(node.object.pid);
                        }
                        else{
                            this.$error(data.message);
                        }

                    });
                }).catch((e) => {
                    console.log(e);
                });
            },
            submitSuccess({type,data}){
                this.clickData = data;
                if(type == "append")
                {
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
                    item.sort = parseInt(item.sort);
                    if(item.pid==this.treeSettings.root_id)
                    {
                        item.icon = "element-icons el-custom-book";
                        item.right_click_option={
                            append:true,
                            edit:false,
                            remove:false,
                            appendLabel:"添加知识目录"
                        };
                    }
                    else if(item.type==0){
                        item.icon = "element-icons el-custom-db";
                        item.right_click_option={
                            append:true,
                            edit:false,
                            remove:true
                        };
                    }
                    else if(item.type==1){
                        item.icon = "element-icons el-custom-files";
                        item.right_click_option={
                            append:true,
                            edit:false,
                            remove:true
                        };
                    }
                    else if(item.type==2){
                        item.icon = "element-icons el-custom-file";
                        item.right_click_option={
                            append:false,
                            edit:false,
                            remove:true
                        };
                    }
                    else{}
                    item.showCheckBox = true;
                    return item;
                })
                return formatData;
            },
            saveFlowConfig(data){
                this.$nextTick(()=>{
                    let index = this.bindData.findIndex(d=>{
                        return d.processKindType == data.processKindType;
                    });
                    if(index > -1)
                    {
                        this.bindData.splice(index,1,data);
                    }
                    else {
                        this.bindData.push(data);
                    }
                })
            },
            deleteFlowConfig(data){
                this.$nextTick(()=>{
                    let index = this.bindData.findIndex(d=>{
                        return d.processKindType == data.processKindType;
                    });
                    this.bindData.splice(index,1);
                });
            }
        },
        components:{
            "cs-basic":basic,
            "cs-template":template,
            "cs-table-config":tableConfig,
            "cs-authority-config":authorityConfig,
            "cs-flow-config":flowConfig
        },
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        },
        mounted() {
            let option = {
                categeryId:this.basicFormData.id
            };
/*            fetchTestModel(option).then(resp=>{
                console.log(resp.content.content.knowledgeModel.formModel)
                if(resp.status == "success")
                {
                    this.tempFormData = resp.content.content.knowledgeModel.formModel;
                }
                else{
                    this.$error(resp.msg);
                }
            });*/
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
        flex-basis:81%;
    }
    .el-tabs--border-card{
        width:100%;
        border:0px;
    }
</style>

