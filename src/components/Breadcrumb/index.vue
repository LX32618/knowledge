<template>
    <div class="bread-crumb box">
        <i class="el-icon-location"></i>
        <el-breadcrumb separator-class="el-icon-arrow-right" :style="{marginLeft:'3px'}">
            <el-breadcrumb-item
                    v-for="path in data.meta.paths"
                    :key="path">
                {{path}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>

</template>

<script>
    export default {
        name: "Breadcrumb",
        created() {
            this.data = this.$route.matched.pop()||[];
        },
        data() {
            return {
                data: []
            };
        },
        watch:{
            "$route": "routeChange"
        },
        methods:{
            routeChange(){
                this.data = this.$route.matched.pop()||[];
            }
        }
    }
</script>

<style scoped>
    .bread-crumb.box{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .el-icon-location{
        color:#606266;
    }
</style>