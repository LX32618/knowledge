<template>
    <div class="dict box">
        <div class="dict sidebar">
            <cs-lazytree ref="lazytree" :settings="treeSettings" :dataFormat="treeDataFormat" @treeNodeClick="treeNodeClick" @appendTreeNode="appendTreeNode" @editTreeNode="editTreeNode" @removeTreeNode="removeTreeNode"></cs-lazytree>
        </div>
        <div class="dict main">
            <dic-form :settings="viewFormSettings" :form-data="viewFormData" v-if="isNodeClick"></dic-form>
        </div>
        <el-dialog title="新增" :visible.sync="appendFormVisible" :close-on-click-modal="false">
            <dic-form :settings="appendFormSettings" :form-data="appendFormData"  ref="append" @submitSuccess="submitSuccess">
                <template v-slot:operation>
                    <el-button type="primary" :style="{float:'right',marginTop:'-10px'}" :loading="submitBtnLoading" @click="submitForm('append')">保存</el-button>
                </template>
            </dic-form>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <dic-form :settings="editFormSettings" :form-data="editFormData" ref="edit" @submitSuccess="submitSuccess">
                <template v-slot:operation>
                    <el-button type="primary" :style="{float:'right',marginTop:'-10px'}" :loading="submitBtnLoading" @click="submitForm('edit')">保存</el-button>
                </template>
            </dic-form>
        </el-dialog>
    </div>
</template>

<script>
    import _ from 'lodash';
    import dicForm from "./Form";
    import { treeRequest } from '@/utils/request'

    export default {
        name: "Dictionary",
        props:{
            getUrl:{
                type:String
            },
            editUrl:{
                type:String
            },
            category:{
                type:String
            }
        },
        data(){
            return {
                submitBtnLoading:false,
                isNodeClick:false,//是否已经点击了树节点
                editFormVisible:false,
                appendFormVisible:false,
                treeSettings:{
                    root_id:"0",//根节点id
                    expand_root:true,//是否默认展开根节点
                    check_strictly:true,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                    default_expand_all:false,//是否默认展开所层级
                    show_checkbox:false,//是否有checkbox
                    show_radio: false,//是否有单选radio
                    expand_on_click_node:false,//点击接点是否进行展开收缩
                    right_click:true,//是否具有右键功能
                    request:{//访问路径设置
                        url:`${this.getUrl}get`,
                        method:"post"
                    }
                },
                viewFormSettings:{
                    lableWidth:"120px"
                },
                viewFormData:{},
                appendFormSettings:{
                    lableWidth:"120px",
                    type:"append",
                    request:{
                        url:`${this.editUrl}save`,
                        method:'post'
                    }
                },
                appendFormData:{
                    pid:"",
                    id:"",
                    name:"",
                    data:{
                        describe: "",
                        sort: 0,
                        field_900: "",
                        field_901: "",
                        field_902: ""
                    }
                },
                editFormSettings:{
                    lableWidth:"120px",
                    type:"edit",
                    request:{
                        url:`${this.editUrl}save`,
                        method:'post'
                    }
                },
                editFormData:{}
            }
        },
        methods:{
            treeNodeClick({data,node})
            {
                this.isNodeClick = true;
                this.$set(this,"viewFormData",data);
            },
            appendTreeNode(node){
                this.appendFormVisible = true;
                this.$set(this.appendFormData,"pid",node.object.id);
            },
            editTreeNode(node){
                this.$set(this,"editFormData",node.object);
                this.editFormVisible = true;
            },
            removeTreeNode(node)
            {
                this.$confirm('此操作将删除该节点及其子节点, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    treeRequest({
                        url: `${this.editUrl}delete`,
                        method: 'post',
                        data:{id:node.object.id},
                    }).then(data=>{
                        if(data.status == "success")
                        {
                            this.$success("删除成功");
                            this.$refs.lazytree.removeSuccess(node.object.pid);
                        }
                        else{
                            this.$error(data.message);
                        }
                    });
                }).catch(() => {
                });
            },
            submitSuccess({result,type,data}){
                if(result=="success")
                {
                    if(type == "append")
                    {
                        this.appendFormVisible = false;
                        this.$refs.lazytree.appendSuccess(data.pid);
                    }
                    else if(type == "edit")
                    {
                        this.editFormVisible = false;
                        this.$refs.lazytree.editSuccess(data);
                        this.$set(this,"viewFormData",data);
                    }
                }
                else{
                    this.$error(data.message);
                }
                this.submitBtnLoading = false;
            },
            treeDataFormat({node,data}){
                const temp = _.cloneDeep(data);
                let formatData = temp.map((item,index,arr)=>{
                    let pid = item.pid;
                    item.right_click_option={
                        edit:true
                    };
                    if(this.treeSettings.root_id == pid){//如果是根节点
                        item.right_click_option.remove = false;
                    }
                    else{
                        item.right_click_option.remove = true;
                    }
                    if(this.category=="dictionary"){//对于字典操作
                        item.right_click_option.append = true;
                    }
                    else{//对于标签操作，只能新建两层label
                        if(2 == node.level)
                        {
                            item.right_click_option.append = false;
                        }
                        else
                        {
                            item.right_click_option.append = true;
                        }
                    }
                    return item;
                })
                return formatData;
            },
            submitForm(form){
                this.submitBtnLoading = true;
                this.$refs[form].submitForm();
            }
        },
        mounted() {
        },
        components:{
            dicForm
        }
    }
</script>

<style scoped>
    .dict.box{
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
    }
    .dict.sidebar{
        flex-basis: 15%;
    }
    .dict.main{
        flex-basis:80%;
        margin-top:20px;
    }
    .el-tabs--border-card{
        width:100%;
        border:0px;
    }
</style>
