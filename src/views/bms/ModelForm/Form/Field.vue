<template>
    <el-form :model="data" :rules="rules" ref="fieldForm" label-width="100px"  >
        <el-form-item label="显示名称" prop="displayName">
            <el-input autocomplete="off" placeholder="请输入显示名称" v-model="data.displayName"></el-input>
        </el-form-item>
        <el-form-item label="字段名称" prop="fieldName">
            <el-input autocomplete="off" placeholder="请输入字段名称" v-model="data.fieldName" :disabled="data.id != ''"></el-input>
        </el-form-item>
        <el-form-item label="显示类型">
            <el-select placeholder="--请选择--" v-model="data.htmlType" @change="htmlTypeChange" value-key="value" :disabled="data.id != ''">
                <el-option v-for="h in htmlType" :key="h.value" :label="h.label" :value="h.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="字段类型" v-if="showFiledType" prop="fieldType">
            <div ref="fieldType">
         <!--       <el-select placeholder="&#45;&#45;请选择&#45;&#45;" v-model="data.fieldType" @change="textFieldTypeChange" v-if="data.htmlType == 0" :disabled="data.id != ''">&lt;!&ndash;编辑或者子表新增时不能修改&ndash;&gt;
                    <el-option v-for="f in textFieldType" :key="f.value" :label="f.label" :value="f.value"></el-option>
                </el-select>-->
                <div v-if="data.htmlType == 1 || data.htmlType == 3 || data.htmlType == 8">
                    <el-button type="primary" icon="el-icon-search" circle @click.native="toggleDictionary"></el-button>
                    <el-tag type="danger" size="mini" style="margin-left: 3px" v-if="data.fieldType != ''">
                        {{data.fieldTypeName}}
                    </el-tag>
                </div>
                <div v-else>
                    <el-button type="primary" icon="el-icon-search" circle @click.native="toggleBrowseBtn"></el-button>
                    <el-tag type="danger" size="mini" style="margin-left: 3px" v-if="data.fieldType != ''">
                        {{data.fieldTypeName}}
                    </el-tag>
                </div>
                <div class="dictionary" v-if="showDictionary" style="width: 60%;">
                    <cs-lazytree ref="dictTree" :settings="dictTreeSettings" :dataFormat="dictDataFormat" @checkChange="dictCheckChange" style="overflow: auto;height: 250px;"></cs-lazytree>
                    <div style="width: 100%;text-align: right">
                        <el-button type="primary" size="mini" style="margin:0px 3px 3px 0px" @click="certainDict">确定</el-button>
                    </div>
                </div>
                <div class="browseBtn" v-if="showBrowseBtn">
                    <cs-table :settings="browseBtnTableSettings"
                              :table-data="browseBtnTableData"
                              v-loading="browseBtnLoading"
                              @currentChange="browseBtnCurrentChange"
                              @sortChange="browseBtnSortChange"
                              @pageSizeChange="browseBtnPageSizeChange">
                        <template v-slot:horizontalSlot>
                            <div class="operationNav">
                                <div></div>
                                <el-button-group class="search">
                                    <el-input placeholder="请输入表单名称" prefix-icon="el-icon-search"
                                              v-model="browseBtnKeyWord" @keyup.enter.native="searchBrowseBtn"></el-input>
                                    <el-button type="primary" @click="searchBrowseBtn">搜索</el-button>
                                    <el-button type="primary" @click="certainBrowseBtn">确定</el-button>
                                </el-button-group>
                            </div>
                        </template>
                    </cs-table>
                </div>
            </div>
        </el-form-item>
<!--        <el-form-item label="字段长度" v-if="data.htmlType == 0 && data.fieldType == 0">
            <el-input-number v-model="data.fieldLength" :disabled="data.id != ''" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="精确位数" v-if="data.htmlType == 0 && data.fieldType == 2" prop="fieldFixed">
            <el-input-number v-model="data.fieldFixed" :disabled="data.id != ''" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="是否可多选" v-if="data.htmlType == 4 || data.htmlType == 5">
            <el-switch v-model="data.isMulti"  active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="默认高度" v-if="data.htmlType == 9" prop="height">
            <el-input-number v-model="data.height" :precision="2" :step="0.1" :min="0"></el-input-number>%
        </el-form-item>
        <el-form-item label="默认宽度" v-if="data.htmlType == 9" prop="width">
            <el-input-number v-model="data.width" :precision="2" :step="0.1" :min="0"></el-input-number>%
        </el-form-item>
        <el-form-item label="字段验证" v-if="data.htmlType == 11">
            <el-input autocomplete="off"  v-model="data.fieldCheck"></el-input>
        </el-form-item>-->
        <el-button type="primary" class="saveBtn"  @click="submitForm" :loading="submitBtnLoading">保存</el-button>
    </el-form>
