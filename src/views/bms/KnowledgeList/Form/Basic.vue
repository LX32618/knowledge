<template>
    <el-form :model="data" :rules="rules" ref="basicForm" :label-width="settings.lableWidth" v-loading ="basicFormLoading">
        <el-form-item label="名称"   prop="categoryName">
            <el-input autocomplete="off" v-model="data.categoryName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="目录类型" v-if="data.pid!=''" >
            <el-select  placeholder="请选择目录类型" v-model="data.type" :disabled="settings.formType=='basic'">
                <el-option label="知识库" value="0" v-if="settings.formType=='basic'"></el-option>
                <el-option label="分类" value="1"></el-option>
                <el-option label="目录" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="显示顺序" prop="sort">
            <el-input autocomplete="off" v-model.number="data.sort" placeholder="请输入显示顺序"></el-input>
        </el-form-item>
        <el-form-item label="关联表单"  v-if="data.type=='2'"  >
            <div ref="associatedForm" style="width:203px;">
                <el-input
                        placeholder="请选择"
                        v-model="data.formName"
                        size="small"
                        readonly="readonly"
                        :suffix-icon="showAssociatedFormTable?'el-icon-arrow-up':'el-icon-arrow-down'"
                        @click.native="toggleAssociatedFormTable()">
                </el-input>
                <div class="associatedFormTable" v-show="showAssociatedFormTable">
                    <cs-table :settings="tableSettings"
                              :table-data="tableData"
                              v-loading="associatedFormLoading"
                              @currentChange="associatedFormCurrentChange"
                              @pageSizeChange="associatedFormPageSizeChange">
                        <template v-slot:horizontalSlot>
                            <div class="operationNav" >
                                <div></div>
                                <el-button-group class="search">
                                    <el-input placeholder="请输入表单名称" prefix-icon="el-icon-search"
                                              v-model="searchKeyWord"></el-input>
                                    <el-button type="primary" @click="searchAssociatedForm">搜索</el-button>
                                    <el-button type="primary" @click="certainAssociatedForm">确定</el-button>
                                </el-button-group>
                            </div>
                        </template>
                    </cs-table>
                </div>
            </div>
        </el-form-item>
        <el-form-item label="标签分类选择" v-if="data.type=='2'">
            <div ref="labelClassification">
                <el-button type="primary" icon="el-icon-search" circle
                           @click.native="toggleLabelClassification()"></el-button>
                <el-tag v-for="tag in data.labelInfo"
                        :key="tag.id"
                        closable
                        @close="tagClose(tag)"
                        type="danger" size="mini" style="margin-left: 3px">
                    {{tag.name}}
                </el-tag>
                <div class="labelClassification" v-show="showLabelClassification">
                    <cs-lazytree :settings="treeSettings" :dataFormat="treeDataFormat"
                                 @checkChange="labelCheckChange"></cs-lazytree>
                    <el-button type="primary" size="mini" style="float: right;margin:0px 3px 3px 0px" @click="certainLabel">确定</el-button>
                </div>
            </div>
        </el-form-item>
        <el-form-item label="密级">
            <el-select  placeholder="请选择密级" v-model="data.secretLevel">
                <el-option label="非密" value="10"></el-option>
                <el-option label="内部" value="20"></el-option>
                <el-option label="秘密" value="30"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="知识库图片" v-if="data.pid=='' || data.type=='0'">
            <div class="pic">
                <el-popover placement="bottom-end" trigger="click">
                    <icon-wall @selectIconChange="selectIconChange"></icon-wall>
                    <el-button type="primary" icon="el-icon-picture" circle slot="reference"></el-button>
                </el-popover>
                <i :class="data.picture" style="font-size: 40px;margin-left: 5px;"></i>
            </div>
        </el-form-item>
        <el-form-item label="是否启用">
            <el-switch v-model="data.enable" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="是否开启邮件" v-if="data.type=='2'">
            <el-switch v-model="data.isSentMail" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="说明">
            <el-input type="textarea" :autosize="{ minRows: 2}" v-model="data.remark"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <p :style="{textIndent:'2em'}"><i class="element-icons el-custom-files"></i>(分类)：表示该目录类型下还可以添加子分类和目录，不能挂知识文档</p>
        <p :style="{textIndent:'2em'}"><i class="element-icons el-custom-file"></i>(目录)：表示该目录类型下不能再添加子目录和分类了，能够挂知识文档</p>
        <el-button type="primary" :style="{float:'right',marginTop:'-10px'}" @click="submitForm">保存</el-button>
    </el-form>
