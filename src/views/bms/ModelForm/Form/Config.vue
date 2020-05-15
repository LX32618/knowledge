<template>
    <div class="config box" v-loading="loading" v-if="Object.keys(data).length != 0">
        <div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <b>{{data.formName}}-主表信息</b>
                </div>
                <div>
                    <cs-table :settings="tableSettings"
                              :table-data="data.datas">
                        <template v-slot:horizontalSlot>
                                <el-button type="primary" class="appendBtn" size="mini" round @click.native="appendMainFormFiled()">添加字段</el-button>
                        </template>
                       <template v-slot:suffix-column>
                            <el-table-column
                                    label="编辑"
                                    width="50">
                                <template slot-scope="scope">
                                    <el-button type="text" icon="el-icon-edit" size="mini"  @click.native.prevent="editRow(scope.$index,scope.row)">
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
                        <el-tooltip class="item"  content="编辑子表" placement="right" v-if="data.subForm.length != 0">
                            <el-button type="text" icon="el-icon-edit" style="font-size: 16px;" @click.native="editSubForm()"></el-button>
                        </el-tooltip>
                    </el-button-group>
                </div>
                <div v-if="data.subForm.length != 0">
                    <el-tabs v-model="activeName"  type="border-card" class="subForm">
                        <el-tab-pane v-for="tab in data.subForm" :key="tab.id" :label="tab.formName" :name="tab.id">
                            <cs-table :settings="tableSettings"
                                      :table-data="tab.datas">
                                <template v-slot:horizontalSlot>
                                    <el-button type="primary"  class="appendBtn" size="small" round @click.native="appendMainFormFiled()">添加字段</el-button>
                                </template>
                                <template v-slot:suffix-column>
                                    <el-table-column
                                            label="编辑"
                                            width="50">
                                        <template slot-scope="scope">
                                            <el-button type="text" icon="el-icon-edit" size="small" @click.native.prevent="editRow(scope.$index,scope.row)">
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
        <el-dialog title="添加子表" :visible.sync="appendSubFormVisible" append-to-body>
            <basic :formData="appendSubFormData" @submitSuccess="submitSuccess"></basic>
        </el-dialog>

        <el-dialog title="编辑子表" :visible.sync="editSubFormVisible" append-to-body>
            <basic :formData="editSubFormData" @submitSuccess="submitSuccess"></basic>
        </el-dialog>
    </div>
</template>

<script>
    import _ from 'lodash'
    import request from '@/utils/request'
    import Basic from "./Basic";

    let modelSubFormUrl = "/api/model/subform/";
    export default {
        name: "Config",
        components: {Basic},
        props:["id"],
        data(){
            return {
                activeName:"",
                loading:false,
                appendSubFormVisible:false,
                editSubFormVisible:false,
                tableSettings: {
                    radio:false,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    pagination:false,//是否显示分页
                    fields: [
                        {prop: "id", label: "id",  visible: false},
                        {prop: "displayName", label: "显示名称"},
                        {prop: "fieldName", label: "字段名称"},
                        {prop: "htmlType", label: "显示类型"},
                        {prop: "htmlTypeId", label: "显示类型Id",visible:false},
                        {prop: "fieldType", label: "字段类型"},
                        {prop: "fieldTypeId", label: "字段类型Id",visible:false},
                        {prop: "fieldLength", label: "字段长度"},
                        {prop: "fieldFixed", label: "精度"},
                    ]
                },
                data:{},
                appendSubFormData:{},
                editSubFormData:{}
            }
        },
        methods:{
            appendSubForm(){
                this.appendSubFormData = {
                    id: "",
                    mainId:this.data.id,
                    formType: "0",/*0是实体表单，1是虚拟表单*/
                    formName: "",
                    sortTable: "0",
                    tableName: "",
                    knowledgeDir: "",
                };
                this.appendSubFormVisible = true;
            },
            editSubForm(){
                let subFormId = this.activeName;
                let subForm = this.data.subForm.filter(f=>f.id == subFormId);
                this.editSubFormData = subForm[0];
                this.editSubFormData.mainId = this.data.id;
                console.log(this.editSubFormData);
                this.editSubFormVisible = true;
            },
            appendMainFormFiled(){

            },
            editRow(index, row) {
                console.log(index);
                console.log(row);
            },
            loadData(id) {
                this.loading = true;
                request({
                    url: `${modelSubFormUrl}get`,
                    method: 'post',
                    data: {id: id},
                }).then(({status, content, message}) => {
                    this.loading = false;
                    this.data = content;
                    if (content.subForm.length != 0)
                        this.activeName = content.subForm[0].id;
                });
            },
            submitSuccess({type,data}){
            }

        },
        watch:{
            Basic
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
</style>