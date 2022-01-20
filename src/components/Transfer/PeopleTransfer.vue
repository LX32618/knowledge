<template>
    <div>
        <div class="box" style="margin-top: 0px">
            <div class="unselect">
                <cs-table :settings="tableSettings" :table-data="unSelectList" @rowDbClick="rowDbClick" @pageSizeChange="pageSizeChange">
                    <template v-slot:horizontalSlot>
                        人员列表
                        <div class="search">
                            <cat-tree-select
                                    style="margin-bottom: 5px;width: 150px"
                                    v-model="deptSelect" placeholder="请选择部门"
                                    :props="treeSelectSettings"
                                    :data="treeSelectData"
                                    clearable
                                    @change="deptChange">
                            </cat-tree-select>
                            <el-button-group style="margin-bottom: 5px;width: 200px;display: flex">
                                <el-input  placeholder="请输入关键字" prefix-icon="el-icon-search" clearable v-model="keyWord"></el-input>
                                <el-button type="primary" size="mini" @click="searchUser">搜索</el-button>
                            </el-button-group>
                        </div>
                    </template>
                </cs-table>
            </div>
            <div class="operations">
                <div>
                    <el-button type="primary" icon="el-icon-d-arrow-right" circle @click="addAll()"></el-button>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-d-arrow-left" circle @click="removeAll()"></el-button>
                </div>
            </div>
            <div class="select">
                选中列表
                <div>
                    <div  v-for="tag in selectList" :key="tag.id"
                          class="tag" style="cursor: pointer">
                        <el-tag  type="danger" @dblclick.native="closeTag(tag)">
                            <i class="el-icon-user"/>{{tag.realName}}({{tag.departName}})
                        </el-tag>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
        <div style="text-align: end;margin-top: 30px;">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="certain()">确 定</el-button>
        </div>
    </div>

</template>
<script>
    import CatTreeSelect from "../CatTreeSelect/index";
    import {fetchDepartmentInfoById} from "@/api/department"
    import {fetchUserByDeptUser} from "@/api/user"

    export default {
        name:'PeopleTranfer',
        components: {CatTreeSelect},
        props:{
            iniList:{
                type:Array,
                default:()=>[]
            }
        },
        data() {
            return {
                tableSettings: {
                    radio:false,//是否显示单选框
                    checkbox: false,//是否显示checkbox
                    pagination:true,//是否显示分页
                    total:0,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    height:280,
                    fields: [
                        {prop: "id", label: "id", visible: false},
                        {prop: "userName", label: "userName", visible: false},
                        {prop: "realName", label: "用户名"},
                        {prop: "departName", label: "部门"}
                    ]
                },
                deptSelect:"",
                treeSelectSettings:{
                    key:"id",
                    label:"departName",
                    children:"children"
                },
                treeSelectData: [],
                selectList:[],
                unSelectList: [],
                keyWord:""
            }
        },
        methods: {
            async getUser(page,rows,realName,deptId){
                let option = {
                    page:page,
                    rows:rows,
                    condition:{
                        realName:realName,
                        deptId:deptId
                    }
                };
                let resp = await fetchUserByDeptUser(option);
                this.unSelectList = resp.content.datas;
                this.tableSettings.total = resp.content.total;
            },
            async loadTableData(page,rows){
                let option = {
                    page:page,
                    rows:rows,
                    condition:{
                        orgId:"4028840e7e23e028017e246a27a3001b"//"4028e4667598521a017598612215000b"
                    }
                };
                let resp = await fetchDepartmentInfoById(option);
                this.treeSelectData= resp.content.datas;
            },
            rowDbClick({row, column, cell, event}){
                let index = this.selectList.findIndex(s=>{
                    return s.id == row.id
                });
                if(index<0)
                {
                    this.selectList.push(row);
                }
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {
                this.getUser(page,rows,this.keyWord,this.deptSelect);
            },
            closeTag(tag)
            {
                let index = this.selectList.findIndex(s=>{
                    return s.id == tag.id;
                })
                this.selectList.splice(index,1);
            },
            addAll(){
                this.unSelectList.forEach(us=>{
                    let index = this.selectList.findIndex(s=>{
                        return us.id == s.id;
                    });
                    if(index<0)
                    {
                        this.selectList.push(us);
                    }
                })
            },
            removeAll(){
                this.selectList = [];
            },
            cancel(){
                this.$emit("cancel");
            },
            certain(){
                this.$emit("certain",this.selectList);
            },
            searchUser(){
                this.getUser(1,this.tableSettings.pageSize,this.keyWord,this.deptSelect);
            },
            async deptChange(newDept){
                this.getUser(this.tableSettings.currentPage,this.tableSettings.pageSize,this.keyWord,newDept);
            }
        },
        watch:{
            iniList:{
                handler(newValue,oldValue){
                    this.selectList = _.cloneDeep(newValue);
                },
                immediate:true
            }
        },
        mounted() {
            this.loadTableData(1,10000);
        }
    }
</script>

<style  scoped>
    .box{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }
    .unselect{
       flex-basis:  60%;
        height: 100%;
    }
    .operations{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-basis: 5%;
    }
    .select{
        flex-basis: 30%;
        height: 100%;
    }
    .select>div:first-child{
        border: 1px solid #ebeef5;
        border-radius:4px;
        height: 355px;
        overflow:scroll;
        margin-top:5px
    }
    .search{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .search .oper{
        margin-bottom: 5px;
        display: flex;
        width: 200px;
    }
    .tag{
        text-align: center;
        margin:5px
    }
</style>
