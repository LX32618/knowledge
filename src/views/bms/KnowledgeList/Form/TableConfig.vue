<template>
    <div style="width:100%">
        <el-button-group>
            <el-button type="primary" icon="fa fa-save" @click.native="">保存</el-button>
            <el-button type="primary" icon="el-icon-view" @click.native="">预览</el-button>
        </el-button-group>
        <p><i class="el-icon-s-operation"></i>知识基础信息</p>
        <cs-table :settings="tableSettings"
                  :table-data="configData.base">
            <template v-slot:suffix-column>
                <el-table-column label="是否显示" >
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isShow">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="是否查询条件" >
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isSearch">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="是否排序" >
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isOrder">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="列宽" >
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.colWidth" :min="1"  label="描述文字"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="字段排序" >
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.pOrder" :min="1" label="描述文字"></el-input-number>
                    </template>
                </el-table-column>
            </template>
        </cs-table>
        <div  v-for="data in configData.formData">
            <p><i class="el-icon-s-operation"></i>{{data.formName}}</p>
            <cs-table :settings="tableSettings"
                      :table-data="data.formData">
                <template v-slot:suffix-column>
                    <el-table-column label="是否显示" >
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.isShow">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否查询条件" >
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.isSearch">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否排序" >
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.isOrder">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="列宽" >
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.colWidth" :min="1"  label="描述文字"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="字段排序" >
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.pOrder" :min="1" label="描述文字"></el-input-number>
                        </template>
                    </el-table-column>
                </template>
            </cs-table>
        </div>

    </div>
</template>

<script>
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
                tableSettings: {
                    radio:false,//是否显示单选框
                    checkbox: false,//是否显示checkbox
                    pagination:false,//是否显示分页
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "fieldId", label: "fieldId", sortable: false, visible: false},
                        {prop: "showName",width:100, label: "字段名"}
                    ]
                },
                tableData:[]
            }
        },
        methods:{
        }
    }
</script>

<style scoped>

</style>
