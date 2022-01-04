<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <div>
                        <label>维度</label>
                        <el-select v-model="dimension" placeholder="请选择" style="width: 100px" @change="drawChart">
                            <el-option label="知识库" value="store"></el-option>
                            <el-option label="部门" value="dept"></el-option>
                        </el-select>
                        &emsp;&emsp;&emsp;&emsp;&emsp;
                        <label>展示</label>
                        <el-select v-model="display" placeholder="请选择" style="width: 100px" @change="drawChart">
                            <el-option label="柱状图" value="bar"></el-option>
                            <el-option label="饼状图" value="pie"></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <div id="main" style="width: 95%;height:500px;">

                </div>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import _ from "lodash"
    import * as echarts from "echarts"
    import {fetchIndKnowledgeCount} from "@/api/analysisController.js"


    export default {
        name: "KnowledgeCount",
        data(){
            return{
                dimension:"store",
                display:"bar",
                deptData:[],
                storeData:[]
            }
        },
        methods:{
            async drawChart(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('main'));
                let title = {
                        text: '知识数量统计',
                        left: 'center',
                        textStyle: {
                            fontSize: 24
                        },
                    };

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

/*                window.onresize = function () {
                    myChart.resize();
                };*/
            }
        },
        mounted() {
             setTimeout(()=>{
                 this.drawChart();
             },400);
        }
    }
</script>

<style scoped>

</style>
