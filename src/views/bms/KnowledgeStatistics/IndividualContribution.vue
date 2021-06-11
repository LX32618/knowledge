<template>
    <div class="individual box">
        <div class="individual sidebar">
            <cs-lazytree ref="lazytree" :settings="treeSettings" :dataFormat="treeDataFormat" @treeNodeClick="treeNodeClick"></cs-lazytree>
        </div>
        <div class="individual main">
            <cs-table ref="tb"
                      :settings="tableSettings"
                      :table-data="tableData"
                      @pageSizeChange="pageSizeChange"
                      @sortChange="sortChange"
                      style="width: 100%">
                <template v-slot:horizontalSlot>
                    <el-form :inline="true" :model="searchData" class="searchForm">
                        <el-button type="primary" icon="el-icon-s-grid" circle></el-button>
                        <el-form-item>
                            <el-button-group>
                                <el-button type="primary" size="mini" @click="search()">搜索</el-button>
                                <el-button type="primary" size="mini" @click="tableExport()">导出</el-button>
                            </el-button-group>
                        </el-form-item>
                    </el-form>
                </template>
            </cs-table>
        </div>
    </div>
</template>

<script>

    import _ from "lodash";
    const treeUrl = '/app-zuul/knowledge/app/authcenter/api/categoryTree/';

    export default {
        name: "IndividualContribution",
        data(){
            return {
                treeSettings:{
                    root_id:"0",//根节点id
                    expand_root:true,//是否默认展开根节点
                    check_strictly:true,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                    default_expand_all:false,//是否默认展开所层级
                    show_checkbox:false,//是否有checkbox
                    show_radio: false,//是否有单选radio
                    expand_on_click_node:false,//点击接点是否进行展开收缩
                    right_click:false,//是否具有右键功能
                    request:{//访问路径设置
                        url:`${treeUrl}get`,
                        method:"post"
                    }
                },
                tableSettings: {
                    radio:false,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    pagination:true,//是否显示分页
                    total:0,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "name", label: "名称"},
                        {prop: "categoryName", label: "知识库"},
                        {prop: "createDate", label: "发布时间"},
                        {prop: "userName", label: "发布人"},
                        {prop: "reUseRation", label: "重用统计",sortable:true}
                    ]
                },
                tableData:[],
                searchData:{
                    keyWord:"",
                }
            }
        },
        methods:{
            treeDataFormat({node,data}){
                const temp = _.cloneDeep(data);
                let formatData = temp.filter(item=>{
                    return !(item.type == 2 && item.enable != 0);
                }).map((item,index,arr)=>{
                    if(item.pid==this.treeSettings.root_id)
                    {
                        item.icon = "element-icons el-custom-book";
                    }
                    else if(item.type==0){
                        item.icon = "element-icons el-custom-db";
                    }
                    else if(item.type==1){
                        item.icon = "element-icons el-custom-files";
                    }
                    else if(item.type==2){
                        item.icon = "element-icons el-custom-file";
                    }
                    else{}
                    return item;
                })
                return formatData;
            },
            treeNodeClick({data,node})
            {
                console.log({data,node});
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {
            },
            sortChange({sort, order}) {
            },
            tableExport(){},
            search(){}
        }
    }
</script>

<style scoped>
    .individual.box{
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 99%;
    }
    .individual.sidebar{
        flex-basis: 15%;
    }
    .individual.main{
        flex-basis:84%;
    }
    .searchForm{
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: -10px;
    }
</style>
