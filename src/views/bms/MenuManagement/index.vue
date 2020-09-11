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
                        {prop: "name", label: "名称",width:"300"},
                        {prop: "url", label: "链接"},
                        {prop: "sort", label: "sort",visible: false}
                    ],
                    rowKey:"id",
                    props:{children:"children"},
                    default_expand_all:true
                },
                tableData:[
              /*          {
                            name:"设置中心",
                            pid:null,
                            id:"59454A2FAC9D4414AB2C35F5B6B26A8D",
                            url:null,
                            sort:1,
                            children:[
                                {
                                    children:[
                                        {
                                        name:"全文检索关键字统计",
                                        pid:"9E8044C57AB94EB7942CAF20E07417CC",
                                        id:"42FA9858110C48DE93C717FFEC77A196",
                                        url:"system/search/listSearchStatistics",
                                        sort:1
                                    },
                                        {
                                            name:"接口测试",
                                            pid:"9E8044C57AB94EB7942CAF20E07417CC",
                                            id:"49BA161DDEFE4467BC244C899A1CF49D",
                                            url:"interfaceController/interfaceIndex",
                                            sort:1
                                        },
                                        {
                                            name:"字典数据",
                                            pid:"9E8044C57AB94EB7942CAF20E07417CC",
                                            id:"4846EBAE871746D6A70CAC2CD1CBC84A",
                                            url:"sysDict/dictTree",
                                            sort:1
                                        }],
                                    name:"基础设置",
                                    pid:"59454A2FAC9D4414AB2C35F5B6B26A8D",
                                    id:"9E8044C57AB94EB7942CAF20E07417CC",
                                    url:null,
                                    sort:1
                                },{
                                    children:[
                                        {
                                        name:"标准关系视图",
                                        pid:"FC3FFCB2137A4FA4ABC5B9CFA4741D60",
                                        id:"ABA4279500BD40BDB7FD9DBBDAE4B852",
                                        url:"system/knowledge/listStandardRelationShip",
                                        sort:1
                                    },
                                        {
                                            name:"知识管理",
                                            pid:"FC3FFCB2137A4FA4ABC5B9CFA4741D60",
                                            id:"907A83FE6F384FA2BC132522AAD0D771",
                                            url:"system/knowledge/knowledgeBase",
                                            sort:1
                                        }],
                                    name:"知识库设置",
                                    pid:"59454A2FAC9D4414AB2C35F5B6B26A8D",
                                    id:"FC3FFCB2137A4FA4ABC5B9CFA4741D60",
                                    url:null,
                                    sort:1
                                }
                            ]
                        },
                        {
                            name:"系统管理",
                            pid:null,
                            id:"95D1E34B182A4A6DBA29D3D581B57DEB",
                            url:null,
                            sort:1,
                            children:[
                                {
                                    name:"导航菜单管理",
                                    pid:"95D1E34B182A4A6DBA29D3D581B57DEB",
                                    id:"3EFEA899E783422DA91DA5AD5B71D144",
                                    url:"sysMenuInfoController/goMenuInfo",
                                    sort:1
                                },
                                {
                                    name:"权限管理",
                                    pid:"95D1E34B182A4A6DBA29D3D581B57DEB",
                                    id:"13368F96291D4E2083D71E18BF8AF2EE",
                                    url:"sysPermissionsController/goPermissions",
                                    sort:1
                                },
                                {
                                    name:"角色管理",
                                    pid:"95D1E34B182A4A6DBA29D3D581B57DEB",
                                    id:"8E5F8B6F221E487A9A6DE214821474BE",
                                    url:"sysRoleController/goRole",
                                    sort:1
                                }
                            ],
                        }*/
                ],
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
