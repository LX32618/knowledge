<template>
    <div>
        <cs-table ref="tb"
                  :key="keyValue"
                  :settings="tableSettings"
                  :table-data="tableData"
                  @pageSizeChange="pageSizeChange">
            <template v-slot:horizontalSlot>
                <div class="toolBar">
                    <el-popover
                            v-model="headerVisible"
                            placement="bottom"
                            width="300"
                            trigger="click">
                        <div>
                            <el-tree :data="tableHeaders"
                                     ref="headerTree"
                                     show-checkbox
                                     default-expand-all
                                     node-key="prop"
                                     style="overflow: auto;height: 250px;"
                                     :default-checked-keys="defaultCheckedHeaders"
                                     :props="{children:'children',label:'label'}">
                            </el-tree>
                            <el-button type="primary" size="mini" style="float: right;margin:0px 3px 3px 0px" @click="chooseHeader">确定</el-button>
                        </div>
                        <el-button type="primary" icon="el-icon-s-grid" slot="reference" >设置表头</el-button>
                    </el-popover>
                    <el-button type="primary" icon="element-icons el-custom-export" style="margin-left:10px" size="mini"  @click="tableExport()">导出</el-button>
                </div>
            </template>
        </cs-table>
    </div>
</template>

<script>

    import _ from "lodash"
    import {fetchCategoryTreeAll} from "@/api/docCategory.js"
    import {fetchOrgContribution} from "@/api/analysisController.js"

    export default {
        name: "OrganizationContribution",
        data(){
            return {
                keyValue:0,
                headerVisible:false,
                checkList:[],
                tableHeaders:[],
                tableSettings: {
                    radio:false,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    height:window.innerHeight-180,
                    pagination:true,//是否显示分页
                    total:0,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "deptName", label: "部门名称",fixed:"left",width:100},
                        {prop: "gxTotal", label: "贡献总数量",fixed:"left",width:100,formatter:(index,row)=>{
                                return _.reduce(row, function(result, value, key) {
                                    if("id" != key && "deptName" != key){
                                        result += parseInt(value);
                                    }
                                    return result;
                                }, 0);
                            }
                        }
                    ]
                },
                tableFieldsBak:[],
                tableData:[],
                tableDataBak:[],
                searchKey:"",
                defaultCheckedHeaders:[],

            }
        },
        methods:{
            async loadTableData(option){
                option.type = "1";
                let resp = await fetchOrgContribution(option);
                this.tableSettings.total = resp.content.total;
                let tableData = resp.content.datas.map(d=>{
                    let row = {};
                    if(d.GXCATEGORY){
                        let gxs = d.GX.split(",");
                        let gxCategories = d.GXCATEGORY.split(",");
                        row = _.zipObject(gxCategories, gxs);
                    }
                    row.id=d.ID;
                    row.deptName=d.ORGNAME;
                    return row;
                });

                this.tableData = tableData;
                this.tableDataBak = _.cloneDeep(tableData);
            },
            tableExport(){

            },
            chooseHeader(){
                let headerChecked = this.$refs.headerTree.getCheckedNodes(true,false);
                this.keyValue += 1;
                this.$set(this.tableSettings,"fields",_.concat(this.tableFieldsBak,headerChecked));
                let headerCheckedKeys = headerChecked.map(c=>{
                    return c.prop;
                });
                this.$set(this,"defaultCheckedHeaders",headerCheckedKeys);
                this.headerVisible = false;
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {
                this.loadTableData({page:page,rows:rows});
            }
        },
        async mounted() {
          this.tableFieldsBak = _.cloneDeep(this.tableSettings.fields);
          let rootResp = await fetchCategoryTreeAll({id:"0"});
          let rootId = rootResp.content[0].id;
          let rootName = rootResp.content[0].name;
          let childrenResp = await fetchCategoryTreeAll({id:rootId});
          let children = childrenResp.content.map(d=>{
              return {prop:d.id,label:d.name,width:80,formatter:(index,row)=>{
                      if(!row[d.id]){
                          return 0;
                      }
                      return row[d.id];
                  }
              }
          });
          this.tableHeaders = [{
                  prop:rootId,
                  label:rootName,
                  children:children
          }];
          this.defaultCheckedHeaders = children.map(d=>{
              return d.prop;
          });
          this.tableSettings.fields = _.concat(this.tableSettings.fields,children);
          let option = {
              page:this.tableSettings.currentPage,
              rows:this.tableSettings.pageSize
          };
          this.loadTableData(option);
        }
    }
</script>

<style scoped>
    .toolBar{
        display: flex;
        align-items: center;
        margin:5px;
        justify-content: flex-start
    }
    .search{
        display: flex;
        justify-content: flex-end;
    }
    .tableHeader{
        position:absolute;
        top:40px;
        left:10px;
        z-index:999;
        max-height: 500px;
        border: 1px solid #E4E7ED;
        background-color:#fff;
        overflow: auto;
        width: 300px;
    }
</style>