</template>

<script>
    import _ from 'lodash'
    import iconWall from '@/views/bms/components/IconWall'
    import request from '@/utils/request'

    let knowListUrl = "/api/knowlist/";
    let labelUrl = "/api/tag/";
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
                    pid: "",
                    id: "",
                    type:""
                }
            }
        },
        data(){
            return {
                data:{
                    pid: this.formData.pid,
                    id: this.formData.id,
                    categoryName: "",
                    categoryCode:"",
                    createDate:"",
                    createUser:"",
                    type:this.formData.type,//目录类型 (0.知识库，1.分类，2.目录)
                    sort:0,
                    formId:"",
                    formName:"",
                    labelId:"",
                    labelName:"",
                    picture:"",
                    secretLevel:"20",
                    isSentMail:"",//是否开启邮件（0否1是）
                    enable:"",//是否开启邮件（0否1是）
                    remark:""
                },
                basicFormLoading:false,
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
                    if(this.settings.type="append")
                        this.data.type = "1";//新增默認是分類
                    let data = {
                        formName:"",
                        sort:"",
                        order:"",
                        page:this.tableSettings.currentPage,
                        rows:this.tableSettings.pageSize
                    };
                    this.loadAssociatedFormData(data);
                    if(this.settings.formType == "basic")//新增的时候不加载数据
                    {
                        this.loadFormData(this.data.id);
                    }
                    if(this.$refs['basicForm'])//排除第一次加载组件时的情形
                        this.$refs['basicForm'].clearValidate();//切换的时候清空校验规则
                },
                deep:true,
                immediate:true
            }
        },
        methods:{
            submitForm() {
                this.$refs['basicForm'].validate((valid) => {
                    if (valid) {
                        this.basicFormLoading = true;
                        request({
                            url: `${knowListUrl}save`,
                            method: 'post',
                            data:this.data,
                        }).then(data=>{
                            if(data.status == "success")
                            {
                                this.$success("保存成功");
                                this.$emit("submitSuccess",{type:this.settings.formType,data:this.data});
                                this.basicFormLoading = false;
                            }
                            else
                            {
                                this.$error(data.message);
                            }
                        }).catch()
                        {

                        };
                    } else {
                        return false;
                    }
                });
            },
            loadFormData(){
                this.associatedFormLoading = true;
                request({
                    url: `${knowListUrl}get`,
                    method: 'post',
                    data:{id:this.data.id},
                }).then(data=>{
                    this.data = data.content
                    this.data.sort = Number(this.data.sort);
                    this.associatedFormLoading = false;
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
                this.selectedAssociatedFormTable.formId = currentRow.formId;
                this.selectedAssociatedFormTable.formName = currentRow.formName;
               /* this.$set(this.data,"formId",currentRow.formId);
                this.$set(this.data,"formName",currentRow.formName);*/
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
            toggleAssociatedFormTable(){
                this.showAssociatedFormTable = !this.showAssociatedFormTable;
                //document.addEventListener('click', this.vanishAssociatedFormTable); // 给整个document添加监听鼠标事件，点击任何位置执行vanish方法
            },
   /*         vanishAssociatedFormTable(e) { // 取消鼠标监听事件
                if (!this.$refs.associatedForm.contains(e.target))//如果当前点击位置不是table
                {
                    this.showAssociatedFormTable = false;
                    document.removeEventListener('click', this.vanishAssociatedFormTable);
                }
            },*/
            certainAssociatedForm(){
                this.$set(this.data,"formId",this.selectedAssociatedFormTable.formId);
                this.$set(this.data,"formName", this.selectedAssociatedFormTable.formName);
                this.showAssociatedFormTable = false;
            },
            searchAssociatedForm(){
                let keyWord = this.searchKeyWord;
                let data = {
                    formName:keyWord,
                    sort:"",
                    order:"",
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize
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
                    this.$set(this.tableSettings,"total",data.content.total);
                    this.tableData =  data.content.rows.map(d=>{
                        return _.pick(d,fileds);
                    });
                });
            },
            //endregion
            //region 标签选择方法
            toggleLabelClassification(){
                this.showLabelClassification = !this.showLabelClassification;
            },
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
    .associatedFormTable,.labelClassification{
        position:absolute;
        top:40px;
        left:-1px;
        z-index:999;
        max-height: 500px;
        border: 1px solid #E4E7ED;
        background-color:#fff
    }
    .labelClassification{
        overflow: auto;
        width: 300px;
    }
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
