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
        <el-dialog :visible.sync="dialogVisible"  title="角色信息" append-to-body :close-on-click-modal="false" append-to-body>
            <el-form :model="form" label-width="100px">
                <el-form-item label="角色名称">
                    <el-input v-model="form.roleName" style="width:203px"></el-input>
                </el-form-item>
                <el-form-item label="角色人员">
                    <el-button type="primary" icon="el-icon-search" circle @click.native="peopleDialogVisible=true"></el-button>
                    <el-tag
                            v-for="tag in selectList"
                            :key="tag.id"
                            closable
                            @close="closeTag(tag)"
                            type="danger">
                        {{tag.userName}}
                    </el-tag>

                </el-form-item>
                <el-form-item label="角色权限">
                    <el-select v-model="form.priority" placeholder="请选择">
                        <el-option label="安选审计" value="axsj"></el-option>
                        <el-option label="系统管理" value="xtgl"></el-option>
                        <el-option label="知识管理" value="zsgl"></el-option>
                        <el-option label="安全保密" value="aqbm"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="peopleDialogVisible"  title="选择人员" append-to-body :close-on-click-modal="false" append-to-body>
            <people-transfer @cancel="peopleCancel" @certain="peopleCertain"></people-transfer>
        </el-dialog>

    </div>

</template>

<script>
    import PeopleTransfer from "@/components/Transfer/PeopleTransfer";
    export default {
        name: "index",
        data(){
            return{
                form:{},
                dialogVisible:false,
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
                        {prop: "permissionNames", label: "权限资源"}
                    ]
                },
                tableData:[
                    {
                        id:1,
                        roleName:"安全保密员",
                        userNames:"宋悦刚,王亮",
                        permissionNames:"安全保密,安全审计,测试,知识管理",
                    },{
                        id:2,
                        roleName:"SEPG审核组",
                        userNames:"宋悦刚",
                        permissionNames:"SEPG审核",
                    },{
                        id:3,
                        roleName:"SEPG审核组",
                        userNames:"宋悦刚",
                        permissionNames:"SEPG审核",
                    },{
                        id:4,
                        roleName:"SEPG审核组",
                        userNames:"宋悦刚",
                        permissionNames:"SEPG审核",
                    }
                ],
                selectList:[]
            }
        },
        methods:{
            currentChange(val){//行单选事件
                console.log();
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {

            },
            add(){
                this.dialogVisible = true;
            },
            edit(){

            },
            remove(){

            },
            peopleCancel(){
                this.peopleDialogVisible = false;
            },
            peopleCertain(selectList){
                this.selectList = selectList;
                this.peopleDialogVisible = false;
            },
            closeTag(tag)
            {
                let index = this.selectList.findIndex(s=>{
                    return tag.id == s.id;
                });
                this.selectList.splice(index,1);
            }
        },
        components:{
            PeopleTransfer
        }
    }
</script>

<style scoped>

</style>
