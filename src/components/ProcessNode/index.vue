<template>
    <div v-loading="loading">
        <cs-table ref="tb"
                  :settings="tableSettings"
                  :table-data="tableData">
            <template v-slot:suffix-column>
                <el-table-column label="审核人" align="center">
                    <template slot-scope="scope">
                        <el-link v-if="scope.row.approver.length == 0"  type="primary" @click.prevent="setApprover(scope.row)">点击设置审核人</el-link>
                        <el-tag style="margin-left: 3px"
                                v-for="tag in scope.row.approver"
                                :key="tag.id"
                                size="mini"
                                closable
                                @close="tagClose(scope.row,tag)"
                                type="danger">
                            {{tag.name}}[{{tag.id}}]
                        </el-tag>
                    </template>
                </el-table-column>
            </template>
        </cs-table>
        <div style="display: flex;flex-direction:row-reverse">
            <el-button type="primary" size="mini" style="margin-top: 10px;" @click="releaseProcess">确认</el-button>
        </div>
        <el-dialog title="审核人" :visible.sync="dialogVisible" :close-on-click-modal="false" append-to-body>
            <el-transfer  style="margin-left: 80px;"
                          v-model="selectUser"
                          filterable
                          :filter-method="filterMethod"
                          :props="{key: 'id',label: 'name'}"
                          :data="userData"
                          @left-check-change="leftCheckChange">
            </el-transfer>
            <el-button type="primary" style="float:right" size="mini" @click="selectUserCentain">确认</el-button>
        </el-dialog>
    </div>
</template>

<script>
    import _ from "lodash"
    import {fetchProcessList,startProcess} from "@/api/fmsBasic.js"

    export default {
        name: "index",
        props:{
            processId:{
                type:String,
                default:""
            },
            processKey:{
                type:String,
                default:""
            }
        },
        data(){
            const generateData = _ => {
                const data = [];
                data.push({id:"lisy1",name:"李书洋"});
                data.push({id:"yedm",name:"叶冬梅"});
                data.push({id:"wanhx",name:"万海旭"});
                data.push({id:"IDS1001",name:"IDS1001"});
                data.push({id:"IDS0003",name:"IDS0003"});
                data.push({id:"xtgl",name:"xtgl"});
                data.push({id:"IDS1002",name:"IDS1002"});
                return data;
            };
           return{
               loading:false,
               selectRow:{},
               selectUser:[],
               userData:generateData(),
               dialogVisible:false,
               tableSettings: {
                   radio:false,//是否单选
                   checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                   pagination:false,//是否显示分页
                   fields: [
                       {prop: "id", label: "id", sortable: false, visible: false},
                       {prop: "assignee", label: "assignee", sortable: false, visible: false},
                       {prop: "name", label: "节点名称", sortable: false}
                   ]
               },
               tableData:[],
               filterMethod(query, item) {
                  return item.name.includes(query);
               }
           }
        },
        methods:{
            leftCheckChange(leftKeys,rightKeys){
                if(leftKeys.length + this.selectUser.length >3)
                {
                    this.$error("每个节点只能选择3个及以下审核人");
                    leftKeys.pop();
                    return false;
                }
            },
            setApprover(row){
                this.selectRow = row;
                this.selectUser = row.approver;
                this.dialogVisible = true;
            },
            selectUserCentain(){
                let id = this.selectRow.id;
                let approver = [];
                this.selectUser.forEach(u=>{
                    let user = this.userData.filter(d=>{
                        return u == d.id;
                    })[0];
                    approver.push(user);
                })
                this.tableData.map(d=>{
                    if(d.id == id)
                    {
                        d.approver = approver;
                    }
                })
                this.dialogVisible = false;
            },
            tagClose(row,tag){
                this.tableData.map(td=>{
                    if(row.id == td.id)
                    {
                        td.approver = td.approver.filter(a=>{
                            return a.id != tag.id;
                        });
                    }
                })
            },
            releaseProcess(){
                let flag = this.tableData.some(tb=>{
                    return tb.approver.length == 0;
                });
                if(flag)
                {
                    this.$error("还有未设置审核人的节点");
                }
                else
                {
                    let variables = {};
                    this.tableData.forEach(tb=>{
                        let key = tb.assignee;
                        let value = [];
                        tb.approver.forEach(a=>{
                            value.push(a.id);
                        })
                        variables[key] = value;
                    });
                    let option = {
                        processDefinitionKey:this.processKey,
                        variables:JSON.stringify(variables)
                    };
                    console.log(option);
                    startProcess(option).then(resp=>{
                        console.log(resp);
                        if(resp.data.success)
                        {
                        }
                        else
                        {
                            this.$error(resp.data.msg);
                        }
                    }).catch((msg)=>{
                        this.$error(msg);
                    });
                }

       /*         let variables = {};
                this.tableData.forEach(tb=>{
                    let key = tb.assignee;
                    let value = [];
                    tb.approver.forEach(a=>{
                        value.push(a.id);
                    })
                    variables[key] = value;
                });
                let option = {
                    processDefinitionKey:this.processKey,
                    variables:JSON.stringify( variables)
                };
                console.log(option);
                startProcess(option).then(resp=>{
                    console.log(resp);
                    if(resp.data.success)
                    {
                    }
                    else
                    {
                        this.$error(resp.data.msg);
                    }
                }).catch((msg)=>{
                    this.$error(msg);
                });*/
            }
        },
        mounted() {
            this.loading = true;
            let option = {
                processDefinitionId:this.processId,
                proInstancId:""
            };
            fetchProcessList(option).then(resp=>{
                if(resp.data.success)
                {
                    let nodes = [];
                    resp.data.obj.userTasks.forEach(u=>{
                      let  node = _.pick(u,["name","id","assignee"]);
                      node.assignee = node.assignee.split("${")[1].split("}")[0];
                      node.approver = [];
                      nodes.push(node);
                    })
                    this.tableData = nodes;
                }
                else
                {
                    this.$error(resp.data.msg);
                }
            }).catch((msg)=>{
                this.$error(msg);
            });
            this.loading = false;
        }
    }
</script>

<style scoped>

</style>
