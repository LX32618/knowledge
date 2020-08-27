<template>
    <div style="width: 100%">
        <cs-table ref="tb"
                       :settings="tableSettings"
                       :table-data="tableData"
                       @currentChange="currentChange"
                       @pageSizeChange="pageSizeChange">
            <template v-slot:horizontalSlot>
                <div style="margin:5px">
                    <el-button-group>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click.native="add">添加</el-button>
                        <el-button type="primary" icon="el-icon-edit-outline" @click.native="edit">修改</el-button>
                        <el-button type="primary" icon="el-icon-delete" @click.native="remove">删除</el-button>
                    </el-button-group>
                </div>
            </template>
        </cs-table>
        <el-dialog :visible.sync="addDialogVisible"  title="角色信息" append-to-body :close-on-click-modal="false" append-to-body>
            <role-select type="add" :form-data="addFormData"  @submitSuccess="submitSuccess"></role-select>
        </el-dialog>
        <el-dialog :visible.sync="editDialogVisible"  title="角色信息" append-to-body :close-on-click-modal="false" append-to-body>
            <role-select type="edit" :form-data="editFormData" @submitSuccess="submitSuccess"></role-select>
        </el-dialog>
    </div>

</template>

<script>
    import RoleSelect from "./Form/RoleSelect";

    export default {
        name: "index",
        data(){
            return{
                form:{},
                addDialogVisible:false,
                editDialogVisible:false,
                peopleDialogVisible:false,
                tableSettings: {
                    radio:true,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    pagination:true,//是否显示分页
                    total:50,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "roleId", label: "roleId",visible:false},
                        {prop: "roleName", label: "角色名称"},
                        {prop: "userNames", label: "人员"},
                        {prop: "userIds", label: "userIds",visible:false},
                        {prop: "permissionNames", label: "权限资源"},
                        {prop: "permissionIds", label: "permissionIds",visible:false}
                    ]
                },
                tableData:[
                    {
                        id:"1",
                        roleName:"安全保密员",
                        userNames:"李书洋,夏添",
                        userIds:"lisy1,xt",
                        orgNames:"流程与信息化部,流程与信息化部",
                        permissionNames:"安全保密,安全审计,知识管理",
                        permissionIds:"aqbm,axsj,zsgl"
                    },{
                        id:"2",
                        roleName:"SEPG审核组",
                        userNames:"王夏冰",
                        userIds:"wxb",
                        orgNames:"流程与信息化部",
                        permissionNames:"SEPG审核",
                        permissionIds:"seg"
                    },{
                        id:"3",
                        roleName:"SEPG审核组",
                        userNames:"刘珏先",
                        userIds:"ljx",
                        orgNames:"流程与信息化部",
                        permissionNames:"SEPG审核",
                        permissionIds:"seg"
                    }
                ],
                tableSelect:{},
                addFormData:{
                    id:"",
                    roleName:"",
                    roles:[],
                    permissions:[]
                },
                editFormData:{}
            }
        },
        methods:{
            currentChange(val){//行单选事件
                this.tableSelect = val;
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {

            },
            add(){
                this.addDialogVisible = true;
            },
            edit(){
                if("{}" == JSON.stringify(this.tableSelect)){
                    this.$error("请先选择一行数据");
                }
                else{
                    let val = this.tableSelect;
                    console.log(this.tableSelect);
                    let userArray = _.zip(val.userIds.split(","),val.userNames.split(","),val.orgNames.split(","));
                    let roles = [];
                    userArray.forEach(u=>{
                        let user =  _.zipObject(['id', 'userName','orgName'], u);
                        roles.push(user);
                    })
                    let data = {
                        id:val.id,
                        roleName:val.roleName,
                        permissions:val.permissionIds.split(","),
                        roles:roles
                    }
                    this.$set(this,"editFormData",data);
                    this.editDialogVisible = true;
                }
            },
            remove(){

            },
            submitSuccess({type,data}){
                if("add" == type)
                {
                    this.tableData.push(data);
                    this.addDialogVisible = false;
                }
                else{
                    let index = this.tableData.findIndex(d=>{
                        return d.id == data.id;
                    });
                    this.tableData.splice(index,1,data);
                    this.editDialogVisible = false;
                }
            }
        },
        components:{
            RoleSelect
        }
    }
</script>

<style scoped>

</style>
