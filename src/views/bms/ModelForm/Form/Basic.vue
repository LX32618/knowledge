<template>
    <el-form :model="data" :rules="rules" ref="basicForm" label-width="100px">
        <el-form-item label="表单名称" prop="formName">
            <el-input autocomplete="off" placeholder="请输入表单名称" v-model="data.formName"></el-input>
        </el-form-item>
        <el-form-item label="表单类型">
            <el-select placeholder="--请选择--" v-model="data.formType" :disabled="data.id!='' || data.mainId!=''"><!--编辑或者子表新增时不能修改-->
                <el-option label="实体表单" :value = 0></el-option>
                <el-option label="虚拟表单" :value = 1></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="数据库表名" prop="tableName" v-if="data.formType==0">
            <el-input autocomplete="off" v-model="data.tableName" :disabled="data.id!=''"></el-input>
        </el-form-item>
        <el-form-item label="关联表单" v-if="data.formType==1"><!--虚拟表单才有-->
            <div ref="associatedForm">
                <el-button type="primary" icon="el-icon-search" circle
                           @click.native="toggleAssociatedForm()"></el-button>
                <el-tag v-for="tag in data.associatedForm"
                        :key="tag.id"
                        closable
                        @close="tagClose(tag)"
                        type="danger" size="mini" style="margin-left: 3px">
                    {{tag.formName}}
                </el-tag>
                <div class="associatedForm" v-show="showAssociatedForm" >
                    <cs-table :settings="tableSettings"
                              :table-data="tableData"
                              v-loading="associatedFormLoading"
                              @selectionChange="associatedFormSelectionChange"
                              @sortChange="associatedFormSortChange"
                              @pageSizeChange="associatedFormPageSizeChange">
                        <template v-slot:horizontalSlot>
                            <div class="operationNav">
                                <div></div>
                                <el-button-group class="search">
                                    <el-input placeholder="请输入表单名称" prefix-icon="el-icon-search"
                                              v-model="searchKeyWord" @keyup.enter.native="searchAssociatedForm"></el-input>
                                    <el-button type="primary" @click="searchAssociatedForm">搜索</el-button>
                                    <el-button type="primary" @click="certainAssociatedForm">确定</el-button>
                                </el-button-group>
                            </div>
                        </template>
                    </cs-table>
                </div>
            </div>
        </el-form-item>
        <el-form-item label="所属知识库">
            <el-select placeholder="--请选择--" v-model="data.knowledgeDir" :disabled="data.id != '' && data.mainId != ''">
                <el-option v-for="dir in knowledgeDirs" :key="dir.id" :label="dir.categoryName" :value="dir.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="表单排序" prop="sortTable">
            <el-input autocomplete="off" v-model.number="data.sortTable" ></el-input>
        </el-form-item>
        <el-button type="primary" class="saveBtn" :loading="savtBtnLoading" @click="submitForm">保存</el-button>
    </el-form>
</template>

