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

    export default {
        name: "KnowledgeCount",
        data(){
            return{
                dimension:"store",
                display:"bar",
                deptData:[{name:"测试部",y:9},{name:"艺术部",y:66},{name:"计划部",y:2}],
                storeData:[{name:"作战需求知识库",y:3},
                    {name:"软件工程化组织资产库",y:25},
                    {name:"liujx-test-1",y:1},
                    {name:"试验方案库",y:1},
                    {name:"机载产品知识库",y:3},
                    {name:"制造技术知识库","y":13},
                    {name:"试验阵地库",y:1},
                    {name:"xiat-test",y:3},
                    {name:"标准规范知识库",y:26},
                    {name:"装备模型库",y:11},
                    {name:"技术体质库",y:10}
                    ]
            }
        },
        methods:{
            drawChart(){
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
                    dataBak = _.cloneDeep(this.deptData);
                }
                else{
                    dataBak = _.cloneDeep(this.storeData);
                }

                console.log(dataBak);
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
                            }
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
                    myChart.setOption(barOption,true);
                }
                else {
                    myChart.setOption(pieOption,true);
                }

            }
        },
        mounted() {
            this.drawChart();
        }
    }
</script>

<style scoped>

</style>
