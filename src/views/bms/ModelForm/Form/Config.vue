<template>
    <div class="config box" v-loading="loading" ><!--v-if="Object.keys(data).length != 0"-->
        <div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b>{{data.formName}}-主表信息</b>
                </div>
                <div>
                    <cs-table :settings="tableSettings"
                              :table-data="data.datas">
                        <template v-slot:horizontalSlot>
                                <el-button type="primary" class="appendBtn" size="mini" round @click.native="appendFormFiled(data.id)">添加字段</el-button>
                        </template>
                       <template v-slot:suffix-column>
                            <el-table-column label="编辑" width="50">
                                <template slot-scope="scope">
                                    <el-button type="text" icon="el-icon-edit" size="mini"  @click.native.prevent="editFormFiled(scope.$index,scope.row,data.id)">
                                    </el-button>
                                </template>
                            </el-table-column>
                        </template>
                    </cs-table>
                </div>
            </el-card>
        </div>
        <div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b>{{data.formName}}-子表信息</b>
                    <el-button-group>
                        <el-tooltip class="item" effect="dark" content="添加子表" placement="right">
                            <el-button type="text" icon="el-icon-circle-plus-outline" style="font-size: 16px;" @click.native="appendSubForm()"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item"  content="编辑子表" placement="right" v-if="Object.keys(data).length != 0 && data.subForm.length != 0">
                            <el-button type="text" icon="el-icon-edit" style="font-size: 16px;" @click.native="editSubForm()"></el-button>
                        </el-tooltip>
                    </el-button-group>
                </div>
                <div v-if="Object.keys(data).length != 0 && data.subForm.length != 0">
                    <el-tabs v-model="activeName"  type="border-card" class="subForm">
                        <el-tab-pane v-for="tab in data.subForm" :key="tab.id" :label="tab.formName" :name="tab.id">
                            <cs-table :settings="tableSettings"
                                      :table-data="tab.datas">
                                <template v-slot:horizontalSlot>
                                    <el-button type="primary"  class="appendBtn" size="small" round @click.native="appendFormFiled(activeName)">添加字段</el-button>
                                </template>
                                <template v-slot:suffix-column>
                                    <el-table-column
                                            label="编辑"
                                            width="50">
                                        <template slot-scope="scope">
                                            <el-button type="text" icon="el-icon-edit" size="small" @click.native.prevent="editFormFiled(scope.$index,scope.row,activeName)">
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </template>
                            </cs-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div v-else>
                    <h4>暂未添加表单，请先添加子表</h4>
                </div>
            </el-card>
        </div>
        <el-dialog title="添加子表" :visible.sync="appendSubFormVisible" :close-on-click-modal="false" append-to-body>
            <basic :formData="appendSubFormData" @submitSuccess="submitSubFormSuccess"></basic>
        </el-dialog>

        <el-dialog title="编辑子表" :visible.sync="editSubFormVisible" :close-on-click-modal="false" append-to-body>
            <basic :formData="editSubFormData" @submitSuccess="submitSubFormSuccess"></basic>
        </el-dialog>

        <el-dialog title="添加字段" :visible.sync="appendFieldVisible" :close-on-click-modal="false" append-to-body>
            <field :field-data="appendFormFiledData" @submitSuccess="submitFiledSuccess"></field>
        </el-dialog>

        <el-dialog title="编辑字段" :visible.sync="editFieldVisible" :close-on-click-modal="false" append-to-body>
            <field :field-data="editFormFiledData" @submitSuccess="submitFiledSuccess"></field>
        </el-dialog>
    </div>
</template>

