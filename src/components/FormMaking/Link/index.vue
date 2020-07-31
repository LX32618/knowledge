<template>
    <div>
        <el-button type="primary" icon="el-icon-edit" circle @click="open" v-if="edit" :disabled="disabled"></el-button>
        <el-link :type="type" :href="linkData.url" :target="target" :underline="underline" :disabled="disabled">{{linkData.title}}</el-link>
        <el-dialog title="超链接信息" :visible.sync="dialogFormVisible"  @open="dialogOpen" :close-on-click-modal="false" append-to-body>
            <el-form :rules="rules" :model="data" ref="linkForm">
                <el-form-item label="链接名称" label-width="120px" prop="title">
                    <el-input v-model="data.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="链接地址" label-width="120px" prop="url">
                    <el-input v-model="data.url" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible=false">取 消</el-button>
                <el-button type="primary" @click="certainClick">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Link",
        props:{
            linkData:{
                type:Object,
                default:()=> {
                    return {
                        url:"",
                        title:""
                    }
                }
            },
            underline:{
                type:Boolean,
                default:true
            },
            blank:{
                type:Boolean,
                default:true
            },
            type:{
                type:String,
                default:"primary"
            },
            edit:{
                type:Boolean,
                default:true
            },
            disabled:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                dialogFormVisible:false,
                data:{
                    url:"",
                    title:"",
                },
                rules: {
                    title: [
                        {required: true, message: "名称不能为空", trigger: "blur"}
                    ],
                    url: [
                        {required: true, message: "地址不能为空", trigger: "blur"},
                        {
                            pattern:/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
                            message: '地址格式不正确',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        computed:{
            target(){
                return this.blank?"_blank":"_top";
            }
        },
        methods:{
            open() {
                this.dialogFormVisible = true;
            },
            dialogOpen(){
                if(this.$refs['linkForm'])
                    this.$refs['linkForm'].resetFields();
            },
            certainClick(){
                this.$refs['linkForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.data);
                        this.$emit("update:linkData",this.data);
                        this.dialogFormVisible = false;
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
