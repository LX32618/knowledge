<template>
    <el-form :model="data" :rules="rules" ref="basicForm" :label-width="settings.lableWidth">
        <el-form-item label="名称"   prop="categoryName">
            <el-input autocomplete="off" v-model="data.categoryName" placeholder="请输入名称" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="类型" v-if="data.pid!=''" >
            <el-select  placeholder="请选择目录类型" v-model="data.type" :disabled="settings.formType=='basic'">
                <el-option label="知识库" :value=0 v-if="settings.formType=='basic' || data.isRoot"></el-option>
                <el-option label="分类" :value=1 v-if="!data.isRoot"></el-option>
                <el-option label="目录" :value=2 v-if="!data.isRoot"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="显示顺序" prop="sort">
            <el-input autocomplete="off" v-model.number="data.sort" placeholder="请输入显示顺序"></el-input>
        </el-form-item>
        <el-form-item label="关联表单"  v-if="data.type==2"  >
            <div ref="associatedForm" style="width:203px;">
                <el-popover
                        v-model="showAssociatedFormTable"
                        placement="bottom"
                        trigger="click">
                    <cs-table :settings="tableSettings"
                              :table-data="tableData"
                              v-loading="associatedFormLoading"
                              @currentChange="associatedFormCurrentChange"
                              @sortChange="associatedFormSortChange"
                              @pageSizeChange="associatedFormPageSizeChange">
                        <template v-slot:horizontalSlot>
                            <div class="operationNav" >
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
                    <el-input slot="reference"
                              placeholder="请选择"
                              v-model="data.formName"
                              size="small"
                              readonly="readonly"
                              :suffix-icon="showAssociatedFormTable?'el-icon-arrow-up':'el-icon-arrow-down'">
                    </el-input>
                </el-popover>
            </div>
        </el-form-item>
        <el-form-item label="标签分类选择" v-if="data.type==2">
            <el-popover
                    v-model="showLabelClassification"
                    width="300"
                    placement="bottom"
                    trigger="click">
                <div>
                    <cs-lazytree  :settings="treeSettings" :dataFormat="treeDataFormat" @checkChange="labelCheckChange" style="overflow: auto;height: 250px;"></cs-lazytree>
                    <el-button type="primary" size="mini" style="float: right;margin:0px 3px 3px 0px" @click="certainLabel">确定</el-button>
                </div>

                <el-button type="primary" icon="el-icon-search" circle slot="reference"></el-button>
            </el-popover>
            <el-tag v-for="tag in data.labelInfo"
                    :key="tag.id"
                    closable
                    @close="tagClose(tag)"
                    type="danger" size="mini" style="margin-left: 3px">
                {{tag.name}}
            </el-tag>
        </el-form-item>
        <el-form-item label="密级">
            <el-select  placeholder="请选择密级" v-model="data.secretLevel">
                <el-option label="内部" :value=20></el-option>
                <el-option label="秘密" :value=30></el-option>
                <el-option label="机密" :value=40></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="知识库图片" v-if="data.pid=='' || data.type==0">
            <div class="pic">
                <el-popover placement="bottom-end" trigger="click">
                    <icon-wall @selectIconChange="selectIconChange"></icon-wall>
                    <el-button type="primary" icon="el-icon-picture" circle slot="reference"></el-button>
                </el-popover>
                <i :class="data.picture" style="font-size: 40px;margin-left: 5px;"></i>
            </div>
        </el-form-item>
        <el-form-item label="是否启用">
            <el-switch v-model="data.enable" :active-value=0 :inactive-value=-1></el-switch>
        </el-form-item>
        <el-form-item label="是否开启邮件" v-if="data.type==2" v-show="false">
            <el-switch v-model="data.isSentMail" :active-value=1 :inactive-value=0></el-switch>
        </el-form-item>
        <el-form-item label="说明">
            <el-input type="textarea" :autosize="{ minRows: 5}" v-model="data.remark" maxlength="500" show-word-limit></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <p :style="{textIndent:'2em'}"><i class="element-icons el-custom-files"></i>(分类)：表示该目录类型下还可以添加子分类和目录，不能挂知识文档</p>
        <p :style="{textIndent:'2em'}"><i class="element-icons el-custom-file"></i>(目录)：表示该目录类型下不能再添加子目录和分类了，能够挂知识文档</p>
        <el-button type="primary" :style="{float:'right',marginTop:'-10px',marginRight:'5%'}" :loading="submitBtnLoading" @click="submitForm">保存</el-button>
    </el-form>