</template>

<script>
    let dictUrl = '/app-zuul/treeManage/tree/authcenter/api/dicTree/';
    let modelUrl = '/knowledgeModel/knowledgeFormField/';
    let viewBtnUrl = '/SysRefObjServer/';
    import request from '@/utils/request';


    export default {
        name: "Field",
        props:["fieldData"],
        data(){
            const fieldNameVlidator = ((rule, value, callback)=>{
                if(this.data.id == ""){//新增是才进行重复校验
                    request({
                        url: `${modelUrl}check`,
                        method: 'post',
                        data:{formId:this.fieldData.formId,fieldName:this.data.fieldName},
                    }).then(data=>{
                        if(data.status =="success")
                        {
                            if(data.content){
                                callback(new Error('该字段名称已存在！'));
                            }
                            else
                            {
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
            return {
                data:_.cloneDeep(this.fieldData),
                submitBtnLoading:false,
                showDictionary:false,
                showBrowseBtn:false,
                browseBtnLoading:false,
                selectedFiledType:"",
                selectedFiledTypeName:"",
  /*              textFieldType:[
                    {label:"文本",value:0},
                    {label:"整数",value:1},
                    {label:"小数",value:2}
                ],*/
                htmlType:[
                    {label:"文本框",value:0},
                    {label:"单选框",value:1},
                    {label:"开关",value:2},
                    {label:"下拉列表",value:3},
                    {label:"附件",value:4},
                    {label:"图片",value:5},
                    {label:"浏览按钮",value:6},
  /*                  {label:"浏览按钮多选",value:7},*/
                    {label:"复选框组",value:8},
                    {label:"多行文本",value:9},
                    {label:"日期",value:11},
                    {label:"超链接",value:13},
                ],
                dictTreeSettings:{
                    root_id:"",//根节点id
                    expand_root:true,//是否默认展开根节点
                    check_strictly:true,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                    default_expand_all:false,//是否默认展开所层级
                    show_checkbox:false,//是否有checkbox
                    show_radio: true,//是否有单选radio
                    expand_on_click_node:false,//点击接点是否进行展开收缩
                    right_click:false,//是否具有右键功能
                    request:{//访问路径设置
                        url:`${dictUrl}get`,
                        method:"post"
                    }
                },
                browseBtnKeyWord:"",
                browseBtnTableSettings:{
                    radio:true,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    height:220,//是否固定表头，表头的高度
                    pagination:true,//是否显示分页
                    total:0,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id",  visible: false},
                        {prop: "refName", label: "名称", sortable: true},
                        {prop: "keyField", label: "标识字段"},
                        {prop: "viewField", label: "显示字段"},
                        {prop: "isMulti", label: "多选",
                            formatter(index,row)
                            {
                                return row.isMulti==0?"否":"是";
                            }},
                    ]
                },
                browseBtnTableData:[],
                rules:{
                    displayName:[
                        {required: true, message: "请输入显示名称", trigger: "blur"}
                    ],
                    fieldName:[
                        {required: true, message: "请输入字段名称", trigger: "blur"},
                        {required: true, pattern:/(^[a-zA-Z][a-zA-Z0-9_]*$)/, message: "字段名称必须以字母开头，只可包含字母、数字和下划线", trigger: "blur"},
                        {required: true, validator:fieldNameVlidator, trigger: "blur"}
                    ],
                    fieldType:[
                        {required: true, message: "请选择字段类型",trigger:"blur"},
                    ]
                },
            }
        },
        computed:{
            //this.data.htmlType != '' &&
          showFiledType(){
              let flag = this.data.htmlType != undefined && this.data.htmlType != 0
                  && this.data.htmlType != 2 && this.data.htmlType != 4 && this.data.htmlType != 5 &&
                  this.data.htmlType != 9 && this.data.htmlType != 11 && this.data.htmlType != 13;
              return flag;
          }
        },
        watch:{
            fieldData:{
                handler(newVal){
                    this.data= _.cloneDeep(newVal);
                    console.log(newVal);
                    if(this.$refs['fieldForm'])//排除第一次加载组件时的情形
                        this.$refs['fieldForm'].clearValidate();//切换的时候清空校验规则
                },
                deep:true
            },
        },
        methods:{
            htmlTypeChange(data){
                this.showBrowseBtn = false;
                this.showDictionary = false;
                this.data.fieldType = "";
                this.data.fieldTypeName = "";
                this.data.htmlType = data;
                this.data.htmlTypeName = this.htmlType.find(h=>  h.value == data).label;
                if(data == 2)
                {
                    this.data.fieldType = "";
                    this.data.fieldTypeName = "是、否";                }
                else /*if(data == "4" || data == "5" || data == "9" || data == "11" || data == "13")*/
                {
                    this.data.fieldType = "";
                    this.data.fieldTypeName = "";
                }

            },
    /*        textFieldTypeChange(data){
                this.data.fieldType = data;
                this.data.fieldTypeName = this.textFieldType.find(t=>t.value == data).label;
            },*/
            submitForm(){
                this.$refs['fieldForm'].validate((valid) => {
                    if (valid) {
                        this.submitBtnLoading = true;
                        let data = _.cloneDeep(this.data);
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
                                    this.$success("新增成功");
                                }
                                this.$emit("submitSuccess",{type:type,data:data.content});
                            }
                            this.submitBtnLoading = false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            toggleDictionary(){
              this.showDictionary = !this.showDictionary;
            },
            toggleBrowseBtn(){
                let data = {
                    page:this.browseBtnTableSettings.currentPage,
                    rows:this.browseBtnTableSettings.pageSize,
                    condition:{
                        refName:"",
                        isMulti:this.data.htmlType == 6?0:this.data.htmlType==7?1:-1
                    }
                };
                this.loadBrowseBtnData(data);
                this.browseBtnKeyWord = "";
                this.showBrowseBtn = !this.showBrowseBtn;
            },
            dictDataFormat({node,data}){
                const temp = _.cloneDeep(data);
                let formatData = temp.map((item,index,arr)=>{
                    item.right_click_option  = {};
                    if(item.isLeaf){
                        item.showCheckBox = false;
                    }
                    else{
                        item.showCheckBox = true;
                    }
                    return item;
                });
                return formatData;
            },
            dictCheckChange(selection){
                this.selectedFiledType = selection[0].id;
                this.selectedFiledTypeName = selection[0].name;
            },
            certainDict(){
                this.data.fieldType = this.selectedFiledType;
                this.data.fieldTypeName = this.selectedFiledTypeName;
                this.showDictionary = false;
            },
            browseBtnCurrentChange(currentRow){
                this.selectedFiledType = currentRow.id;
                this.selectedFiledTypeName = currentRow.refName;
            },
            browseBtnSortChange({sort, order}){
                let data = {
                    condition:{
                        isMulti:this.data.htmlType == 6?0:this.data.htmlType==7?1:-1,
                        refName:this.searchKeyword,
                        sort:sort,
                        order:order,
                    },
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize
                };
                this.loadAssociatedFormData(data);
            },
            browseBtnPageSizeChange({page,rows}){
                let data = {
                    page:page,
                    rows:rows,
                    condition:{
                        refName:this.browseBtnKeyWord,
                        isMulti:this.data.htmlType == 6?0:this.data.htmlType==7?1:-1
                    }
                };
                this.loadBrowseBtnData(data);
            },
            searchBrowseBtn(){
                let data = {
                    page:"1",
                    rows:this.browseBtnTableSettings.pageSize,
                    condition:{
                        refName:this.browseBtnKeyWord,
                        isMulti:this.data.htmlType == 6?0:this.data.htmlType==7?1:-1
                    }
                };
                this.loadBrowseBtnData(data);
            },
            certainBrowseBtn(){
                this.data.fieldType = this.selectedFiledType;
                this.data.fieldTypeName = this.selectedFiledTypeName;
                this.showBrowseBtn = false;
            },
            loadBrowseBtnData(data){
                this.browseBtnLoading = true;
                request({
                    url: `${viewBtnUrl}get`,
                    method: 'post',
                    data:data,
                }).then(data=>{
                    let fileds = this.browseBtnTableSettings.fields.map(f=>{
                        return f.prop;
                    });
                    this.$set(this.browseBtnTableSettings,"total",data.content.total);
                    this.browseBtnTableData =  data.content.datas.map(d=>{
                        return _.pick(d,fileds);
                    });
                    this.browseBtnLoading = false;
                });
            }

        }
    }
</script>

<style scoped>
    .el-input{
        width: 203px;
    }
    .saveBtn{
        float:right;
        margin-top: -10px;
    }
    .dictionary,.browseBtn{
        top:40px;
        left:-1px;
        z-index:999;
        max-height: 500px;
        border: 1px solid #E4E7ED;
        background-color:#fff;
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
