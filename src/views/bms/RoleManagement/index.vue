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
            <div>
                <el-form :model="formData" label-width="100px"  ref="roleForm">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="formData.roleName" style="width:203px"></el-input>
                    </el-form-item>
                    <el-form-item label="角色人员">
                        <el-button type="primary" icon="el-icon-search" circle @click.native="peopleDialogVisible=true"></el-button>
                        <el-tag
                                v-for="tag in formData.roles"
                                :key="tag.id"
                                closable
                                size="mini"
                                @close="closeTag(tag)"
                                type="danger">
                            {{tag.realName}}
                        </el-tag>
                    </el-form-item>
                    <el-form-item label="角色权限">
                        <el-select v-model="formData.permissionChecked" multiple placeholder="请选择" ref="selection" value-key="id">
                            <el-option v-for="p in formData.permissionList" :label="p.name" :value="p" :key="p.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div style="text-align:end">
                    <el-button type="primary" @click="saveClick">保存</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </div>
                <el-dialog :visible.sync="peopleDialogVisible"  title="选择人员" append-to-body :close-on-click-modal="false" append-to-body>
                    <people-transfer :iniList="formData.roles" @cancel="peopleCancel" @certain="peopleCertain"></people-transfer>
                </el-dialog>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import _ from "lodash";
    import axios from "axios";
    import PeopleTransfer from "@/components/Transfer/PeopleTransfer";
    import {fetchPriorities} from "@/api/priorityManagement.js"
    import {fetchRoleList,fetchRoleSelectById,saveRoleList,removeRole} from "@/api/roleManagement.js"
    import Template from "../KnowledgeList/Form/Template";

    export default {
        name: "RoleManagement",
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
                        {prop: "roleName", label: "角色名称"},
                        {prop: "userNames", label: "人员"},
                        {prop: "permissionNames", label: "权限资源"},
                    ]
                },
                tableData:[

                ],
                tableSelect:{},
                formData:{
                    id:"",
                    roleName:"",
                    roles:[],
                    permissionList:[],
                    permissionChecked:[]
                }
            }
        },
        methods:{
             loadFormData(val){
                 let rowOption = {
                     roleId:val.id
                 };
                 let priOption = {
                     page:1,
                     rows:100000
                 };
                let resp = fetchRoleSelectById(rowOption,priOption).then(axios.spread((permissionResp,userResp,priResp)=>{
                    let permissionChecked =  permissionResp.content.map(p=>{
                        return {id:p.PERMISSIONSID,name:p.NAME};
                    });
                    let userChecked =  userResp.content.map(u=>{
                        return {realName:u.REALNAME,id:u.USERID};
                    });
                    let priorityList = priResp.content.datas.map(pri=>{
                        return {
                            id:pri.ID,
                            name:pri.NAME
                        };
                    });

                    this.formData.id = val.id;
                    this.formData.roleName = val.roleName;
                    this.formData.roles = userChecked;
                    this.formData.permissionChecked = permissionChecked;
                    this.formData.permissionList = priorityList;
                }));
            },
            async loadTableData(option){
                let resp = await fetchRoleList(option);
                let tableData = resp.content.datas.map(d=>{
                    return {id:d.ROLEID,roleName:d.ROLENAME,userNames:d.USERNAMES,permissionNames:d.PERMISSIONNAMES}
                });
                this.tableSettings.total = resp.content.total;
                this.tableData = tableData;
            },
            currentChange(val){//行单选事件
                this.tableSelect = val;
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {
                let option = {
                    page:page,
                    rows:rows
                }
                this.loadTableData(option);
            },
            async add(){
                let option = {
                    page:1,
                    rows:100000
                };
                let resp = await fetchPriorities(option);
                let priorityList = resp.content.datas.map(pri=>{
                    return {
                        id:pri.ID,
                        name:pri.NAME
                    };
                });
                this.formData.id = "";
                this.formData.roleName = "";
                this.formData.roles = [];
                this.formData.permissionChecked = [];
                this.formData.permissionList = priorityList;
                this.dialogVisible = true;
            },
            edit(){
                if("{}" == JSON.stringify(this.tableSelect)){
                    this.$error("请先选择一行数据");
                }
                else{
                    this.loadFormData(this.tableSelect);
                    this.dialogVisible = true;
                }
            },
            async remove(){
                if("{}" == JSON.stringify(this.tableSelect)){
                    this.$error("请先选择一行数据");
                }
                else{
                    let id = this.tableSelect.id;
                    let resp = await removeRole({roleId:id});
                    let index = this.tableData.findIndex(t=>{
                        return t.id == id;
                    });
                    this.tableData.splice(index,1);
                    this.$success("删除成功");
                }
            },
            peopleCancel(){
                this.peopleDialogVisible = false;
            },
            peopleCertain(selectList){
                this.$set(this.formData,"roles",selectList);
                this.peopleDialogVisible = false;
            },
            closeTag(tag) {
                let index = this.formData.roles.findIndex(s=>{
                    return tag.id == s.id;
                });
                this.formData.roles.splice(index,1);
            },
            async saveClick(){
                let roleId = this.formData.id;
                let roleName = this.formData.roleName;
                let userIds =this.formData.roles.map(r=>{
                    return r.id;
                }).join(",");
                let permissionIds = this.formData.permissionChecked.map(p=>{
                    return p.id;
                }).join(",");
                let permissionNames = this.formData.permissionChecked.map(p=>{
                    return p.name;
                }).join(",");

                let option = {
                    roleId:roleId,
                    roleName:roleName,
                    hrmId:userIds,
                    permissionsIds:permissionIds,
                    permissionsNames:permissionNames,
                }

                let resp = await saveRoleList(option);
                let saveRow = {
                    roleName:roleName,
                    userNames:this.formData.roles.map(r=>{
                        return r.realName;
                    }).join(","),
                    permissionNames:permissionNames
                };

                if("" == roleId)//新增
                {
                    saveRow.roleId = resp.content.roleId;
                    this.tableData.push(saveRow);
                    this.$success("新增成功");
                }
                else{
                    saveRow.roleId = roleId;
                    let index = this.tableData.findIndex(d=>{
                        return d.id == roleId;
                    });
                    this.tableData.splice(index,1,saveRow);
                    this.$success("编辑成功");
                }
                this.dialogVisible = false;
            }
        },
         mounted() {
            let option = {
                page:this.tableSettings.currentPage,
                rows:this.tableSettings.pageSize
            }
            this.loadTableData(option);
        },
        components:{
            Template,
            PeopleTransfer
        }
    }
</script>

<style scoped>

</style>