<script>
    import _ from 'lodash'
    import request from '@/utils/request'

    let modelUrl = "/system/knowledgeFormController/";
    let formUrl = "/categoryTree/";

    export default {
        name: "Basic",
        props:["formData"],
        data(){
            const tableNameVlidator = ((rule, value, callback)=>{
                if(this.data.id=="")//新增时才做重复校验
                {
                    request({
                        url: `${modelUrl}findByTableName`,
                        method: 'post',
                        data:{tableName:this.data.tableName},
                    }).then(data=>{
                        if(data.status =="success")
                        {
                            if(data.content == "true"){
                                callback(new Error('数据库表名已存在！'));
                            }
                            else{
                                return callback();
                            }
                        }
                    }).catch(()=>{
                    })
                }
                else{
                    return callback();
                }
            })
            return{
                savtBtnLoading:false,
                knowledgeDirs:[],
                showAssociatedForm:false,
                associatedFormLoading:false,
                associatedFormSelection:[],
                searchKeyWord:"",
                data:_.cloneDeep(this.formData),
                rules:{
                    formName:[
                        {required: true, message: "请输入表单名称", trigger: "blur"}
                    ],
                    tableName:[
                        {required: true, message: "请输入数据库表名", trigger: "blur"},
                        {required: true, pattern:/(^[a-zA-Z][a-zA-Z0-9_]*$)/, message: "数据库表名必须以字母开头，只可包含字母、数字和下划线", trigger: "blur"},
                        {required: true, validator:tableNameVlidator, trigger: "blur"}
                    ],
                    sortTable: [
                        {required: true, message: "显示顺序不能为空", trigger: "blur"},
                        {type: 'number', message: '显示顺序只能为整数', trigger: 'blur'}
                    ]
                },
                tableSettings: {
                    radio:false,//是否单选
                    checkbox: true,//是否多选，单选和多选同一时间只能存在一个
                    height:220,//是否固定表头，表头的高度
                    pagination:true,//是否显示分页
                    total:0,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id",  visible: false},
                        {prop: "formName", label: "表单名称",width:200, sortable: true},
                        {prop: "tableName", label: "数据库表名",width:200},
                    ]
                },
                tableData:[],
            }
        },
        methods:{
            submitForm() {
                this.$refs['basicForm'].validate((valid) => {
                    if (valid) {
                        this.savtBtnLoading = true;
                        let data = _.cloneDeep(this.data);
                        if(this.data.formType==0)//实体表单
                        {
                            data.associatedForm = [];
                        }
                        let formType = data.mainId==""?"mainForm":"subForm";//判断本次操作是子表还是主表
                        let type = data.id==""?"append":"edit";//判断本次操作是新增还是编辑
                        request({
                            url: `${modelUrl}save`,
                            method: 'post',
                            data:data,
                        }).then(data=>{
                            if(data.status=="success")
                            {
                                if(type=="edit")//编辑
                                {
                                    this.$success("编辑成功");
                                }
                                else if(type=="append")
                                {
                                    if(formType == "mainForm")
                                        this.$success("新增成功,请开始表单配置");
                                    else
                                        this.$success("新增子表成功");
                                }
                                this.$emit("submitSuccess",{type:type,data:data.content.datas[0]});
                            }
                            this.savtBtnLoading = false;
                        });
                    } else {
                        return false;
                    }

                });
            },
            //region 关联表单
            toggleAssociatedForm(){
                this.showAssociatedForm= !this.showAssociatedForm;
                let data = {
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize,
                    condition:{
                        mainForm:"mainForm",
                        formType:0,
                        formName:"",
                        sort:"",
                        order:"",
                    }
                };
                this.loadAssociatedFormData(data);
               /* document.addEventListener('click', this.vanishAssociatedForm); // 给整个document添加监听鼠标事件，点击任何位置执行vanish方法*/
            },
 /*           vanishAssociatedForm(e) { // 取消鼠标监听事件
                if (!this.$refs.associatedForm.contains(e.target))//如果当前点击位置不是table
                {
                    this.showAssociatedForm = false;
                    document.removeEventListener('click', this.vanishAssociatedForm);
                }

            },*/
            searchAssociatedForm(){
                let data = {
                    page:"1",
                    rows:this.tableSettings.pageSize,
                    condition:{
                        mainForm:"mainForm",
                        formType:0,
                        formName:this.searchKeyWord,
                        sort:"",
                        order:"",
                    }
                };
                this.loadAssociatedFormData(data);
            },
            certainAssociatedForm(){
                let selection = _.concat(this.associatedFormSelection,this.data.associatedForm);//合并
                this.data.associatedForm = _.uniqBy(selection,"id");//去重
                this.showAssociatedForm = false;
            },
            associatedFormSelectionChange(selection){
                this.associatedFormSelection = selection;
            },
            associatedFormPageSizeChange({page,rows}){
                let data = {
                    page:page,
                    rows:rows,
                    condition:{
                        mainForm:"mainForm",
                        formType:0,
                        formName:this.searchKeyWord,
                        sort:"",
                        order:"",
                    }
                };
                this.loadAssociatedFormData(data);
            },
            associatedFormSortChange({sort, order}){
                let data = {
                    condition:{
                        mainForm:"mainForm",
                        formType:0,
                        formName:this.searchKeyword,
                        sort:sort,
                        order:order,
                    },
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize
                };
                this.loadAssociatedFormData(data);
            },
            loadAssociatedFormData(data) {
                this.associatedFormLoading = true;
                request({
                    url: `${modelUrl}loadData`,
                    method: 'post',
                    data:data,
                }).then(data=>{
                    this.associatedFormLoading = false;
                    let fileds = this.tableSettings.fields.map(f=>{
                        return f.prop;
                    });
                    this.$set(this.tableSettings,"total",data.content.total);
                    this.tableData =  data.content.datas.map(d=>{
                        return _.pick(d,fileds);
                    });
                });
            },
            tagClose(tag){
                let filterTags = this.data.associatedForm.filter(d=>{
                    return d.id!=tag.id;
                })
                this.$set(this.data,"associatedForm",filterTags);
            }
            //endregion
        },
        computed:{
            formTypeChange(){//监控formType的变化，变化时清除对应的校验信息
                return this.data.formType;
            }
        },
        watch:{
            formData:{
                handler(newVal){
                    this.data= _.cloneDeep(newVal);
                    if(this.$refs['basicForm'])//排除第一次加载组件时的情形
                        this.$refs['basicForm'].clearValidate();//切换的时候清空校验规则
                },
                deep:true
            },
            formTypeChange:{
                handler(newVal,oldVal){
                    if(this.$refs['basicForm'])//排除第一次加载组件时的情形
                        this.$refs['basicForm'].clearValidate(['tableName']);//切换的时候清空校验规则

                },
                deep:true
            }
        },
        mounted() {
            request({
                url: `${formUrl}get`,
                method: 'post',
                data:{id:""},
            }).then(data=>{
                return new Promise(resolve => {
                    request({
                        url: `${formUrl}get`,
                        method: 'post',
                        data:{id:data.content[0].id},
                    }).then(res=>{
                       resolve(res)
                    })
                })
            }).then(res=>{
                this.knowledgeDirs = res.content.map(r=>{
                    return  _.pick(r,["id","categoryName"]);
                })
            })
        }
    }
</script>

<style scoped>
    .associatedForm{
        top:40px;
        left:-1px;
        z-index:999;
        max-height: 500px;
        border: 1px solid #E4E7ED;
        background-color:#fff;
        border: 1px solid #E4E7ED;
    }
    .el-input{
        width: 203px;
    }
    .operationNav{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .search{
        display: flex;
        margin:5px 5px 5px 0px;
    }
    .saveBtn{
        float:right;
        margin-top: -10px;
    }
</style>
