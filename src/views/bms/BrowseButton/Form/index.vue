<template>
    <el-form :model="data" :rules="rules" ref="browseBtnForm" label-width="100px"  >
        <el-form-item label="名称" prop="refName">
            <el-input autocomplete="off" placeholder="请输入名称" v-model="data.refName"></el-input>
        </el-form-item>
        <el-form-item label="类型">
            <el-select placeholder="--请选择--" v-model="data.refType"  value-key="value" :disabled="data.id != ''" @change="refTypeChange">
                <el-option label="知识目录" :value = 0></el-option>
                <el-option label="自定义SQL" :value = 1></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SQL" v-if="data.refType == 1">
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 6}"
                    placeholder="请输入SQL语句"
                    v-model="data.refSql">
            </el-input>
        </el-form-item>
        <el-form-item label="知识目录" v-if="data.refType == 0">
            <el-button type="primary" icon="el-icon-search" circle @click.native="toggleKnowledgeDir"></el-button>
            <el-tag type="danger" size="mini" style="margin-left: 3px" v-if="data.categoryId != ''">
                {{data.categoryName}}
            </el-tag>
            <div class="knowledgeDir" v-if="showKnowledgeDir">
                <cs-lazytree ref="knowledgeDirTree" :settings="konwledgeDirTreeSettings" :dataFormat="knowledgeDirDataFormat" @checkChange="knowledgeDirCheckChange" style="overflow: auto;height: 250px;"></cs-lazytree>
                <div style="width: 100%;text-align: right">
                    <el-button type="primary" size="mini" style="margin:0px 3px 3px 0px" @click="certainKonwledgeDir">确定</el-button>
                </div>
            </div>
        </el-form-item>
        <el-form-item label="标识字段" prop="keyField">
            <el-input autocomplete="off" placeholder="请输入标识字段" v-model="data.keyField" :disabled="data.refType==0"></el-input>
        </el-form-item>
        <el-form-item label="显示字段" prop="viewField">
            <el-input autocomplete="off" placeholder="请输入显示字段" v-model="data.viewField" :disabled="data.refType==0"></el-input>
        </el-form-item>
        <el-form-item label="导入标识">
            <el-input autocomplete="off" placeholder="请输入导入标识" v-model="data.importField"></el-input>
            &nbsp;<span style="color:red">默认和显示字段一样</span>
        </el-form-item>
        <el-form-item label="链接地址">
            <el-input type="textarea"  :autosize="{ minRows: 3, maxRows: 6}" autocomplete="off" placeholder="请输入链接地址" v-model="data.viewUrl"></el-input>
        </el-form-item>
        <el-form-item label="过滤条件">
            <el-input type="textarea"  :autosize="{ minRows: 3, maxRows: 6}" autocomplete="off" placeholder="请输入过滤条件" v-model="data.filter"></el-input>
        </el-form-item>
     <!--   <el-form-item label="是否多选">
            <el-switch v-model="data.isMulti" :active-value=1 :inactive-value=0></el-switch>
        </el-form-item>-->
        <el-form-item label="是否系统对象">
            <el-switch v-model="data.isSys" :active-value=1 :inactive-value=0></el-switch>
        </el-form-item>
        <el-button type="primary" class="saveBtn"  @click="submitForm" :loading="submitBtnLoading">保存</el-button>
    </el-form>
</template>

