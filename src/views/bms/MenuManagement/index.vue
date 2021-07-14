<template>
    <div style="width:100%" v-loading="loading">
        <cs-table ref="tb"
                  :settings="tableSettings"
                  :table-data="tableData">
<!--            <template v-slot:horizontalSlot>
                <div style="margin:5px">
                    <el-button-group>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click.native="addDialogVisible=true">添加</el-button>
                    </el-button-group>
                </div>
            </template>-->
            <template v-slot:suffix-column>
                <el-table-column label="编辑" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-circle-plus-outline" @click.native="add(scope.$index,scope.row)"></el-button>
                        <el-button type="text" icon="el-icon-edit-outline" @click.native="edit(scope.$index,scope.row)"></el-button>
                        <el-button type="text" icon="el-icon-delete" @click.native="remove(scope.$index,scope.row)"></el-button>
                    </template>
                </el-table-column>
            </template>
        </cs-table>

        <el-dialog :visible.sync="addDialogVisible"  title="添加导航菜单" append-to-body :close-on-click-modal="false" append-to-body>
            <menu-form type="add" :form-data="addFormData"  @submitSuccess="submitSuccess" @cancelSuccess="addDialogVisible=false"></menu-form>
        </el-dialog>
        <el-dialog :visible.sync="editDialogVisible"  title="编辑导航菜单" append-to-body :close-on-click-modal="false" append-to-body>
            <menu-form type="edit" :form-data="editFormData" @submitSuccess="submitSuccess" @cancelSuccess="editDialogVisible=false"></menu-form>
        </el-dialog>
    </div>

</template>

<script>
    import menuForm from "./Form/index"
    import _ from "lodash"
    import {mapGetters} from "vuex";
    import {fetchMenuAll,deleteMenu} from "@/api/menuManagement.js"

    export default {
        name: "MenuManagement",
        components: {menuForm},
        data(){
            return{
                loading:false,
                addDialogVisible:false,
                editDialogVisible:false,
                addFormData:{
                    id:"",
                    name:"",
                    url:"",
                    sort:0
                },
                editFormData:{},
                tableSettings: {
                    radio:false,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    pagination:false,//是否显示分页
                    fields: [
                        {prop: "id", label: "id", visible: false},
                        {prop: "pid", label: "pid", visible: false},
                        {prop: "name", label: "名称",width:"180"},
                        {prop: "url", label: "链接"},
                        {prop: "sort", label: "sort",visible: false}
                    ],
                    rowKey:"id",
                    props:{children:"children"},
                    default_expand_all:true
                },
                tableData:[
                ]
            }
        },
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        },
        methods:{
            add(index,row){
                this.$set(this.addFormData,"pid",row.id);
                this.addDialogVisible = true;
            },
            edit(index,row){
                let data = _.pick(row,["pid","id","name","url","sort"]);
                this.$set(this,"editFormData",data);
                this.editDialogVisible = true;
            },
            remove(index,row){
                console.log(row);
                this.$confirm('是否确认删除该条数据?', '提示', {
                    closeOnClickModal: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let option = {
                        menuinfoId:row.id
                    }
                    deleteMenu(option).then(resp=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.loadData();
                    })
                }).catch((msg) => {
                    this.$error(msg);
                });
            },
            submitSuccess({type,data}){
                if("add"==type)
                {
                    this.addDialogVisible = false;
                }
                else{
                    this.editDialogVisible = false;
                }
                this.loadData();
            },
            loadData(){
                this.loading = true;
                fetchMenuAll().then(resp=>{
                    this.tableData = resp.content;
                    this.loading = false;
                }).catch((msg)=>{
                    this.$error(msg);
                    this.loading = false;
                })
            }
        },
        mounted() {
            this.loadData();
        }

    }
</script>

<style scoped>

</style>
