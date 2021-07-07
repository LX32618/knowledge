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



        <el-table
                :data="tableData1"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
                    prop="date"
                    label="日期"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>

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
                ],


                tableData1: [{
                    id: 1,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    children:[
                        {
                            id: 11,
                            date: '2016-05-02',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                            id: 12,
                            date: '2016-05-04',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1517 弄'
                        }, {
                            id: 13,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄',
                            hasChildren: true
                        }, {
                            id: 14,
                            date: '2016-05-03',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1516 弄'
                        }
                    ]
                }, {
                    id: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    id: 3,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    hasChildren: true
                }, {
                    id: 4,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]


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
