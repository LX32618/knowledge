<template>
    <div class="knowmgt box">
        <div class="knowmgt sidebar">
            <cs-tree :tree-options="treeOptions" :tree-data="treeData" @treeNodeClick="treeNodeClick"></cs-tree>
        </div>
        <div class="knowmgt main">
            <cs-table ref="tb"
                      :settings="tableSettings"
                      :table-data="tableData"
                      @currentChange="currentChange"
                      @selectionChange="selectionChange"
                      @pageSizeChange="pageSizeChange">
                <template v-slot:horizontalSlot>
                    <div class="knowmgt operationNav">
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-delete" @click.native="remove">删除</el-button>
                            <el-button type="primary" icon="element-icons el-custom-transfer1" size="mini">权限转移</el-button>
                            <el-button type="primary" icon="element-icons el-custom-batchedit" size="mini">批量修改</el-button>
                            <el-button type="primary" icon="element-icons el-custom-import" size="mini">批量导入</el-button>
                            <el-button type="primary" icon="element-icons el-custom-share" size="mini">批量分享</el-button>
                            <el-button type="primary" icon="element-icons el-custom-transfer" size="mini">移库</el-button>
                            <el-button type="primary" icon="element-icons el-custom-export" size="mini">导出</el-button>
                        </el-button-group>
                        <div style="font-size: 12px">
                            <el-switch v-model="exportAttach" :width="30">
                            </el-switch>
                            导出附件
                        </div>
                        <el-button-group class="knowmgt search">
                            <el-input  placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="keywords"></el-input>
                            <el-button type="primary" >搜索</el-button>
                            <el-button type="primary" @click.native="search">高级搜索</el-button>
                        </el-button-group>
                    </div>
                </template>
            </cs-table>
        </div>
        <el-drawer
                title="我是标题"
                :visible.sync="drawer"
                direction="ttb">
            <span>我来啦!</span>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "KonwledgeManagement",
        data(){
            return{
                drawer:false,
                exportAttach:false,
                keywords:"",
                treeOptions:{
                    flatData:false,//是否采用打平的数据
                    check_strictly:true,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                    default_expand_all:false,//是否默认展开所层级
                    show_checkbox:false,//是否有checkbox
                    show_radio: false,//是否有单选radio
                    expand_on_click_node:false,//点击接点是否进行展开收缩
                    right_click:false//是否具有右键功能
                },
                treeData:[{
                    id: 1,
                    name: '知识目录',
                    type:"root",
                    children: [{
                        id: 2,
                        name: "机械产品知识库",
                        type:"repository",
                        showCheckbox:true,
                        children: [{
                            id: 3,
                            type:"catalog",
                            name: "设计知识",

                        }, {
                            id: 4,
                            name:"产品分类",
                            type:"sort",

                            children:[{
                                id: 5,
                                type:"catalog",
                                name: "目录一",

                            },{
                                id: 6,
                                type:"catalog",
                                name: "目录二",

                            }]
                        }]
                    }]
                }],
                tableSettings: {
                    radio:false,//是否单选
                    checkbox: true,//是否多选，单选和多选同一时间只能存在一个
                    pagination:true,//是否显示分页
                    total:50,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "name", label: "名称", sortable: true},
                        {prop: "code", label: "编号", sortable: true},
                        {prop: "keyword", label: "关键字", sortable: true},
                        {prop: "tag", label: "标签", sortable: true},
                        {prop: "sort", label: "知识分类", sortable: true},
                        {prop: "description", label: "描述", sortable: true},
                        {prop: "createdate", label: "创建时间", sortable: true},
                        {prop: "creator", label: "创建人", sortable: true}
                    ]
                },
                tableData:[],
            }
        },
        methods:{
            treeNodeClick({data,node})
            {
            },
            currentChange(val){//行单选事件
                console.log(val);
            },
            selectionChange(val){//行多选事件
                console.log(val)
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {

            },
            remove(){

            },
            search(){
                this.drawer = true;
            }
        },
        mounted() {
            this.tableData = [{
                id:1,
                name: 'test1',
                code:"K2020010638703",
                sort:'产品知识目录',
                tag: '',
                description:'',
                createdate: '2016-05-02',
                creator: '李书洋',
            }, {
                id:2,
                name: 'test2',
                code:"K2020010638703",
                sort:'产品知识目录',
                tag: '',
                description:'',
                createdate: '2016-05-02',
                creator: '李书洋',
            },{
                id:3,
                name: 'test3',
                code:"K2020010638703",
                sort:'产品知识目录',
                tag: '',
                description:'',
                createdate: '2016-05-02',
                creator: '李书洋',
            },{
                id:4,
                name: 'test4',
                code:"K2020010638703",
                sort:'产品知识目录',
                tag: '',
                description:'',
                createdate: '2016-05-02',
                creator: '李书洋',
            },{
                id:5,
                name: 'test5',
                code:"K2020010638703",
                sort:'产品知识目录',
                tag: '',
                description:'',
                createdate: '2016-05-02',
                creator: '李书洋',
            }];
        }
    }
</script>

<style scoped>
    .knowmgt.box{
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
    }
    .knowmgt.sidebar{
        flex-basis: 15%;
    }
    .knowmgt.main{
        flex-basis:85%;
    }
    .el-tabs--border-card{
        width:100%;
        border:0px;
    }
    .operationNav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin:5px;
    }
    .search{
        display: flex;
    }
</style>
