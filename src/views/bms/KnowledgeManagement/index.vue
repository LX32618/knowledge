<template>
    <div class="knowmgtbox" v-loading="loading">
        <div class="knowmgtsidebar" style="border-right: 1px solid #DCDFE6">
            <cs-lazytree ref="lazytree" :settings="treeSettings" :dataFormat="treeDataFormat" @treeNodeClick="treeNodeClick"></cs-lazytree>
        </div>
        <div class="knowmgtmain" v-if="JSON.stringify(clickData) != '{}' && clickData.type != -1">
            <cs-table ref="tb"
                      :settings="tableSettings"
                      :table-data="tableData"
                      @selectionChange="selectionChange"
                      @pageSizeChange="pageSizeChange"
                      @sortChange="sortChange"
                        style="width: 100%">
                <template v-slot:horizontalSlot>
                    <div class="knowmgt operationNav">
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-delete" @click.native="remove">删除</el-button>
                          <!--  <el-button type="primary" icon="element-icons el-custom-transfer1" size="mini">权限转移</el-button>-->
                            <el-button type="primary" v-if="clickData.type == 2" icon="element-icons el-custom-batchedit" size="mini">批量修改</el-button>
                            <el-button type="primary" v-if="clickData.type == 2" icon="element-icons el-custom-import" size="mini" @click="batchImport()">批量导入</el-button>
                            <el-button type="primary" icon="element-icons el-custom-share" size="mini" @click="batchShare()">批量分享</el-button>
                            <el-button type="primary" icon="element-icons el-custom-export" size="mini" @click="batchExport()">导出</el-button>
                        </el-button-group>
                        <div style="font-size: 12px">
                            <el-switch v-model="exportAttach" :width="30"  active-value="true" inactive-value="false">
                            </el-switch>
                            导出附件
                        </div>
                        <el-button-group class="knowmgt search">
                            <el-input  placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="seniorKeyWords.keyWord"></el-input>
                            <el-button type="primary" @click="search()">搜索</el-button>
                            <el-button type="primary" @click="drawer = true">高级搜索</el-button>
                        </el-button-group>
                    </div>
                </template>
            </cs-table>
        </div>
        <el-drawer title="高级搜索"
                :visible.sync="drawer"
                direction="rtl">
            <div>
                <el-form  :model="seniorKeyWords" label-width="80px" style="text-align: center">
                    <el-form-item label="知识名称">
                        <el-input v-model="seniorKeyWords.knowName" style="width:90%"></el-input>
                    </el-form-item>
                    <el-form-item label="知识编号">
                        <el-input v-model="seniorKeyWords.knowCode" style="width:90%"></el-input>
                    </el-form-item>
                    <el-form-item label="关键字">
                        <el-input v-model="seniorKeyWords.keyWord" style="width:90%"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input v-model="seniorKeyWords.creator" style="width:90%"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-date-picker
                                v-model="seniorKeyWords.dateRange"
                                value-format="yyyy-MM-dd"
                                type="daterange"
                                :picker-options="pickerOptions"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item style="float: right;margin-right: 20px">
                        <el-button @click="drawer = false">取 消</el-button>
                        <el-button type="primary" @click="seniorSearch()">确 定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
        <el-dialog title="批量导入" :visible.sync="importDialogVisible" :close-on-click-modal="false">
            <el-form label-width="80px">
                <el-form-item label="1.下载模板">
                    <el-link type="primary" :underline="false" @click.native.prevent="downloadTemp()">点击下载知识导入模板</el-link>
                </el-form-item>
                <el-form-item label="2.上传文件">
                    <el-upload  ref="upload"
                                class="upload-demo"
                                action
                                drag
                                :multiple="false"
                                :auto-upload="false"
                                accept=".zip"
                                :limit="1"
                                :http-request="handleUploadForm"
                                :on-exceed="handleExceed">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传zip文件</div>
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
    import {fetchCategoryByNodeId,exportKnowExcel} from "@/api/knowledgeManagement.js";
    import KnowledgeLabelsInput from '@/components/Input/KnowledgeLabelsInput'
    import CatTreeSelect from "@/components/CatTreeSelect";
    import axios from "axios"

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
                clickData:{},
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
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
                treeSelectSettings:{
                    key:"id",
                    label:"name",
                    children:"datas"
                },
                treeSelectData:[],
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
                        {prop: "code", label: "编号"},
                        {prop: "keyWord", label: "关键字"},
                        {prop: "tag", label: "标签"},
                        {prop: "categoryname", label: "知识分类", sortable: true},
                        {prop: "description", label: "描述"},
                        {prop: "createDate", label: "创建时间"},
                        {prop: "creator", label: "创建人"}
                    ]
                },
                tableData:[],
                tableSelectData:[],
                seniorKeyWords:{
                    knowName:"",
                    knowCode:"",
                    keyword:"",
                    creator:"",
                    dateRange:""
                },
                shareForm:{}
            }
        },
        methods:{
            treeDataFormat({node,data}){
                const temp = _.cloneDeep(data);
                console.log(data);
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
                this.classificationid = data.id;
                this.seniorKeyWords.labels = data.labelInfo;
        /*        let temp = {
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize,
                    userId:"",
                    condition:{
                        auditing:"1",//固定
                        classification:data.id,//左侧节点id
                        sort:"CREATEDATE",//
                        order:"desc",//
                        name:"",//搜索-知识名称
                        code:"",//搜索-知识编码
                        keyword:"",//搜索-keyword
                        labels:"",//
                        createdateMin:"",//固定
                        createdateMax:""//固定
                    }
                };*/
                let temp = {
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize,
                    sort:"CREATEDATE",//
                    order:"desc",
                    classification:data.id
                };
                this.loadTableData(temp);
                this.$set(this, 'clickData', data);
            },
            loadTableData({page,rows,sort,order,classification}){
                this.loading = true;
                let option = {
                    page:page,
                    rows:rows,
                    userId:"",
                    condition:{
                        auditing:"1",//固定
                        classification:classification,//左侧节点id
                        sort:sort,//
                        order:order,//
                        keyword:this.seniorKeyWords.keyWord,//搜索-keyword
                        name:this.seniorKeyWords.knowName,//搜索-知识名称
                        code:this.seniorKeyWords.knowCode,//搜索-知识编码
                        labels:"",//
                        //creator:this.seniorKeyWords.creator,
                        createdateMin:this.seniorKeyWords.dateRange?this.seniorKeyWords.dateRange[0]+" 00:00:00":"",//固定
                        createdateMax:this.seniorKeyWords.dateRange?this.seniorKeyWords.dateRange[1]+" 23:59:59":""//固定
                    }
                };
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
                        data.categoryname = d.knowledgeBase.classificationEnt.categoryname;
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
                    sort:"CREATEDATE",//
                    order:"desc",
                    classification:this.clickData.id
                };
                this.loadTableData(temp);
            },
            remove(){

            },
            search(){
                this.$set(this.seniorKeyWords,"knowName","");
                this.$set(this.seniorKeyWords,"knowCode","");
                this.$set(this.seniorKeyWords,"creator","");
                this.$set(this.seniorKeyWords,"dateRange",[]);
                let temp = {
                    page:1,
                    rows:this.tableSettings.pageSize,
                    sort:"CREATEDATE",//
                    order:"desc",
                    classification:this.clickData.id
                };
                this.loadTableData(temp);
            },
            seniorSearch(){
                this.drawer = false;
                let temp = {
                    page:1,
                    rows:this.tableSettings.pageSize,
                    sort:"CREATEDATE",//
                    order:"desc",
                    classification:this.clickData.id
                };
                this.loadTableData(temp);
            },
            sortChange({sort, order}) {
                let temp = {
                    page:1,
                    rows:this.tableSettings.pageSize,
                    sort:sort,//
                    order:order,
                    classification:this.clickData.id
                };
                this.loadTableData(temp);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`每次只能上传1个文件，当前共选择了 ${files.length + fileList.length} 个文件`);
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleUploadForm(param){
                let formData = new FormData()
                formData.append('categoryId', this.clickData.id) // 额外参数
                formData.append('file', param.file)
                let loading = this.$loading({
                    lock: true,
                    text: '上传中，请稍候...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.9)'
                })
                axios.post('/api4/app/authcenter/api/knowledgeUpload/post', formData).then((resp) => {
                    if (resp.data.status === "success") {
                        this.$message('上传文件成功' )
                    } else {
                        this.$message('上传文件失败:' + resp.data.message)
                    }
                    loading.close()
                })
            },
            batchImport(){
                this.importDialogVisible = true;
            },
            batchExport(){
                if(this.tableSelectData.length > 0){
                    //console.log(this.tableSelectData);
                    let option = {
                        categoryId:this.clickData.id,
                        exp:"exp",
                        isExpAttach:this.exportAttach,
                        ids:_.map(this.tableSelectData,"id").join(",")
                    };
                    console.log(option);
                    exportKnowExcel(option);
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
            },
            downloadTemp(){
                let option = {
                    categoryId:this.clickData.id,
                    exp:"",
                    isExpAttach:"",
                    ids:""
                };
                exportKnowExcel(option);
            }
        },
        mounted() {
        },
        components:{
            KnowledgeLabelsInput,
            CatTreeSelect
        }
    }
</script>

<style scoped>
   .knowmgtbox{
       display: flex;
       flex-direction: row;
       height: 100%;
       width: 99%;
   }
   .knowmgtsidebar{
       flex-basis: 15%;
   }
   .knowmgtmain{
       flex-basis:84%;
   }
   .el-tabs--border-card{
       width:100%;
       border:0px;
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
