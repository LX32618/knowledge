<template>
    <div class="knowmgt box" v-loading="loading">
        <div class="knowmgt sidebar">
            <cs-lazytree ref="lazytree" :settings="treeSettings" :dataFormat="treeDataFormat" @treeNodeClick="treeNodeClick"></cs-lazytree>
        </div>
        <div class="knowmgt main" v-if="JSON.stringify(clickData) != '{}' && clickData.type != -1">
            <cs-table ref="tb"
                      :settings="tableSettings"
                      :table-data="tableData"
                      @selectionChange="selectionChange"
                      @pageSizeChange="pageSizeChange">
                <template v-slot:horizontalSlot>
                    <div class="knowmgt operationNav">
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-delete" @click.native="remove">删除</el-button>
                          <!--  <el-button type="primary" icon="element-icons el-custom-transfer1" size="mini">权限转移</el-button>-->
                            <el-button type="primary" v-if="clickData.type == 2" icon="element-icons el-custom-batchedit" size="mini">批量修改</el-button>
                            <el-button type="primary" v-if="clickData.type == 2" icon="element-icons el-custom-import" size="mini" @click="batchImport()">批量导入</el-button>
                            <el-button type="primary" icon="element-icons el-custom-share" size="mini" @click="batchShare()">批量分享</el-button>
                            <el-button type="primary" icon="element-icons el-custom-export" size="mini">导出</el-button>
                        </el-button-group>
                        <div style="font-size: 12px">
                            <el-switch v-model="exportAttach" :width="30">
                            </el-switch>
                            导出附件
                        </div>
                        <el-button-group class="knowmgt search">
                            <el-input  placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="keywords"></el-input>
                            <el-button type="primary" @click="search()">搜索</el-button>
                            <el-button type="primary" @click="drawer = true">高级搜索</el-button>
                        </el-button-group>
                    </div>
                </template>
            </cs-table>
        </div>
        <el-drawer title="高级搜索"
                :visible.sync="drawer"
                direction="ttb">
            <div class="drawerContent" style="margin-top: -25px">
                <el-row :gutter="10">
                    <el-col :md="8" :offset="4"><el-input v-model="seniorKeyWords.knowName"><template slot="prepend">知识名称</template></el-input></el-col>
                    <el-col :md="8"><el-input v-model="seniorKeyWords.knowCode"><template slot="prepend">知识编号</template></el-input></el-col>
                </el-row>
                <el-row>
                    <el-col :md="8" :offset="4">
                        标签选择：
                        <knowledge-labels-input
                                v-model="seniorKeyWords.selectedLabels"
                                :data="[]"
                                :classificationid="classificationid"/>
                    </el-col>

                </el-row>
                <el-row style="margin-top:5px">
                    <el-col :md="4" :offset="21">
                        <el-button @click="drawer = false">取 消</el-button>
                        <el-button type="primary" @click="seniorSearch()" :loading="seniorSearchLoading">{{ seniorSearchLoading ? '查询中 ...' : '确 定' }}</el-button>
                    </el-col>
                </el-row>
            </div>

        </el-drawer>
        <el-dialog title="批量导入" :visible.sync="importDialogVisible" :close-on-click-modal="false">
            <el-form label-width="80px">
                <el-form-item label="1.下载模板">
                    <el-link type="primary" :underline="false">点击下载知识导入模板</el-link>
                </el-form-item>
                <el-form-item label="2.上传文件">
                    <el-upload ref="upload"
                               style="width:80px;"
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :multiple="false"
                            :auto-upload="false"
                            accept=".xls"
                            :limit="1"
                            :on-exceed="handleExceed">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="3.导入">
                    <el-button type="primary" icon="element-icons el-custom-import" size="mini" @click="submitUpload()">开始导入</el-button>
                </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <div class="importDesciption">
                <h3>操作步骤:</h3>
                <p>1）下载知识导入模版，下载的zip包解压后有一个excel文件和一个content文件夹。</p>
                <p>2）填写excel文件，将附件放入content文件夹中；填写完毕后重新压缩的zip包。</p>
                <p>3）点击【开始导入】。</p>
                <h3>使用注意事项：</h3>
                <p>1）模版zip压缩包解压后有一个excel文件和一个content文件夹。</p>
                <p>2）excel第一行为表单字段，从第二行开始填写需要导入的数据。</p>
                <p>3）excel列顺序<span style="color:red">不允许</span>添加、删除和调整顺序。</p>
                <p>4）附件放到content文件夹下，在excel中只需要填写名称（包括附件后缀）。</p>
                <p>5）多个附件用<span style="color: red">英文分号【;】</span>隔开。</p>
                <p>6）数据之间<span style="color: red">不能有空行</span>。</p>
                <p>7）更新操作：如果要<span style="color: red">更新为空</span>，则在对应值<span style="color: red">填写【/】</span>,不填则表示不更新此字段。</p>
                <p>8）知识创建人填写该用户的<span style="color: red">邮箱或系统登陆名</span>。</p>
                <p>9）<span style="color: red">标准关系</span>在标准模版的第二个sheet，关联标准多个用英文【,】隔开，导入的关联标准只做添加不做修改和删除。</p>
                <p>10）上传必须重新压缩，<span style="color: red">必须为zip格式的压缩包</span>，请保证根目录<span style="color: red">必须只有一个</span>excel文件和一个content文件夹。</p>
            </div>
        </el-dialog>
        <el-dialog title="批量分享" :visible.sync="shareDialogVisible" :close-on-click-modal="false">
            <cs-people-select :priority="false" :form="shareForm">
                <template v-slot:operationSlot>
                    <div style="text-align: end">
                        <el-button @click="shareDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="shareDialogVisible = false">确 定</el-button>
                    </div>
                </template>
            </cs-people-select>
        </el-dialog>
    </div>
