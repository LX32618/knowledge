<template>
    <div>
        <slot name="horizontalSlot"></slot>
        <el-table :id="tableId"  :data="tableData" stripe border style="width: 100%" @current-change="currentChange" @selection-change="selectionChange" >
            <el-table-column v-if="tableOptions.checkbox" type="selection"></el-table-column>
            <el-table-column width="40px" v-if="tableOptions.radio">
                <template slot-scope="scope">
                    <el-radio v-model="radioChecked" :label="scope.row.id"> </el-radio>
                </template>
            </el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column v-for="item in tableOptions.fields" v-if="item.visible==false?false:true" :sortable="item.sortable" :key="item.id" :prop="item.prop" :label="item.label"></el-table-column>
            <!--操作列插槽-->
            <slot name="verticalSlot"></slot>
        </el-table>
        <el-pagination v-if="tableOptions.pagination"
                       :page-sizes="tableOptions.pageList"
                       :page-size="tableOptions.pageSize"
                       :total="tableOptions.total"
                       @size-change = "sizeChange"
                       @current-change = "pageChange"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Table",
        data(){
            return{
                radioChecked:""
            }
        },
        props:["tableId","tableOptions","tableData"],
        methods:{
            currentChange(val){
                this.$emit("currentChange",val);
            },
            selectionChange(val){
                this.$emit("selectionChange",val);
            },
            sizeChange(val){
                this.$emit('sizeChange',val);
            },
            pageChange(val){
                this.$emit('pageChange',val);
            }
        }

    }

</script>

<style scoped>
    .el-radio__label{
        display: none;
    }
</style>