</template>

<script>
    import _ from 'lodash'
    import iconWall from '@/views/bms/components/IconWall'
    import request from '@/utils/request'
    import {treeRequset} from '@/utils/request'
    import {mapGetters} from "vuex";

    let labelUrl = "/app-zuul/treeManage/tree/authcenter/api/labelTree/";
    let formUrl = "/system/knowledgeFormController/";
    let knowListUrl = "/categoryTree/";


    export default {
        name: "Basic",
        props:{
            settings:{
                type: Object
            },
            formData:{
                type:Object,
                default: {
                    pid: "",
                    id: "",
                    type:""
                }
            }
        },
        data(){
            return {
                data:_.cloneDeep(this.formData),
                submitBtnLoading:false,
                associatedFormLoading:false,
                showAssociatedFormTable:false,
                showLabelClassification:false,
                searchKeyWord:"",
                selectedIcon:"",//选中的icon
                selectedLabel:[],//选中的label\
                selectedAssociatedFormTable:{},
                treeSettings:{
                    root_id:"",//根节点id
                    expand_root:true,//是否默认展开根节点
                    check_strictly:true,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                    default_expand_all:false,//是否默认展开所层级
                    show_checkbox:true,//是否有checkbox
                    show_radio: false,//是否有单选radio
                    expand_on_click_node:false,//点击接点是否进行展开收缩
                    right_click:false,//是否具有右键功能
                    request:{//访问路径设置
                        url:`${labelUrl}get`,
                        method:"post"
                    }
                },
                tableSettings: {
                    radio:true,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    height:250,//是否固定表头，表头的高度
                    pagination:true,//是否显示分页
                    total:0,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id",  visible: false},
                        {prop: "formName", label: "表单名称",width:200, sortable: true},
                        {prop: "tableName", label: "数据库表名",width:200},
                        {prop: "formType", label: "表单类型",width:200,
                            formatter(index,row)
                            {
                                return row.formType=="0"?"实体表单":"虚拟表单";
                            }
                        }
                    ]
                },
                tableData:[],
                rules: {
                    categoryName: [
                        {required: true, message: "名称不能为空", trigger: "blur"}
                    ],
                    sort: [
                        {required: true, message: "显示顺序不能为空", trigger: "blur"},
                        {type: 'number', message: '显示顺序只能为整数', trigger: 'blur'}
                    ]
                }
            }
        },
        watch:{
            formData:{
                handler(newVal,oldVal){
                    this.data = _.cloneDeep(newVal);
                    if(this.settings.formType=="append")
                    {
                        if(newVal.isRoot)
                            this.data.type = 0;//根节点下新增是知识库
                        else
                            this.data.type = 1;//新增默認是分類
                    }

                    let data = {
                        page:this.tableSettings.currentPage,
                        rows:this.tableSettings.pageSize,
                        condition:{
                            mainForm:"mainForm",
                            formType:"",
                            formName:"",
                            sort:"",
                            order:"desc"
                        }
                    };
                    this.loadAssociatedFormData(data);
                    if(this.$refs['basicForm'])//排除第一次加载组件时的情形
                        this.$refs['basicForm'].clearValidate();//切换的时候清空校验规则
                },
                deep:true,
                immediate:true
            }
        },
        methods:{
            submitForm() {
                this.data.name = this.data.categoryName;
                this.$refs['basicForm'].validate((valid) => {
                    if (valid) {
                        /*this.submitBtnLoading = true;*/
                        this.submitBtnLoading = true;
                        request({
                            url: `${knowListUrl}save`,
                            method: 'post',
                            data:this.data,
                        }).then(data=>{
                            if(data.status == "success")
                            {
                                this.$success("保存成功");
                                console.log(this.data);
                                this.$emit("submitSuccess",{type:this.settings.formType,data:this.data});
                            }
                            else
                            {
                                this.$error(data.message);
                            }
                            this.submitBtnLoading = false;
                        })
                      /*  this.submitBtnLoading = false;*/
                    } else {
                        return false;
                    }
                });
            },
            treeDataFormat({node,data}){
                const temp = _.cloneDeep(data);
                let formatData = temp.map((item,index,arr)=>{
                    let pid = item.pid;
                    if(this.treeSettings.root_id == pid){//如果是根节点
                        item.showCheckBox = false;
                    }
                    else if(item.isLeaf)
                    {
                        item.showCheckBox = false;
                    }
                    else{
                        item.showCheckBox = true;
                    }
                    return item;
                })
                return formatData;
            },
            //region 关联表单方法
            associatedFormCurrentChange(currentRow){
                this.selectedAssociatedFormTable.formId = currentRow.id;
                this.selectedAssociatedFormTable.formName = currentRow.formName;
            },
            associatedFormSortChange({sort, order}){
                let data = {
                    condition:{
                        mainForm:"mainForm",
                        formType:"",
                        formName:this.searchKeyword,
                        sort:sort,
                        order:order,
                    },
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize
                };
                this.loadAssociatedFormData(data);
            },
            associatedFormPageSizeChange({page,rows}){
                let data = {
                    page:page,
                    rows:rows,
                    condition:{
                        mainForm:"mainForm",
                        formType:"",
                        formName: this.searchKeyWord,
                        sort:"",
                        order:"desc"
                    }
                };
                this.loadAssociatedFormData(data);
            },
            certainAssociatedForm(){
                this.$set(this.data,"formId",this.selectedAssociatedFormTable.formId);
                this.$set(this.data,"formName", this.selectedAssociatedFormTable.formName);

                this.showAssociatedFormTable = false;
            },
            searchAssociatedForm(){
                let keyWord = this.searchKeyWord;
                let data = {
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize,
                    condition:{
                        mainForm:"mainForm",
                        formType:"",
                        formName:keyWord,
                        sort:"",
                        order:"desc"
                    }
                };
                this.loadAssociatedFormData(data);
            },
            loadAssociatedFormData(data) {
                this.associatedFormLoading = true;
                request({
                    url: `${formUrl}loadData`,
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
            //endregion
            //region 标签选择方法
         /*   toggleLabelClassification(){
                this.showLabelClassification = !this.showLabelClassification;
            },*/
            certainLabel(){
                let selection = _.concat(this.data.labelInfo,this.selectedLabel);//合并
                this.data.labelInfo = _.uniqBy(selection,"id");//去重
                this.showLabelClassification = !this.showLabelClassification;
            },
            labelCheckChange(data){
                let temp = data.map(d=>{
                    return _.pick(d,['id','name']);
                });
                this.$set(this,"selectedLabel",temp);
            },
            //endregion
            selectIconChange(val){
                this.data.picture = val;
            },
            tagClose(tag){
                let filterTags = this.data.labelInfo.filter(d=>{
                    return d.id!=tag.id;
                })
                this.$set(this.data,"labelInfo",filterTags);
            }

        },
        components:{
            iconWall
        }
    }
</script>

<style scoped>
    .el-input{
        width: 203px;
    }
    .pic{
        display: flex;
        flex-direction: row;
        align-items: center;
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
</style>
