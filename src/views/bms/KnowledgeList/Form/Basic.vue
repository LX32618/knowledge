<template>
    <el-form :model="data" :rules="rules" ref="basicForm" :label-width="settings.lableWidth">
        <el-form-item label="名称"   prop="name">
            <el-input autocomplete="off" v-model="data.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="目录类型" v-if="data.catalogType!='root'" >
            <el-select  placeholder="请选择目录类型" v-model="data.catalogType" :disabled="settings.formType=='basic'">
                <el-option label="知识库" value="repository" v-if="settings.formType=='basic'"></el-option>
                <el-option label="分类" value="sort"></el-option>
                <el-option label="目录" value="catalog"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="关联表单"  v-if="data.catalogType=='catalog'">
            <el-select v-model = "data.associatedForm" @click.native="associatedFormClick">
                <el-option value="data.associatedForm"  v-loading="associatedFormLoading" label="data.associatedForm" style="width:760px;height:200px;overflow:auto;background-color:#fff">
                    <cs-table :settings="tableSettings"
                              :table-data="tableData"
                              @currentChange="associatedFormCurrentChange"
                              @pageSizeChange="associatedFormPageSizeChange">
                    </cs-table>
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标签分类选择" v-if="data.catalogType=='catalog'">
            <el-select v-model = "data.labelClassification">
                <el-option value="data.labelClassification" label="data.labelClassification"  style="width:360px;height:200px;overflow:auto;background-color:#fff">
                    <cs-lazytree :settings="treeSettings" :dataFormat="treeDataFormat" @checkChange="checkChange"></cs-lazytree>
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="显示顺序" prop="viewSort">
            <el-input autocomplete="off" v-model.number="data.viewSort" placeholder="请输入显示顺序"></el-input>
        </el-form-item>
        <el-form-item label="密级">
            <el-select  placeholder="请选择密级" v-model="data.secrectLevel">
                <el-option label="非密" value="10"></el-option>
                <el-option label="内部" value="20"></el-option>
                <el-option label="秘密" value="30"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="知识库图片" v-if="data.catalogType=='root' || data.catalogType=='repository'">
            <el-input autocomplete="off" v-model="data.repositoryPicture"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
            <el-switch v-model="data.isEnabled"></el-switch>
        </el-form-item>
        <el-form-item label="是否开启邮件" v-if="data.catalogType=='catalog'">
            <el-switch v-model="data.isMailEnabled"></el-switch>
        </el-form-item>
        <el-form-item label="说明">
            <el-input type="textarea" v-model="data.description"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <p :style="{textIndent:'2em'}"><i class="element-icons el-custom-files"></i>(分类)：表示该目录类型下还可以添加子分类和目录，不能挂知识文档</p>
        <p :style="{textIndent:'2em'}"><i class="element-icons el-custom-file"></i>(目录)：表示该目录类型下不能再添加子目录和分类了，能够挂知识文档</p>
        <el-button type="primary" :style="{float:'right',marginTop:'-10px'}" @click="submitForm">保存</el-button>
    </el-form>
</template>

<script>
    import _ from 'lodash'
    import request from '@/utils/request'

    let tagUrl = "/api/tag/";
    let formUrl = "/api/form/";

    export default {
        name: "Basic",
        props:{
            settings:{
                type: Object
            },
            formData:{
                type:Object,
                default: {
                    name:"",
                    catalogType:"",
                    associatedForm:"",
                    labelClassification:"",
                    viewSort:0,
                    secrectLevel:"internal",
                    repositoryPicture:"",
                    isEnabled:false,
                    isMailEnabled:"",
                    description:""
                }
            }
        },
        data(){
            return {
                data: _.cloneDeep(this.formData),
                showTagTree:false,
                associatedFormLoading:false,
                treeSettings:{
                    root_id:"",//根节点id
                    expand_root:true,//是否默认展开根节点
                    check_strictly:true,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                    default_expand_all:false,//是否默认展开所层级
                    show_checkbox:false,//是否有checkbox
                    show_radio: true,//是否有单选radio
                    expand_on_click_node:false,//点击接点是否进行展开收缩
                    right_click:false,//是否具有右键功能
                    request:{//访问路径设置
                        url:`${tagUrl}get`,
                        method:"post"
                    }
                },
                tableSettings: {
                    radio:true,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    pagination:true,//是否显示分页
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "formName", label: "表单名称", sortable: true},
                        {prop: "tableName", label: "数据库表名"},
                        {prop: "formType", label: "表单类型",
                            formatter(index,row)
                            {
                                return row.formType==0?"实体表单":"虚拟表单";
                            }
                        }
                    ]
                },
                tableData:[],
                rules: {
                    name: [
                        {required: true, message: "请输入名称", trigger: "blur"}
                    ],
                    viewSort: [
                        {required: true, message: "请输入显示顺序", trigger: "blur"},
                        {type: 'number', message: '请输入整数', trigger: 'blur'}
                    ]
                }
            }
        },
        watch:{
            formData:{
                handler(newVal,oldVal){
                    this.data = _.cloneDeep(newVal);
                },
                deep:true
            }
        },
        methods:{
            submitForm() {
                this.$refs['basicForm'].validate((valid) => {
                    if (valid) {
                    } else {
                        return false;
                    }
                });
            },
            resetForm() {
                this.$refs['basicForm'].resetFields();
            },
            treeDataFormat({node,data}){
                const temp = _.cloneDeep(data);
                let formatData = temp.map((item,index,arr)=>{
                    let pid = item.pid;
                    if(this.treeSettings.root_id == pid){//如果是根节点
                        item.showCheckbox = false;
                    }
                    else if(item.isLeaf)
                    {
                        item.showCheckbox = false;
                    }
                    else{
                        item.showCheckbox = true;
                    }
                    return item;
                })
                return formatData;
            },
            selectTagTree(){
                this.showTagTree = true;
            },
            checkChange(data){
                this.data.labelClassification = data[0].name;
            },
            associatedFormClick(){
                let data = {
                    formName:"",
                    sort:"",
                    order:"",
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize
                };
                this.loadAssociatedFormData(data);
            },
            associatedFormCurrentChange(currentRow){
                console.log(currentRow);
            },
            associatedFormPageSizeChange({page,rows}){
                let data = {
                    formName:"",
                    sort:"",
                    order:"",
                    page:page,
                    rows:rows
                };
                this.loadAssociatedFormData(data);
            },
            loadAssociatedFormData(data) {
                this.associatedFormLoading = true;
                request({
                    url: `${formUrl}get`,
                    method: 'post',
                    data:data,
                }).then(data=>{
                    this.associatedFormLoading = false;
                    let fileds = this.tableSettings.fields.map(f=>{
                        return f.prop;
                    });
                    this.tableData =  data.content.map(d=>{
                        return _.pick(d,fileds);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>