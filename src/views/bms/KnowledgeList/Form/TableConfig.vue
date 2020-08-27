<template>
    <div style="width:100%" :loading="loading">
        <el-button-group>
            <el-button type="primary" icon="fa fa-save" @click.native="configSave()">保存</el-button>
            <el-button type="primary" icon="el-icon-view" @click.native="">预览</el-button>
        </el-button-group>
        <p><i class="el-icon-s-operation"></i>知识基础信息</p>
        <cs-table :settings="tableSettings"
                  :table-data="configData.base">
            <template v-slot:suffix-column>
                <el-table-column label="是否显示" >
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isShow" :active-value="1"  :inactive-value="0">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="是否查询条件" >
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isSearch" :active-value="1"  :inactive-value="0" disabled>
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="是否排序" >
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isOrder" :active-value="1"  :inactive-value="0" disabled>
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="列宽" >
                    <template slot-scope="scope">
                        <el-input-number v-model.number="scope.row.colWidth" :min="1"  step-strictly></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="字段排序" >
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.pOrder" :min="1" step-strictly></el-input-number>
                    </template>
                </el-table-column>
            </template>
        </cs-table>
        <div  v-for="data in configData.formData">
            <p><i class="el-icon-s-operation"></i>{{data.formName}}</p>
            <cs-table :settings="tableSettings"
                      :table-data="data.fieldData">
                <template v-slot:suffix-column>
                    <el-table-column label="是否显示" >
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.isShow" :active-value="1"  :inactive-value="0">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否查询条件" >
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.isSearch" :active-value="1"  :inactive-value="0">
                            </el-switch>
                        </template>
                    </el-table-column>
          <!--          <el-table-column label="是否排序" >
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.isOrder" :active-value="1"  :inactive-value="0">
                            </el-switch>
                        </template>
                    </el-table-column>-->
                    <el-table-column label="列宽" >
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.colWidth" :min="1"  step-strictly></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="字段排序" >
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.pOrder" :min="1" step-strictly></el-input-number>
                        </template>
                    </el-table-column>
                </template>
            </cs-table>
        </div>
    </div>
</template>


<script>
    import {saveTableConfig} from "@/api/knowledgeList.js"


    export default {
        name: "TableConfig",

        props:{
            configData:{
                type:Object,
                default:()=>{}
            }
        },
        data(){
            return{
                loading:false,
                tableSettings: {
                    radio:false,//是否显示单选框
                    checkbox: false,//是否显示checkbox
                    pagination:false,//是否显示分页
                    height:400,
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "fieldId", label: "fieldId", sortable: false, visible: false},
                        {prop: "formId", label: "fieldId", sortable: false, visible: false},
                        {prop: "repId", label: "fieldId", sortable: false, visible: false},
                        {prop: "showName",width:100, label: "字段名"}
                    ]
                }
            }
        },
        methods:{
            configSave(){
                let option = this.configData;
                this.loading = true;
                saveTableConfig(option).then(resp=>{
                    if(resp.status == "success")
                    {
                        if(this.configData.repId == "")
                        {
                            this.$set(this.configData,"repId",resp.content.id);
                        }
                        this.$success("保存成功");
                    }
                    else{
                        this.$error(resp.msg);
                    }
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>
