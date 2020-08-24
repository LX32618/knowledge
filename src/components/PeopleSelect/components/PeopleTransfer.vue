<template>
    <div class="box" style="margin-top: 0px">
        <div class="unselect">
            <cs-table :settings="tableSettings" :table-data="unSelectList" @rowDbClick="rowDbClick">
                <template v-slot:horizontalSlot>
                    人员列表
                    <div class="search">
                        <cat-tree-select style="margin-bottom: 5px;width: 150px" v-model="deptSelect" placeholder="请选择部门" :props="treeSelectSettings" :data="treeSelectData"></cat-tree-select>
                        <el-button-group style="margin-bottom: 5px;width: 200px;display: flex">
                            <el-input  placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="keyWord"></el-input>
                            <el-button type="primary" size="mini">搜索</el-button>
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
                        <i class="el-icon-user"/>{{tag.userName}}({{tag.orgName}})
                    </el-tag>
                </div>
                <br/>
            </div>
        </div>
    </div>
</template>
<script>
    import CatTreeSelect from "../../CatTreeSelect/index";
    export default {
        name:'PeopleTranfer',
        components: {CatTreeSelect},
        props:{

        },
        data() {
            return {
                tableSettings: {
                    radio:false,//是否显示单选框
                    checkbox: false,//是否显示checkbox
                    pagination:true,//是否显示分页
                    total:20,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    height:280,
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "userName", label: "用户名"},
                        {prop: "orgName", label: "部门"}
                    ]
                },
                deptSelect:"",
                treeSelectSettings:{
                    key:"id",
                    label:"orgName",
                    children:"children"
                },
                treeSelectData: [{
                    id:"root",
                    orgName:"二十九所",
                    children:[
                        {id:"liuhua",orgName:"流程与信息化部"},
                        {id:"jihua",orgName:"综计部"},
                        {id:"kefa",orgName:"科发部"}
                    ]}
                ],
                selectList: [
                    {
                        id: 'AHU-L28-01',
                        userName: '李书洋',
                        orgName: '流程与信息化部'
                    },
                ],
                unSelectList: [
                    {
                        id: 'AHU-L28-01',
                        userName: '李书洋',
                        orgName: '流程与信息化部'
                    },
                    {
                        id: 'AHU-L28-02',
                        userName: '夏添',
                        orgName: '流程与信息化部'
                    },
                    {
                        id: 'AHU-L28-03',
                        userName: '王夏冰',
                        orgName: '流程与信息化部'
                    },   {
                        id: 'AHU-L28-04',
                        userName: '刘珏先',
                        orgName: '流程与信息化部'
                    },

                ],
                keyWord:""
            }
        },
        methods: {
            rowDbClick({row, column, cell, event}){
                let index = this.selectList.findIndex(s=>{
                    return s.id == row.id
                });
                if(index<0)
                {
                    this.selectList.push(row);
                }
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
            }
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