<script>

    import _ from 'lodash'
    import request from '@/utils/request'

    let konwledgeDirUrl ='/app-zuul/knowledge/app/authcenter/api/categoryTree/';
    let browseBtnUrl = '/SysRefObjServer/';

    export default {
        name: "Form",
        props:["formData"],
        data(){
            return{
                data:_.cloneDeep(this.formData),
                showKnowledgeDir:false,
                submitBtnLoading:false,
                selectedCategoryId:"",
                selectedCategoryName:"",
                konwledgeDirTreeSettings:{
                    root_id:"0",//根节点id
                    expand_root:true,//是否默认展开根节点
                    check_strictly:true,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                    default_expand_all:false,//是否默认展开所层级
                    show_checkbox:false,//是否有checkbox
                    show_radio: true,//是否有单选radio
                    expand_on_click_node:false,//点击接点是否进行展开收缩
                    right_click:false,//是否具有右键功能
                    request:{//访问路径设置
                        url:`${konwledgeDirUrl}get`,
                        method:"post"
                    }
                },
                rules:{
                    refName:[
                        {required: true, message: "请输入显示名称", trigger: "blur"}
                    ],
                    keyField:[
                        {required: true, message: "请输入标识字段", trigger: "blur"},
                    ],
                    viewField:[
                        {required: true, message: "请输入显示字段", trigger: "blur"},
                    ]
                },
            }
        },
        watch:{
            formData:{
                handler(newVal,oldVal){
                    this.data = _.cloneDeep(newVal);
                    if(this.$refs['browseBtnForm'])//排除第一次加载组件时的情形
                        this.$refs['browseBtnForm'].clearValidate();//切换的时候清空校验规则
                },
                deep:true,
                immediate:true
            }
        },
        methods:{
            refTypeChange(val){
                if(val == 0)//知识目录
                {
                    this.$set(this.data,"keyField","id");
                    this.$set(this.data,"viewField","name");
                }
                else if(val == 1)
                {
                    this.$set(this.data,"keyField","");
                    this.$set(this.data,"viewField","");
                }
                else{}
            },
            toggleKnowledgeDir(){
                this.showKnowledgeDir = !this.showKnowledgeDir;
            },
            knowledgeDirDataFormat({node,data}){
                const temp = _.cloneDeep(data);
                let formatData = temp.map((item,index,arr)=>{
                    if(item.pid==this.konwledgeDirTreeSettings.root_id)
                    {
                        item.icon = "element-icons el-custom-book";
                        item.showCheckBox = false;
                    }
                    else if(item.type==0){
                        item.icon = "element-icons el-custom-db";
                        item.showCheckBox = false;
                    }
                    else if(item.type==1){
                        item.icon = "element-icons el-custom-files";
                        item.showCheckBox = false;
                    }
                    else if(item.type==2){
                        item.icon = "element-icons el-custom-file";
                        item.showCheckBox = true;
                    }
                    else{}
                    return item;
                })
                return formatData;
            },
            knowledgeDirCheckChange(selection){
                this.selectedCategoryId = selection[0].id;
                this.selectedCategoryName = selection[0].name;
            },
            certainKonwledgeDir(){
                this.data.categoryId = this.selectedCategoryId;
                this.data.categoryName = this.selectedCategoryName;
                this.showKnowledgeDir = false;
            },
            submitForm(){
                this.$refs['browseBtnForm'].validate((valid) => {
                    if (valid) {
                        this.submitBtnLoading = true;
                        let data = _.cloneDeep(this.data);
                        let type = data.id==""?"append":"edit";//判断本次操作是新增还是编辑
                        request({
                            url: `${browseBtnUrl}save`,
                            method: 'post',
                            data:data,
                        }).then(data=>{
                            if(data.status=="success")
                            {
                                if(type=="edit")//编辑
                                {
                                    this.$success("编辑成功");
                                }
                                else if(type=="append")
                                {
                                    this.$success("新增成功");
                                }
                                console.log(data);
                                this.$emit("submitSuccess",{type:type,data:data.content});
                            }
                            this.submitBtnLoading = false;
                        });
                    } else {
                        return false;
                    }

                });
            }
        }
    }
</script>

<style scoped>
    .el-input,.el-textarea{
        width: 300px;
    }
    .saveBtn{
        float:right;
        margin-top: -10px;
    }
    .knowledgeDir{
        overflow: auto;
        width: 300px;
        border: 1px solid #E4E7ED;
        background-color:#fff;
    }
</style>
