<template>
    <div>
        <el-popover placement="bottom-start"
                width="400"
                trigger="click"
                @show="toggle"
                v-model="showTable">
            <cs-table :settings="tableSettings"
                      :table-data="tableData"
                      v-loading="loading"
                      @selectionChange="selectionChange"
                      @currentChange="currentChange"
                      @pageSizeChange="pageSizeChange">
                <template v-slot:horizontalSlot>
                    <div class="operationNav">
                        <div></div>
                        <el-button-group class="search">
                            <el-input placeholder="请输入表单名称" prefix-icon="el-icon-search"
                                      v-model="searchKeyWord" @keyup.enter.native="searchClick"></el-input>
                            <el-button type="primary" @click="searchClick">搜索</el-button>
                            <el-button type="primary" @click="certainClick">确定</el-button>
                        </el-button-group>
                    </div>
                </template>
            </cs-table>
            <el-button type="primary" icon="el-icon-search" circle slot="reference" :disabled="disabled"  v-show="edit"></el-button>
        </el-popover>
        <el-tag v-for="tag in tagData"
                :key="tag.id"
                :closable="edit&&!disabled"
                @click="tagClick(tag)"
                @close="tagClose(tag)"
                type="danger" size="mini" class="tag">
            {{tag.name}}
        </el-tag>

    </div>
</template>

<script>

    import _ from 'lodash'
    import {fetchViewBtns} from "@/api/formMaking.js"

    export default {
        name: "ViewBtn",
        props:{
            refId:{//浏览按钮的id
                type:String,
                default: ""
            },
            konwId:{//知识的id
                type:String,
                default:""
            },
            edit:{//true：编辑模式，false：浏览模式
                type:Boolean,
                default:true
            },
            multiple:{//是否多选
                type:Boolean,
                default:true
            },
            disabled:{//是否多选
                type:Boolean,
                default:true
            },
            tagData:{
                type:Array,
                default:()=>[]
            }
        },
        data(){
            return{
                showTable:false,
                searchKeyWord:"",
                loading:false,
                tableSettings:{
                    radio:!this.multiple,//是否单选
                    checkbox: this.multiple,//是否多选，单选和多选同一时间只能存在一个
                    height:250,//是否固定表头，表头的高度
                    pagination:true,//是否显示分页
                    total:0,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id",  visible: false},
                        {prop: "name", label: "名称",width:200}
                    ]},
                tableData:[],
                selectedTag:[]
            }
        },
        methods:{
            toggle(){
                let option = {
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize,
                    condition:{
                        refId:this.refId,
                        refname:this.searchKeyWord
                    }
                };
                this.loadData(option);
            },
            tagClose(tag){
                let temp = _.cloneDeep(this.tagData);
                let filterTags = temp.filter(t=>{
                    return t.id!=tag.id;
                })
                this.$emit("update:tagData",filterTags);
            },
            tagClick(tag){
                window.open(tag.url);
            },
            searchClick(){
                let option = {
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize,
                    condition:{
                        refId:this.refId,
                        refname:this.searchKeyWord
                    }
                };
                this.loadData(option);
            },
            certainClick(){
                let temp = _.cloneDeep(this.tagData);
                if(!this.multiple)
                {
                    temp = _.cloneDeep(this.selectedTag);
                }
                else{
                    this.selectedTag.forEach(s=>{
                        temp.push(s);
                    })
                    temp = _.uniqBy(temp,"id");
                }
                this.$emit("update:tagData",temp);
                this.showTable = false;
            },
            selectionChange(row){
                this.selectedTag = row;
            },
            currentChange(currentRow){
                this.selectedTag = [currentRow];
            },
            pageSizeChange({page,rows}){
                let option = {
                    page:page,
                    rows:rows,
                    condition:{
                        refId:this.refId,
                        refname:this.searchKeyWord
                    }
                };
                this.loadData(option);
            },
            loadData(option){
                console.log(option);
                fetchViewBtns(option).then(resp=>{
                    if(resp.status == "success")
                    {
                        this.tableSettings.total = resp.content.total;
                        this.tableData = _.cloneDeep(resp.content.datas);
                    }
                    else{
                        this.$error(resp.msg);
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .operationNav{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .search{
        display: flex;
        margin:5px 5px 5px 0px;
    }
    .tag{
        margin-left: 3px;
        cursor: pointer
    }
</style>