</template>

<script>
    import _ from "lodash";
    import {fetchCategoryByNodeId} from "@/api/knowledgeManagement.js";
    import KnowledgeLabelsInput from '@/components/Input/KnowledgeLabelsInput'

    const rootUrl = '/api4/app/authcenter/api/categoryTree/';

    export default {
        name: "KonwledgeManagement",
        data(){
            return{
                classificationid:"",
                loading:false,
                drawer:false,
                seniorSearchLoading:false,
                importDialogVisible:false,
                shareDialogVisible:false,
                exportAttach:false,
                keywords:"",
                clickData:{},
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
                        url:`${rootUrl}get`,
                        method:"post"
                    }
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
                        {prop: "keyWord", label: "关键字", sortable: true},
                        {prop: "tag", label: "标签", sortable: true},
                        {prop: "sort", label: "知识分类", sortable: true},
                        {prop: "description", label: "描述", sortable: true},
                        {prop: "createDate", label: "创建时间", sortable: true},
                        {prop: "creator", label: "创建人", sortable: true}
                    ]
                },
                tableData:[],
                tableSelectData:[],
                seniorKeyWords:{
                    knowName:"",
                    knowCode:"",
                    labels:[],
                    selectedLabels:[]
                },
                shareForm:{}
            }
        },
        methods:{
            treeDataFormat({node,data}){
                const temp = _.cloneDeep(data);
                let formatData = temp.map((item,index,arr)=>{
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
                this.classificationid = data.id;
                this.seniorKeyWords.labels = data.labelInfo;
                let temp = {
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize,
                    userId:"",
                    condition:{
                        auditing:"1",//固定
                        classification:data.id,//左侧节点id
                        sort:"",//
                        order:"",//
                        name:"",//搜索-知识名称
                        code:"",//搜索-知识编码
                        keyword:"",//搜索-keyword
                        labels:"",//
                        createdateMin:"",//固定
                        createdateMax:""//固定
                    }
                };
                this.loadTableData(temp);
                this.$set(this, 'clickData', data);
            },
            loadTableData(option){
                this.loading = true;
                fetchCategoryByNodeId(option).then(resp=>{
                    this.$set(this.tableSettings,"total",resp.content.total);
                    let datas = [];
                    resp.content.datas.forEach(d=>{
                        let data = {};
                        data.id = d.knowledgeBase.id;
                        data.name = d.knowledgeBase.name;
                        data.code = d.knowledgeBase.code;
                        data.keyWord = d.knowledgeBase.keyword;
                        data.tag = _.map(d.knowledgeBase.labelsEnt, 'name').join();
                        data.sort = d.knowledgeBase.classificationEnt.categoryname;
                        data.description = d.knowledgeBase.describe;
                        data.createDate = d.knowledgeBase.createDate;
                        data.creator = d.knowledgeBase.creatorEnt.username;
                        datas.push(data);
                    })
                    this.$set(this,"tableData",datas);
                    this.loading = false;
                }).catch((msg)=>{
                    this.loading = false;
                    this.$error(msg);
                });
            },
            selectionChange(val){//行多选事件
                this.$set(this,"tableSelectData",val);
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {
                let temp = {
                    page:page,
                    rows:rows,
                    userId:"",
                    condition:{
                        auditing:"1",//固定
                        classification:this.clickData.id,//左侧节点id
                        sort:"",//
                        order:"",//
                        keyword:this.keywords,//搜索-keyword
                        name:this.seniorKeyWords.knowName,//搜索-知识名称
                        code:this.seniorKeyWords.knowCode,//搜索-知识编码
                        labels:this.seniorKeyWords.selectedLabelIds.join(),//
                        createdateMin:"",//固定
                        createdateMax:""//固定
                    }
                };
                this.loadTableData(temp);
            },
            remove(){

            },
            search(){
                this.$set(this.seniorKeyWords,"knowName","");
                this.$set(this.seniorKeyWords,"knowCode","");
                this.$set(this.seniorKeyWords,"selectedLabelIds",[]);
                let temp = {
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSizes,
                    userId:"",
                    condition:{
                        auditing:"1",//固定
                        classification:this.clickData.id,//左侧节点id
                        sort:"",//
                        order:"",//
                        keyword:this.keywords,//搜索-keyword
                        name:"",//搜索-知识名称
                        code:"",//搜索-知识编码
                        labels:"",//
                        createdateMin:"",//固定
                        createdateMax:""//固定
                    }
                };
                this.loadTableData(temp);
            },
            seniorSearch(){
                this.keywords = "";
                let temp = {
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSizes,
                    userId:"",
                    condition:{
                        auditing:"1",//固定
                        classification:this.clickData.id,//左侧节点id
                        sort:"",//
                        order:"",//
                        keyword:"",//搜索-keyword
                        name:this.seniorKeyWords.knowName,//搜索-知识名称
                        code:this.seniorKeyWords.knowCode,//搜索-知识编码
                        labels:this.seniorKeyWords.selectedLabelIds,//
                        createdateMin:"",//固定
                        createdateMax:""//固定
                    }
                };
                this.loadTableData(temp);
            },
            tagClose(tag){
                let filterTags = this.seniorKeyWords.selectedLabels.filter(d=>{
                    return d.id!=tag.id;
                })
                this.$set(this.seniorKeyWords,"selectedLabels",filterTags);
            },
            tagClick(tag){
                let temp = [tag];
                console.log(temp);
                let selected = [];
                if(this.seniorKeyWords.selectedLabels.length)
                {
                    selected = _.unionBy(temp,this.seniorKeyWords.selectedLabels,"id");
                }
                else
                {
                    selected = temp;
                }
                console.log(selected)
                this.$set(this.seniorKeyWords,"selectedLabels",selected);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`每次只能上传1个文件，当前共选择了 ${files.length + fileList.length} 个文件`);
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            batchImport(){
                if(this.tableSelectData.length > 0){
                    this.importDialogVisible = true;
                }
                else{
                    this.$error("请先选择需要操作的知识");
                }
            },
            batchShare(){
                if(this.tableSelectData.length > 0){
                    this.shareDialogVisible = true;
                }
                else{
                    this.$error("请先选择需要分享的知识");
                }
            }
        },
        mounted() {
        },
        components:{
            KnowledgeLabelsInput
        }
    }
</script>

<style scoped>
    .knowmgt.box{
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 99%;
    }
    .knowmgt.sidebar{
        flex-basis: 15%;
    }
    .knowmgt.main{
        flex-basis:84%;
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
        justify-content: flex-end;
    }
    /deep/ :focus {
        outline: 0;
    }
    .importDesciption>p{
        font-size: 12px;
    }
    .el-divider--horizontal{
        margin: 0;
    }
</style>