<script>
    import _ from 'lodash'
    import request from '@/utils/request'
    import Basic from "./Basic";
    import Field from "./Field"

    let modelSubFormUrl = "/api4/app/authcenter/api/knowledgeModel/knowledgeFormField/";
    export default {
        name: "Config",
        components: {Field, Basic},
        props:["id"],
        data(){
            return {
                activeName:"",
                loading:false,
                appendSubFormVisible:false,
                editSubFormVisible:false,
                appendFieldVisible:false,
                editFieldVisible:false,
                tableSettings: {
                    radio:false,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    pagination:false,//是否显示分页
                    fields: [
                        {prop: "id", label: "id",  visible: false},
                        {prop: "displayName", label: "显示名称"},
                        {prop: "fieldName", label: "字段名称"},
                        {prop: "htmlTypeName", label: "显示类型"},
                        {prop: "htmlType", label: "显示类型Id",visible:false},
                        {prop: "fieldTypeName", label: "字段类型"},
                        {prop: "fieldType", label: "字段类型Id",visible:false},
                        {prop: "fieldLength", label: "字段长度"},
                        {prop: "fieldFixed", label: "精度"},
                        {prop: "isMulti", label: "是否多选",visible:false},
                        {prop: "fieldCheck", label: "字段验证",visible:false},
                        {prop: "height", label: "高度",visible:false},
                        {prop: "width", label: "宽度",visible:false}
                    ]
                },
                data:{},
                appendSubFormData:{},
                editSubFormData:{},
                appendFormFiledData:{},
                editFormFiledData:{}
            }
        },
        methods:{
            appendSubForm(){
                this.appendSubFormData = {
                    id: "",
                    mainId:this.data.id,
                    formType: 0,/*0是实体表单，1是虚拟表单*/
                    formName: "",
                    sortTable: 0,
                    tableName: "",
                    knowledgeDir: "",
                };
                this.appendSubFormVisible = true;
            },
            editSubForm(){
                let subFormId = this.activeName;
                let subForm = this.data.subForm.filter(f=>f.id == subFormId)[0];
                subForm.mainId =  this.data.id;
                this.$set(this,"editSubFormData",subForm);
                this.editSubFormVisible = true;
            },
            appendFormFiled(id){
                let data = {
                    formId:id,
                    id: "",//新增为空
                    fieldName: "",
                    displayName: "",
                    htmlType: undefined,
                    fieldType: "",//
                    fieldCheck: "yyyy-MM-dd",//日期的时候的校验
                    fieldLength: 128,
                    fieldFixed: 2,//浮点数，精度
                    isMulti: "",//是否多选
                    height: 95,
                    width: 95
                };
                this.$set(this,"appendFormFiledData",data);
                this.appendFieldVisible = true;
            },
            editFormFiled(index, row,formId) {
                this.editFormFiledData = row;
                this.editFormFiledData.formId = formId;
                this.editFormFiledData.htmlType = this.editFormFiledData.htmlType==-1?undefined:this.editFormFiledData.htmlType;
                this.editFieldVisible = true;
            },
            loadData(id) {
                this.loading = true;
                request({
                    url: `${modelSubFormUrl}get`,
                    method: 'post',
                    data: {formId: id},
                }).then(({status, content, message}) => {
                    this.loading = false;
                    this.data = content;
                    if (content.subForm.length != 0)
                        this.activeName = content.subForm[0].id;
                });
            },
            submitSubFormSuccess({type,data}){
                if(type =="append")
                {
                    this.appendSubFormVisible = false;
                    data.datas = [];
                    let index = _.sortedIndexBy(this.data.subForm, data, 'sortTable');//找到新插入的数据所在位置
                    console.log(index);
                    this.data.subForm.splice(index,0,data);
                }
                else if(type == "edit")
                {
                    this.editSubFormVisible = false;
                    let index = this.data.subForm.findIndex(d=>d.id==data.id);
                    data.datas = this.data.subForm[index].datas;
                    this.data.subForm.splice(index,1,data);
                }
                this.activeName = data.id;
            },
            submitFiledSuccess({type,data}){
                let formId = data.formId;
                let id = data.id;

                if(type =="append")
                {
                    this.appendFieldVisible = false;
                    if(this.data.id == formId){
                        this.data.datas.push(data);
                    }
                    else{
                        this.data.subForm.forEach(s=>{
                            if(s.id == formId){
                                s.datas.push(data);
                            }
                        })
                    }
                }
                else if(type == "edit"){
                    this.editFieldVisible = false;
                    if(this.data.id == formId){
                        let index = this.data.datas.findIndex(d=>d.id==id);
                        this.data.datas.splice(index,1,data);
                    }
                    else{
                        this.data.subForm.forEach(s=>{
                            if(s.id == formId){
                                let index = s.datas.findIndex(d=>d.id==id);
                                s.datas.splice(index,1,data);
                            }
                        })
                    }
                }
            }
        },
        components:{
            Basic,
            Field
        }
    }
</script>

<style>
    .config.box{
        display: flex;
        flex-direction: column;
    }
    .config .el-card__body{
        padding: 5px;
    }
    .config .el-card__header{
        padding: 10px 10px !important;
    }
    .subForm .el-tabs__content{
        padding: 5px;
    }
    .subForm{
        height: 100% ;
    }
    .appendBtn{
        float: right;
        margin:5px 0px 5px 0px;
    }
    .gutter{
        display: table-cell !important;
    }
</style>