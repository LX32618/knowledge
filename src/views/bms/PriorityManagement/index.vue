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
        <el-dialog :visible.sync="addDialogVisible" title="添加权限资源" append-to-body :close-on-click-modal="false" append-to-body>
            <priority-select type="add" :form-data="addFormData" @submitSuccess="submitSuccess"></priority-select>
        </el-dialog>
        <el-dialog :visible.sync="editDialogVisible" title="修改权限资源" append-to-body :close-on-click-modal="false" append-to-body>
            <priority-select type="edit" :form-data="editFormData" @submitSuccess="submitSuccess"></priority-select>
        </el-dialog>
    </div>
</template>

<script>
    import _ from "lodash"
    import PrioritySelect from "./Form/index"

    const treeSettings = {
        check_strictly:false,
        default_expand_all:false,
        show_checkbox:true,
        show_radio:false,
        expand_on_click_node:true,
        right_click:false,
        default_checked_keys:[]
    };

    export default {
        name: "PriorityManagement",
        data(){
            return{
                addDialogVisible:false,
                editDialogVisible:false,
                addFormData:{
                    id:"",
                    name:"",
                    treeSettings:treeSettings
                },
                editFormData:{},
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
                        {prop: "name", label: "名称"},
                        {prop: "resourceNames", label: "资源"},
                        {prop: "resourceIds", label: "resourceIds",visible:false}
                    ]
                },
                tableData:[
                    {
                        id:"1",
                        name:"系统管理",
                        resourceNames:"管理员设置,密级定期检查报告",
                        resourceIds:"glysz,mjdqjcbg"
                    },{
                        id:"2",
                        name:"知识管理",
                        resourceNames:"知识审核,知识管理员",
                        resourceIds:"zssh,zsgly"
                    },{
                        id:"3",
                        name:"安全保密",
                        resourceNames:"角色管理",
                        resourceIds:"jsgl"
                    },
                ],
                tableSelect:{},
            }
        },
        methods:{
            add(){
                this.addDialogVisible = true;
            },
            edit(){
                if("{}" == JSON.stringify(this.tableSelect)){
                    this.$error("请先选择一行数据");
                }
                else{
                    let val = this.tableSelect;
                    let temp = _.cloneDeep(treeSettings);
                    temp.default_checked_keys = val.resourceIds.split(",");
                    let data = {
                        id:val.id,
                        name:val.name,
                        treeSettings:temp
                    }
                    console.log(data);
                    this.$set(this,"editFormData",data);
                    this.editDialogVisible = true;
                }
            },
            remove(){

            },
            currentChange(val){//行单选事件
                this.tableSelect = val;
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {

            },
            submitSuccess(){

            }
        },
        components:{
            PrioritySelect
        }
    }
</script>

<style scoped>

</style>
