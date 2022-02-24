<template>
    <el-container>
        <el-main>
            <el-row style="z-index: 999">
                <el-col :span="24" >
                    <div>
                        <label>图表</label>
                        <el-select v-model="chart" placeholder="请选择" style="width: 80px" @change="drawChart">
                            <el-option label="图" value="figure"></el-option>
                            <el-option label="表" value="table"></el-option>
                        </el-select>
                        &emsp;&emsp;
                        <label>维度</label>
                        <el-select v-model="dimension" placeholder="请选择" style="width: 100px" @change="drawChart">
                            <el-option label="知识类别" value="store"></el-option>
                            <el-option label="部门" value="dept"></el-option>
                        </el-select>
                        &emsp;&emsp;&emsp;
                        <span v-if="chart=='figure'">
                            <label>展示</label>
                            <el-select v-model="display" placeholder="请选择" style="width: 100px" @change="drawChart">
                                <el-option label="柱状图" value="bar"></el-option>
                                <el-option label="饼状图" value="pie"></el-option>
                            </el-select>
                        </span>
                    </div>
                </el-col>
            </el-row>
            <el-row v-if="chart=='figure'">
                <div id="main" style="width: 95%;height:500px;">

                </div>
            </el-row>
            <el-row v-else>
                <cs-table ref="tb"
                          :settings="tableSettings"
                          :table-data="tableData">
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
            </el-row>
        </el-main>
    </el-container>
</template>

<script>

        import _ from "lodash"
        import * as echarts from "echarts"
        import {fetchIndKnowledgeCount} from "@/api/analysisController.js"
        import {export_json_to_excel} from "@/plugins/Export2Excel";

        export default {
            name: "KnowledgeCount",
            data(){
                return{
                    chart:"figure",
                    dimension:"store",
                    display:"bar",
                    deptData:[],
                    storeData:[],
                    headerVisible:false,
                    tableHeaders:[],
                    tableSettings: {
                        radio:false,//是否单选
                        checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                        height:window.innerHeight-180,
                        fields: [
                            {prop: "id", label: "id", sortable: false, visible: false},
                            {prop: "description", label: "说明",fixed:"left"}
                        ]
                    },
                    tableFieldsBak:[],
                    tableData:[],
                    defaultCheckedHeaders:[]
                }
            },
        methods:{
            chooseHeader(){
                let headerChecked = this.$refs.headerTree.getCheckedNodes(true,false);
                console.log(headerChecked);
                this.$set(this.tableSettings,"fields",_.concat(this.tableFieldsBak,headerChecked));
                let headerCheckedKeys = headerChecked.map(c=>{
                    return c.prop;
                });
                this.$set(this,"defaultCheckedHeaders",headerCheckedKeys);
                this.headerVisible = false;
            },
            formatExcelData(filterVal, jsonData) {
                return  jsonData.map(v =>
                    filterVal.map(
                        j => v[j]
                    )
                );
            },
            tableExport(){
                const tHeader = this.tableSettings.fields.filter(c => {
                    return c.visible != false;
                }).map(c => {
                    return c.label;
                });
                const filterVal = this.tableSettings.fields.filter(c=>{
                    return c.visible != false;
                }).map(c => {
                    return c.prop;
                });
                const list = this.tableData;
                const data = this.formatExcelData(filterVal, list);
                export_json_to_excel({
                    header: tHeader,
                    data,
                    filename:"个人贡献情况统计"
                });

            },
            async drawChart(){
                console.log(123);
                let keys = [];
                let values = [];
                let datas = [];
                let dataBak;
                if("dept" == this.dimension) {
                    let option = {
                        sql:"select so.DEPARTNAME as \"name\",count(1) as \"y\" from knowledge_base k,T_S_DEPART so ,fd_org_userrel re where k.creator = re.userid and  re.deptid = so.id and k.classification not in (SELECT ID FROM DOC_CATEGORY START WITH ID in ('','') CONNECT BY PRIOR ID = PID) and k.isdel = 0 and so.ORGTYPEID='4028e4667598521a01759860b1e30009' and k.audit_status = 1 group by so.DEPARTNAME,so.DEPTCODE order by so.DEPTCODE",
                        sqlwhere:""
                    };
                    let resp = await fetchIndKnowledgeCount(option);
                    this.deptData = resp.content;
                    dataBak = _.cloneDeep(this.deptData);
                }
                else{
                    let option = {
                        sql:"select d.categoryname as \"name\",count(1) as \"y\" from knowledge_base k ,doc_category d where k.baseid = d.id and k.isdel = 0 and k.audit_status = 1 group by d.categoryname",
                        sqlwhere:""
                    };
                    let resp = await fetchIndKnowledgeCount(option);
                    this.storeData = resp.content;
                    dataBak = _.cloneDeep(this.storeData);
                }

                if(this.chart == "figure")//指定的是图展示
                {
                    // 基于准备好的dom，初始化echarts实例
                    let myChart = echarts.init(document.getElementById('main'));
                    let title = {
                        text: '知识数量统计',
                        left: 'center',
                        textStyle: {
                            fontSize: 24
                        },
                    };

                    dataBak.forEach(d=>{
                        keys.push(d.name);
                        values.push(d.y);
                        datas.push({name:d.name,value:d.y});
                    })
                    // 指定图表的配置项和数据
                    let barOption = {
                        title:title,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: keys,
                                axisTick: {
                                    alignWithLabel: true
                                },
                                axisLabel:{
                                    interval:0,
                                    rotate:"45"
                                },
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: '',
                                type: 'bar',
                                barWidth: '60%',
                                data: values
                            }
                        ]
                    };

                    let pieOption = {
                        title:title,
                        tooltip: {
                            trigger: 'item',
                            formatter: '{b} : {c} ({d}%)'
                        },

                        legend: {
                            orient: 'vertical',
                            left: 'right',
                            right: 10,
                            top: 20
                        },
                        series: [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius: '70%',
                                data: datas,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    if("bar" == this.display)
                    {
                        this.$nextTick(()=>{
                            myChart.setOption(barOption,true);
                        });
                    }
                    else {
                        this.$nextTick(()=>{
                            myChart.setOption(pieOption,true);
                        });
                    }

                    this.$nextTick(()=>{
                        myChart.resize();
                    });
                }
                else {//指定的是表展示
                    let children = dataBak.map((d,index)=>{
                        return {prop:index.toString(),label:d.name};
                    });
                    this.tableSettings.fields = _.concat(this.tableFieldsBak,children);
                    this.defaultCheckedHeaders = children.map(d=>{
                        return d.prop;
                    });


                    let tableData = {id:1,description:"数量"};

                    dataBak.forEach((d,index)=>{
                        tableData[index] = d.y;
                    });

                    this.tableData = [tableData];

                    if("dept" == this.dimension) {
                        this.tableHeaders = [{
                            prop:"部门列表",
                            label:"部门列表",
                            children:children
                        }];
                    }
                    else{
                        this.tableHeaders = [{
                            prop:"知识类别",
                            label:"知识类别",
                            children:children
                        }];
                    }
                }
                console.log(321);
            }

        },
        mounted() {
             this.tableFieldsBak = _.cloneDeep(this.tableSettings.fields);
             setTimeout(()=>{
                 this.drawChart();
             },400);
        }
    }
</script>

<style scoped>
    .toolBar{
        display: flex;
        align-items: center;
        margin:5px;
        justify-content: flex-end;
    }
</style>
